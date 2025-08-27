import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseApiService } from '../../../base/services/base-api.service';
import { IBook } from '../../../../interfaces/books';

@Injectable({
  providedIn: 'root',
})
export class BooksService extends BaseApiService<IBook> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/book`);
  }
}
