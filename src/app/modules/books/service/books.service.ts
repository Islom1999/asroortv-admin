import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseApiService } from '../../../base/services/base-api.service';
import { IBook } from '../../../../interfaces/books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService extends BaseApiService<IBook> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/book`);
  }

  createParent(data: Partial<IBook>): Observable<IBook> {
    return this._http.post<IBook>(`${this.apiUrl}/parent`, data);
  }

  updateParent(id: string, data: Partial<IBook>): Observable<IBook> {
    return this._http.put<IBook>(`${this.apiUrl}/parent/${id}`, data);
  }

  createChild(data: Partial<IBook>): Observable<IBook> {
    return this._http.post<IBook>(`${this.apiUrl}/child`, data);
  }

  updateChild(id: string, data: Partial<IBook>): Observable<IBook> {
    return this._http.put<IBook>(`${this.apiUrl}/child/${id}`, data);
  }

  getParents(params?: HttpParams): Observable<IBook[]> {
    const query = (params || new HttpParams()).set('book_type', 'book_parent');
    return this._http.get<IBook[]>(`${this.apiUrl}`, { params: query });
  }
}
