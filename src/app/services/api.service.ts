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
    getClientById(id: number){
      return this.http.get(this.API_URL + 'Clients/' + id);
    }
    getBudgetById(id: number){
      return this.http.get(this.API_URL + 'Budgets/' + id);
    }
    postClient(arrClient: any){
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(arrClient);
      return this.http.post<any>(this.API_URL + 'Clients', body, { 'headers': headers });
    }
    postBudget(arrBudget: any){
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(arrBudget);
      return this.http.post<any>(this.API_URL + 'Budgets', body, { 'headers': headers });
    }
    deleteClient(id:number){
      return this.http.delete<any>(this.API_URL + 'Clients/' + id);
    }
    deleteBudget(id:number){
      return this.http.delete<any>(this.API_URL + 'Budgets/' + id);
    }
    getClientsByUser(id: number){
      return this.http.get(this.API_URL + 'Clients/ClientsByUser/' + id);
    }
}
