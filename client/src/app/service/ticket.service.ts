import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Ticket } from '../model/ticket';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:8000/api/servicerequest/';

  constructor(private http: HttpClient) { }

  createTicket(body: any) {
    const url: string = this.apiUrl + 'create';
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  deleteUser(id: string) {
    const url: string = this.apiUrl + 'delete/' + id;
    return this.http.delete(url).pipe(catchError(this.handleError));


  }

  getTickets(): Observable<Ticket[]> {
    const url: string = this.apiUrl + 'get/all';
    return this.http.get<Ticket[]>(url)
      .pipe(catchError(this.handleError));
  }

  getUser(id: string): Observable<Ticket> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Ticket>(url)
      .pipe(catchError(this.handleError));
  }

  updateUser(id: string, userDetails: Ticket) {
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
