import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { UserAccess } from '../model/UserAccess';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {
  private apiUrl = 'api/useraccess/';
  constructor(private http: HttpClient) { }

  createUserAccess(body: any) {
    const url: string = this.apiUrl + 'create';
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  deleteUserAccess(id: string) {
    const url: string = this.apiUrl + 'delete/' + id;
    return this.http.delete(url).pipe(catchError(this.handleError));


  }

  getUserAccesss(): Observable<UserAccess[]> {
    const url: string = this.apiUrl + 'get/all';
    return this.http.get<UserAccess[]>(url)
      .pipe(catchError(this.handleError));
  }

  getUserAccess(id: string): Observable<UserAccess> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<UserAccess>(url)
      .pipe(catchError(this.handleError));
  }

  getUserAccessByServiceDeskId(id: string): Observable<UserAccess[]> {
    const url = `${this.apiUrl}getbySid/${id}`;
    return this.http.get<UserAccess[]>(url)
      .pipe(catchError(this.handleError));
  }

  getUserAccessByUserId(id: string): Observable<UserAccess[]> {
    const url = `${this.apiUrl}getbyUid/${id}`;
    return this.http.get<UserAccess[]>(url)
      .pipe(catchError(this.handleError));
  }

  updateUserAccess(id: string, userAccessDetails: UserAccess) {
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
