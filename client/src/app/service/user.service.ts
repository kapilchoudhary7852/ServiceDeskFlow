import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { User } from '../model/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/users/';

  constructor(private http: HttpClient) { }

  createUser(body: any) {
    const url: string = this.apiUrl + 'create';
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  deleteUser(id: string) {
    const url: string = this.apiUrl + 'delete/' + id;
    return this.http.delete(url).pipe(catchError(this.handleError));


  }

  getUsers(): Observable<User[]> {
    const url: string = this.apiUrl + 'get/all';
    return this.http.get<User[]>(url)
      .pipe(catchError(this.handleError));
  }

  getUser(id: string): Observable<User> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError));
  }

  updateUser(id: string, userDetails: User) {
    const url: string = this.apiUrl + 'update/' + id;
    return this.http.put(url, userDetails)
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
