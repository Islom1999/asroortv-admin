import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { Quality, StatusType } from '../../../../../enumerations';
import { environment } from '../../../../../environments/environment';
import { IBook, IFile } from '../../../../../interfaces/books';
import { ICategory } from '../../../../../interfaces/category';
import { ICountry } from '../../../../../interfaces/country';
import { ISounder } from '../../../../../interfaces/sounder';
import { IYear } from '../../../../../interfaces/year';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { ImageService } from '../../../../shared/services/image.service';
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
import { IMovieGenre } from '../../../../../interfaces/movie_genre';
import { MovieGenreService } from '../../../movie-genre/service/movie-genre.service';

@Component({
  selector: 'app-books-detail',
  standalone: false,
  templateUrl: './books-detail.component.html',
  styleUrl: './books-detail.component.scss',
})
export class BooksDetailComponent {
  public Editor = ClassicEditor;
  book!: IBook;

  quality: Quality[] = Object.values(Quality);
  status_type: StatusType[] = Object.values(StatusType);

  country$!: Observable<ICountry[]>;
  year$!: Observable<IYear[]>;
  sounder$!: Observable<ISounder[]>;
  category$!: Observable<ICategory[]>;
  muvie_genre$!: Observable<IMovieGenre[]>;
  file$!: Observable<IFile[]>;

  listOfSelectedSounder: string[] = [];
  listOfSelectedCategory: string[] = [];
  listOfSelectedBookGenre: string[] = [];

  uploadURL = `${environment.apiUrl}/image/upload`;
  // uploadURL = `https://api.tvtime.uz/api/image/upload`

  loading = true;
  disableBtn = true;

  // Image  start
  previewImage: string | undefined = '';
  previewImageFrame: string | undefined = '';

  previewVisible = false;
  previewVisibleFrame = false;

  fileListImages: NzUploadFile[] = [];
  fileListImagesFrame: NzUploadFile[] = [];

  // images
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

      return this._http.post<IUploadRes>(this.uploadURL, formData).subscribe(
        (response) => {
          if (item.onSuccess) {
            item.onSuccess(response, item.file, event);
          }
        },
        (error) => {
          if (item.onError) {
            item.onError(error, item.file);
          }
        }
      );
    } else {
      return new Subscription(); // Yoki istalgan boshqa Subscription obyekti
    }
  };

  removeImage(file: NzUploadFile) {
    return true;
  }

  getImageAllImages(): string[] {
    return this.fileListImages.map((item) => item.response.filename);
  }

  // frame images
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

      return this._http.post<IUploadRes>(this.uploadURL, formData).subscribe(
        (response) => {
          if (item.onSuccess) {
            item.onSuccess(response, item.file, event);
          }
        },
        (error) => {
          if (item.onError) {
            item.onError(error, item.file);
          }
        }
      );
    } else {
      return new Subscription(); // Yoki istalgan boshqa Subscription obyekti
    }
  };

  removeImageFrame(file: NzUploadFile) {
    return true;
  }

  getImageAllImagesFrame(): string[] {
    return this.fileListImagesFrame.map((item) => item.response.filename);
  }

  // Image end

  // Image end

  breadcrumb: Breadcrumb = {
    header: 'Book',
    label: "Book ro'yhati",
    url: '/book',
  };

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _modelSrv: BooksService,
    private _fileSrv: BookFileService,
    private _countrySrv: CountryService,
    private _yearSrv: YearService,
    private _categorySrv: CategoryService,
    private _sounderSrv: SounderService,
    private _movieGenreSrv: MovieGenreService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    protected breadcrumbService: BreadcrumbsService,
    private imageSrv: ImageService,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs([
      {
        header: this.breadcrumb.header,
        label: this.breadcrumb.label,
        url: this.breadcrumb.url,
      },
    ]);

    if (this.id) {
      this._modelSrv.getById(this.id).subscribe((book) => {
        this.book = book;
        this.form.patchValue({
          ...book,
          categoryId: book?.category?.map((item) => item.id),
          sounderId: book?.sounder?.map((item) => item.id),
        });
        this.fileListImages = book.images.map((item, index) => {
          return {
            uid: `-${index + 1}`,
            name: item,
            status: 'done',
            url: `${environment.apiUrl}/image/${item}`,
            response: {
              filename: item,
              url: `${environment.apiUrl}/image/${item}`,
            },
          };
        });
        this.fileListImagesFrame = book.frame_images.map((item, index) => {
          return {
            uid: `-${index + 1}`,
            name: item,
            status: 'done',
            url: `${environment.apiUrl}/image/${item}`,
            response: {
              filename: item,
              url: `${environment.apiUrl}/image/${item}`,
            },
          };
        });
        this.disableBtn = false;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }

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

      sounderId: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      // bookGenreId: new FormControl('', [Validators.required]),

      file_id: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
    });

    this.country$ = this._countrySrv.getAll();
    this.year$ = this._yearSrv.getAll();
    this.category$ = this._categorySrv.getAll();
    this.sounder$ = this._sounderSrv.getAll();

    this.file$ = this._fileSrv.getAll();
  }

  submit() {
    if (this.form.valid) {
      this.disableBtn = true;
      if (this.id) {
        this.update(this.id);
      } else {
        this.create();
      }
      this._fileSrv.loadAll();
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create() {
    this._modelSrv
      .create({
        ...this.form.value,
        images: this.getImageAllImages(),
        frame_images: this.getImageAllImagesFrame(),
      })
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Create data');
        this.router.navigate(['/', 'book']);
      });
  }

  update(id: string) {
    this._modelSrv
      .update(id, {
        ...this.form.value,
        images: this.getImageAllImages(),
        frame_images: this.getImageAllImagesFrame(),
      })
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          // this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
        this.router.navigate(['/', 'book']);
      });
  }
}
