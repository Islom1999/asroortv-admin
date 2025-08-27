import { Component, inject } from '@angular/core';
import { BookFileService } from '../../service/book-file.service';
import { ActivatedRoute } from '@angular/router';
import { IFile } from '../../../../../interfaces/books';

@Component({
  selector: 'app-book-file-info',
  standalone: false,
  templateUrl: './book-file-info.component.html',
  styleUrl: './book-file-info.component.scss',
})
export class BookFileInfoComponent {
  bookFileService = inject(BookFileService);
  route = inject(ActivatedRoute);

  id: string = '';
  fileUrl: string = '';
  file: IFile = {} as IFile;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    this.bookFileService.getById(this.id).subscribe((data) => {
      if (data) {
        this.fileUrl = `https://${data.server.domain}/api/file/watch/${data.id}`;
        // this.baseService.get(`file-list/${this.id}`).subscribe((response: IFileList) => { this.file = response })
      }
    });
  }

  get fileType(): string {
    const extension = this.fileUrl.split('.').pop()?.toLowerCase();
    return extension || '';
  }

  get fileExtension(): string {
    if (!this.file.file_name) return '';
    return this.file.file_name.split('.').pop()?.toLowerCase() || '';
  }

  downloadFile(): void {
    const link = document.createElement('a');
    link.href = this.fileUrl;
    link.download = this.file.file_name;
    link.target = '_blank';
    link.click();
  }
}
