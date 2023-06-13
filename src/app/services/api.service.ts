import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL= environment.apiUrl;

  constructor(private http: HttpClient) { }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    getClients() {
      return this.http.get(this.API_URL + 'Clients');
    }
    getBudgets() {
      return this.http.get(this.API_URL + 'Budgets/Data');
    }
    getBills() {
      return this.http.get(this.API_URL + 'Bills');
    }
}
