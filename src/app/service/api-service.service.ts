import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError,map} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

   private baseUrl = 'https://crs610-latest.onrender.com/sendCRS610';

   constructor(private http: HttpClient) {
   }

   getRequest(parameters: any): Observable<any> {

     let params = new HttpParams();

     for (const key in parameters) {
       if (parameters.hasOwnProperty(key)) {
         params = params.set(key, parameters[key]);
       }
     }
     return this.http.request<any>('GET',this.baseUrl,{body: parameters})
       .pipe(
         catchError(error => this.handleError(error)),
         map(response => response.error?response.error: response.results[0].Records[0])
       );




   }

   private handleError(error: any): Observable<never> {
     console.error('API Error:', error);
     return throwError('Error in request.');
   }
}
