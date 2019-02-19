import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { NotifyTo } from '../model/NotifyTo';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotifytoService {

  private apiUrl = 'api/notifyto/';
  constructor(private http: HttpClient) { }

  create(body: any) {
    const url: string = this.apiUrl + 'create';
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  delete(id: string) {
    const url: string = this.apiUrl + 'delete/' + id;
    return this.http.delete(url).pipe(catchError(this.handleError));


  }

  gets(): Observable<NotifyTo[]> {
    const url: string = this.apiUrl + 'get/all';
    return this.http.get<NotifyTo[]>(url)
      .pipe(catchError(this.handleError));
  }

  get(id: string): Observable<NotifyTo> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<NotifyTo>(url)
      .pipe(catchError(this.handleError));
  }

  getBySId(id: string): Observable<NotifyTo[]> {
    const url = `${this.apiUrl}getbySid/${id}`;
    return this.http.get<NotifyTo[]>(url)
      .pipe(catchError(this.handleError));
  }
  getByUId(id: string): Observable<NotifyTo[]> {
    const url = `${this.apiUrl}getbyUid/${id}`;
    return this.http.get<NotifyTo[]>(url)
      .pipe(catchError(this.handleError));
  }

  update(id: string, userAccessDetails: NotifyTo) {
    const url: string = this.apiUrl + 'update/' + id;
    return this.http.put(url, userAccessDetails)
      .pipe(catchError(this.handleError));

  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}