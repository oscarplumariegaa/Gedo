import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})

export class ClientsListComponent {
  displayedColumns: string[] = ['NameClient', 'Address', 'Email', 'CIF', 'PhoneNumber'];
  dataSource:any = [];

  constructor(private service: ApiService){}
  ngOnInit() {
    this.service.getClients().subscribe(clients => {
      console.log(clients);
      this.dataSource = clients;
    })
  }
}
