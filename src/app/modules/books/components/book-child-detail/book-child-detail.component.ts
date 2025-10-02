import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, catchError, of } from 'rxjs';
import { StatusType } from '../../../../../enumerations';
import { IBook, IFile } from '../../../../../interfaces/books';
import { BookFileService } from '../../../book-file/service/book-file.service';
import { BooksService } from '../../service/books.service';

@Component({
  selector: 'app-book-child-detail',
  templateUrl: './book-child-detail.component.html',
  styleUrl: './book-child-detail.component.scss',
  standalone: false,
})
export class BookChildDetailComponent implements OnInit {
  @Input() parentId!: string;
  @Input() childId?: string;

  statusType = Object.values(StatusType);

  file$!: Observable<IFile[]>;
  form: FormGroup = new FormGroup({});

  loading = true;
  disableBtn = true;

  constructor(
    private readonly booksService: BooksService,
    private readonly fileService: BookFileService,
    private readonly messageService: NzMessageService,
    private readonly drawerRef: NzDrawerRef<boolean>
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.file$ = this.fileService.getAll();

    if (this.childId) {
      this.booksService.getById(this.childId).subscribe((book) => {
        if (!book) {
          this.loading = false;
          this.disableBtn = false;
          return;
        }
        this.form.patchValue({
          name: book.name,
          file_id: book.file_id,
          status_type: book.status_type,
          price: book.price,
          descr: book.descr,
        });
        this.loading = false;
        this.disableBtn = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      file_id: new FormControl('', [Validators.required]),
      // status_type: new FormControl(StatusType.free),
      // price: new FormControl<number | null>(null, [Validators.min(0)]),
      // descr: new FormControl(''),
    });
  }

  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    this.disableBtn = true;
    const payload: Partial<IBook> = {
      ...this.form.value,
      parent_id: this.parentId,
    };

    if (this.childId) {
      this.booksService
        .updateChild(this.childId, payload)
        .pipe(
          catchError(({ error }) => {
            this.disableBtn = false;
            this.messageService.error(
              error?.message || 'Ma`lumot yangilashda xatolik'
            );
            return of(null);
          })
        )
        .subscribe(() => {
          this.messageService.success('Bo`lim yangilandi');
          this.close(true);
        });
    } else {
      this.booksService
        .createChild(payload)
        .pipe(
          catchError(({ error }) => {
            this.disableBtn = false;
            this.messageService.error(
              error?.message || 'Ma`lumot saqlashda xatolik'
            );
            return of(null);
          })
        )
        .subscribe(() => {
          this.messageService.success('Bo`lim qo`shildi');
          this.close(true);
        });
    }
  }

  close(refresh = false) {
    this.drawerRef.close(refresh);
  }
}
