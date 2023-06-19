import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})

export class ClientsListComponent {
  displayedColumns: string[] = ['NameClient', 'Address', 'Email', 'CIF', 'PhoneNumber', 'Actions'];
  dataSource:any = [];

  constructor(public dialog: MatDialog, private service: ApiService){}
  ngOnInit() {
    this.service.getClients().subscribe(clients => {
      this.dataSource = clients;
    })
  }

  openDialog(action:number, id:number, name:string){
    switch(action){
      case 0:
        this.dialog.open(AddItemComponent, {
          width: '1340px', disableClose: true, data: {
            idClient: id
          }
        });
        break;
      case 1:
        this.dialog.open(DeleteItemComponent, {
          width: '1340px', disableClose: true, data: {
            idClient: id,
            nameClient: name
          }
        });
        break;
      case 2: 
        this.dialog.open(AddItemComponent, {
          width: '1340px', disableClose: true
        });
        break;
    }
  }
}
