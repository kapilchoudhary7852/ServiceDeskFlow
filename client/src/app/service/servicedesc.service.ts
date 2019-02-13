import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { ServiceDesk } from '../model/ServiceDesk';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicedescService {
  private apiUrl = 'api/servicedesk/';
  constructor(private http: HttpClient) { }

  createServiceDesk(body: any) {
    const url: string = this.apiUrl + 'create';
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  deleteServiceDesk(id: string) {
    const url: string = this.apiUrl + 'delete/' + id;
    return this.http.delete(url).pipe(catchError(this.handleError));


  }

  getServiceDesks(): Observable<ServiceDesk[]> {
    const url: string = this.apiUrl + 'get/all';
    return this.http.get<ServiceDesk[]>(url)
      .pipe(catchError(this.handleError));
  }

  getServiceDesk(id: string): Observable<ServiceDesk> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<ServiceDesk>(url)
      .pipe(catchError(this.handleError));
  }

  updateServiceDesk(id: string, serviceDetails: ServiceDesk) {
    const url: string = this.apiUrl + 'update/' + id;
    return this.http.put(url, serviceDetails)
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


