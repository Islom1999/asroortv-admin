import { Component } from '@angular/core';
import { BookFileService } from '../../service/book-file.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-book-file-detail',
  standalone: false,
  templateUrl: './book-file-detail.component.html',
  styleUrl: './book-file-detail.component.scss',
})
export class BookFileDetailComponent {
  uploadProgress: number = 0;
  processingProgress: number = 0;
  uploading: boolean = false;
  processing: boolean = false;

  constructor(
    private fileUploadService: BookFileService,
    private msg: NzMessageService,
    private router: Router
  ) {}

  beforeUpload = (file: NzUploadFile): boolean | Observable<boolean> => {
    const isMp4 = file.type === 'application/pdf';
    if (!isMp4) {
      this.msg.error('Only MP4 files are allowed');
      return false;
    }

    const isLt20MB = file.size! / 1024 / 1024 < 20;

    if (!isLt20MB) {
      const sizeMB = (file.size! / (1024 * 1024)).toFixed(2);
      this.msg.error(`Fayl hajmi ${sizeMB} MB. 20 MB dan kichik fayl yuklang.`);
      return false;
    }

    this.handleUpload(file as any as File); // Convert NzUploadFile to File
    return false;
  };

  handleUpload(file: File): void {
    this.uploading = true;
    this.fileUploadService.uploadfile(file).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
          }
        } else if (event.type === HttpEventType.Response) {
          this.msg.success('Upload successful');
          this.uploading = false;
          this.uploadProgress = 0;

          // Start processing progress
          this.processing = true;
          this.processingProgress = 0;
          this.trackProcessingProgress(file.name);
        }
      },
      (error) => {
        this.msg.error('Upload failed');
        this.uploading = false;
        this.uploadProgress = 0;
      }
    );
  }

  trackProcessingProgress(fileName: string): void {
    const interval = setInterval(() => {
      this.processingProgress += 20;

      if (this.processingProgress >= 100) {
        clearInterval(interval);
        this.processing = false;
        this.processingProgress = 0;
        this.msg.success('File processing complete');
      }
    }, 500);

    setTimeout(() => {
      this.router.navigate(['/book-file']);
      this.fileUploadService.loadAll();
    }, 1000);
  }

  back() {
    this.router.navigate(['/book-file']);
  }
}
