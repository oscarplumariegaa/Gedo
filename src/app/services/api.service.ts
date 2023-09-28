import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    sendEmail(to:string, subject:string, from:string, file:string){
      const headers = { 'Content-Type': 'multipart/form-data; boundary=--14737809831466499882746641449' }
      const formData = new FormData();
      formData.append('filename', file);

      const params = new HttpParams();
      params.append('to', to);
      params.append('subject', subject);
      params.append('from', from);

      return this.http.post(this.API_URL + 'Budgets/Send_Email?to='+to+'&subject='+subject+'&from='+from, formData, { headers: headers, params: params });
    }
    getClients() {
      return this.http.get(this.API_URL + 'Clients');
    }
    getBudgets(id: number) {
      return this.http.get(this.API_URL + 'Budgets/BudgetsByUser/' + id);
    }
    getBills(id: number) {
      return this.http.get(this.API_URL + 'Bills/BillsByUser/' + id);
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
    editUser(id: number, arrUser:any){
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(arrUser);
      return this.http.put<any>(this.API_URL + 'Users/' + id, body, { 'headers': headers });
    }
    postBill(arrBill:any){
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(arrBill);
      return this.http.post<any>(this.API_URL + 'Bills', body, { 'headers': headers });
    }
    postBudget(arrBudget: any){
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(arrBudget);
      return this.http.post<any>(this.API_URL + 'Budgets', body, { 'headers': headers });
    }
    postConcepts(arrConcepts: any){
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(arrConcepts);
      return this.http.post<any>(this.API_URL + 'Concepts', body, { 'headers': headers });
    }
    postLogo(vls:any){
      let data = vls;
      return this.http.post<any>('https://api.cloudinary.com/v1_1/dwalmtf3j/image/upload',data);
    }
    editConcepts(idBudget:number, arrConcepts: any){
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(arrConcepts);
      return this.http.put<any>(this.API_URL + 'Concepts/'+idBudget, body, { 'headers': headers });
    }
    editBudget(idBudget:number, arrBudget: any){
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(arrBudget);
      return this.http.put<any>(this.API_URL + 'Budgets/'+idBudget, body, { 'headers': headers });
    }
    deleteClient(id:number){
      return this.http.delete<any>(this.API_URL + 'Clients/' + id);
    }
    deleteBudget(id:number){
      return this.http.delete<any>(this.API_URL + 'Budgets/' + id);
    }
    deleteBill(id:number){
      return this.http.delete<any>(this.API_URL + 'Bills/' + id);
    }
    getClientsByUser(id: number){
      return this.http.get(this.API_URL + 'Clients/ClientsByUser/' + id);
    }
    lastIdBudgetByUser(id:number){
      return this.http.get(this.API_URL + 'Budgets/LastBudget/'+id);
    }
    lastIdBillByUser(id:number){
      return this.http.get(this.API_URL + 'Bills/LastBill/'+id);
    }
    getBudgetConcepts(id:number){
      return this.http.get(this.API_URL + 'Concepts/BudgetConcepts/'+id);
    }
    billByBudget(id:number){
      return this.http.get(this.API_URL + 'Bills/BillBudget/'+id);
    }
    registerUser(arrUser: any){
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(arrUser);
      return this.http.post<any>(this.API_URL + 'Users', body, { 'headers': headers });
    }
    loginUser(email:string, password:string){
      return this.http.get(this.API_URL + 'Users/Login/' + email + '/' + password);
    }
    dataUser(id: number){
      return this.http.get(this.API_URL + 'Users/' + id);
    }
}
