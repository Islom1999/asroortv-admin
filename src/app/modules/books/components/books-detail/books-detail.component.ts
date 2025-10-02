import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { BookType, StatusType } from '../../../../../enumerations';
import { environment } from '../../../../../environments/environment';
import { IBook, IFile } from '../../../../../interfaces/books';
import { ICategory } from '../../../../../interfaces/category';
import { ICountry } from '../../../../../interfaces/country';
import { ISounder } from '../../../../../interfaces/sounder';
import { IYear } from '../../../../../interfaces/year';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { BookChildDetailComponent } from '../book-child-detail/book-child-detail.component';
import { BookFileService } from '../../../book-file/service/book-file.service';
import { CategoryService } from '../../../category/service/category.service';
import { CountryService } from '../../../country/service/country.service';
import {
  getBase64,
  IUploadRes,
} from '../../../movie/components/movie-detail/movie-detail.component';
import { SounderService } from '../../../sounder/service/sounder.service';
import { YearService } from '../../../year/service/year.service';
import { BooksService } from '../../service/books.service';

@Component({
  selector: 'app-books-detail',
  standalone: false,
  templateUrl: './books-detail.component.html',
  styleUrl: './books-detail.component.scss',
})
export class BooksDetailComponent implements OnInit {
  public Editor = ClassicEditor;

  book?: IBook;
  children: IBook[] = [];
  bookType: BookType = BookType.book;
  readonly bookTypeEnum = BookType;

  status_type: StatusType[] = Object.values(StatusType);

  country$!: Observable<ICountry[]>;
  year$!: Observable<IYear[]>;
  sounder$!: Observable<ISounder[]>;
  category$!: Observable<ICategory[]>;
  file$!: Observable<IFile[]>;

  listOfSelectedSounder: string[] = [];
  listOfSelectedCategory: string[] = [];

  uploadURL = `${environment.apiUrl}/image/upload`;

  loading = true;
  disableBtn = true;

  previewImage: string | undefined = '';
  previewImageFrame: string | undefined = '';

  previewVisible = false;
  previewVisibleFrame = false;

  fileListImages: NzUploadFile[] = [];
  fileListImagesFrame: NzUploadFile[] = [];

  mode: string = '';

  breadcrumb: Breadcrumb = {
    header: 'Kitoblar',
    label: "Kitoblar ro'yhati",
    url: '/book',
  };

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  get isParent() {
    return this.bookType === BookType.book_parent;
  }

  constructor(
    private readonly bookService: BooksService,
    private readonly fileService: BookFileService,
    private readonly countryService: CountryService,
    private readonly yearService: YearService,
    private readonly categoryService: CategoryService,
    private readonly sounderService: SounderService,
    private readonly nzMessageService: NzMessageService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    protected readonly breadcrumbService: BreadcrumbsService,
    private readonly http: HttpClient,
    private readonly drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs([
      {
        header: this.breadcrumb.header,
        label: this.breadcrumb.label,
        url: this.breadcrumb.url,
      },
    ]);

    this.mode = this.route.snapshot.data['mode'];
    if (this.mode === 'parent') {
      this.bookType = BookType.book_parent;
    }

    this.buildForm(this.mode);
    this.setFileValidator();

    if (this.id) {
      this.loadBook(this.id);
    } else {
      this.loading = false;
      this.disableBtn = false;
    }

    this.country$ = this.countryService.getAll();
    this.year$ = this.yearService.getAll();
    this.category$ = this.categoryService.getAll();
    this.sounder$ = this.sounderService.getAll();
    this.file$ = this.fileService.getAll();
  }

  buildForm(mode: string) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
      min_age: new FormControl(18, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      status_type: new FormControl(StatusType.free, [Validators.required]),
      country_id: new FormControl('', [Validators.required]),
      year_id: new FormControl('', [Validators.required]),
      sounderId: new FormControl<string[]>([], [Validators.required]),
      categoryId: new FormControl<string[]>([], [Validators.required]),
      file_id: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
    if (mode === 'parent') {
      this.form.addControl('file_id', new FormControl(''));
    }
  }

