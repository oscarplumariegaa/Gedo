import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { TableDataGeneratePdfComponent } from '../table-data-generate-pdf/table-data-generate-pdf.component';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent {
  displayedColumns: string[] = ['BillName', 'Client', 'Actions'];
  dataSource: any = [];
  idUser: any;

  constructor(public dialog: MatDialog, private service: ApiService) { }
  ngOnInit() {
    this.idUser = localStorage.getItem('idUser');
    this.service.getBills(this.idUser).subscribe(bills => {
      this.dataSource = bills;
    })
  }

  openDialog(action: number, data: any, id: number, name: string) {
    switch (action) {
      case 0:
        this.dialog.open(AddItemComponent, {
          width: '1340px', disableClose: true, data: {
            action: 'edit-bill',
            bill: data
          }
        });
        break;
      case 1:
        this.dialog.open(DeleteItemComponent, {
          width: '1340px', disableClose: true, data: {
            idBill: id,
            nameBill: name,
            action: 'bill'
          }
        });
        break;
      case 2:
        this.dialog.open(TableDataGeneratePdfComponent, {
          width: '1340px', disableClose: true, data: {
            action: 'bill',
            bill: data
          }
        });
        break;
    }
  }
}
