import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent {

  idUser: any = '';
  data: any;

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.idUser = localStorage.getItem('idUser');
    this.service.dataUser(this.idUser).subscribe((data) => {
      console.log(data);
      this.data = data;
    })

  }
}