  setFileValidator() {
    const control = this.form.get('file_id');
    if (!control) return;

    if (this.bookType === BookType.book) {
      control.addValidators(Validators.required);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity({ emitEvent: false });
  }

  loadBook(id: string) {
    this.bookService.getById(id).subscribe((book) => {
      if (!book) {
        this.loading = false;
        this.disableBtn = false;
        return;
      }

      this.book = book;
      this.bookType = book.book_type || BookType.book;
      this.setFileValidator();

      this.form.patchValue({
        ...book,
        sounderId: book.sounder?.map((item) => item.id) ?? [],
        categoryId: book.category?.map((item) => item.id) ?? [],
      });

      this.listOfSelectedSounder = this.form.value['sounderId'] ?? [];
      this.listOfSelectedCategory = this.form.value['categoryId'] ?? [];

      this.fileListImages = (book.images || []).map((item, index) => ({
        uid: `-${index + 1}`,
        name: item,
        status: 'done',
        url: `${environment.apiUrl}/image/${item}`,
        response: {
          filename: item,
          url: `${environment.apiUrl}/image/${item}`,
        },
      }));

      this.fileListImagesFrame = (book.frame_images || []).map(
        (item, index) => ({
          uid: `-${index + 1}`,
          name: item,
          status: 'done',
          url: `${environment.apiUrl}/image/${item}`,
          response: {
            filename: item,
            url: `${environment.apiUrl}/image/${item}`,
          },
        })
      );

      this.children = book.children ?? [];

      this.disableBtn = false;
      this.loading = false;
    });
  }

  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.disableBtn = true;
    if (this.id) {
      this.update(this.id);
    } else {
      this.create();
    }
    this.fileService.loadAll();
  }

  private buildPayload(): Partial<IBook> {
    const value = this.form.value;
    const payload: any = {
      ...value,
      sounderId: value.sounderId ?? [],
      categoryId: value.categoryId ?? [],
      images: this.getImageAllImages(),
      frame_images: this.getImageAllImagesFrame(),
      min_age: Number(value.min_age),
      price: Number(value.price),
    };

    if (!payload.file_id) {
      delete payload.file_id;
    }

    return payload;
  }

  create() {
    const payload = this.buildPayload();

    const request = this.isParent
      ? this.bookService.createParent(payload)
      : this.bookService.create(payload as IBook);

    request
      .pipe(
        catchError(({ error }) => {
          this.disableBtn = false;
          this.nzMessageService.error(error?.message || 'Saqlashda xatolik');
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.nzMessageService.success('Ma`lumot saqlandi');
          this.router.navigate(['/', 'book']);
        }
      });
  }

  update(id: string) {
    const payload = this.buildPayload();

    const request = this.isParent
      ? this.bookService.updateParent(id, payload)
      : this.bookService.update(id, payload as IBook);

    request
      .pipe(
        catchError(({ error }) => {
          this.disableBtn = false;
          this.nzMessageService.error(error?.message || 'Yangilashda xatolik');
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.nzMessageService.success('Ma`lumot yangilandi');
          this.router.navigate(['/', 'book']);
        }
      });
  }

  // image helpers
  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  customUpload = (item: NzUploadXHRArgs): Subscription => {
    if (item) {
      const formData = new FormData();
      formData.append('image', item.file as any);

      return this.http.post<IUploadRes>(this.uploadURL, formData).subscribe(
        (response) => {
          item.onSuccess?.(response, item.file, event);
        },
        (error) => {
          item.onError?.(error, item.file);
        }
      );
    }
    return new Subscription();
  };

  removeImage(file: NzUploadFile) {
    return true;
  }

  getImageAllImages(): string[] {
    return this.fileListImages
      .filter((item) => !!item.response)
      .map((item) => item.response!.filename);
  }

  handlePreviewFrame = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImageFrame = file.url || file['preview'];
    this.previewVisibleFrame = true;
  };

  customUploadFrame = (item: NzUploadXHRArgs): Subscription => {
    if (item) {
      const formData = new FormData();
      formData.append('image', item.file as any);

      return this.http.post<IUploadRes>(this.uploadURL, formData).subscribe(
        (response) => {
          item.onSuccess?.(response, item.file, event);
        },
        (error) => {
          item.onError?.(error, item.file);
        }
      );
    }
    return new Subscription();
  };

  removeImageFrame(file: NzUploadFile) {
    return true;
  }

  getImageAllImagesFrame(): string[] {
    return this.fileListImagesFrame
      .filter((item) => !!item.response)
      .map((item) => item.response!.filename);
  }

  openChild(child?: IBook) {
    if (!this.book?.id) {
      return;
    }

    const drawerRef = this.drawerService.create<
      BookChildDetailComponent,
      { parentId: string; childId?: string },
      boolean
    >({
      nzTitle: child ? "Bo'limni tahrirlash" : "Bo'lim qo'shish",
      nzContent: BookChildDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        parentId: this.book.id,
        childId: child?.id,
      },
    });

    drawerRef.afterClose.subscribe((refresh) => {
      if (refresh) {
        this.refreshChildren();
      }
    });
  }

  deleteChild(id: string | undefined) {
    if (!id) return;
    this.bookService.delete(id).subscribe(() => {
      this.nzMessageService.success("Bo'lim o'chirildi");
      this.refreshChildren();
    });
  }

  private refreshChildren() {
    if (!this.book?.id) return;
    this.bookService.getById(this.book.id).subscribe((book) => {
      if (book) {
        this.children = book.children ?? [];
      }
    });
  }
}
