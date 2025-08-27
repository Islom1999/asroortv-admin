import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';
import { IFile } from '../../../../interfaces/books';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookFileService extends BaseApiService<IFile> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/file`);
  }

  uploadfile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const req = new HttpRequest(
      'POST',
      `${environment.apiUrl}/file/upload`,
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}
