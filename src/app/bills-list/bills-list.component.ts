import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent {
  displayedColumns: string[] = ['IdBill', 'Client', 'Actions'];
  dataSource: any = [];

  constructor(public dialog: MatDialog, private service: ApiService) { }
  ngOnInit() {
    this.service.getBills(2).subscribe(bills => {
      this.dataSource = bills;
      console.log(bills);
    })
  }

  openDialog(action: number, data: any, id: number, name: string) {
    /*switch (action) {
      case 0:
        this.dialog.open(AddItemComponent, {
          width: '1340px', disableClose: true, data: {
            action: 'edit-budget',
            budget: data
          }
        });
        break;
      case 1:
        this.dialog.open(DeleteItemComponent, {
          width: '1340px', disableClose: true, data: {
            idBudget: id,
            nameBudget: name,
            action: 'budget'
          }
        });
        break;
      case 2:
        this.dialog.open(AddItemComponent, {
          width: '1340px', disableClose: true, data: {
            action: 'budget'
          }
        });
        break;
      case 3:
        this.dialog.open(AddItemComponent, {
          width: '1340px', disableClose: true, data: {
            action: 'createBill',
            budget: data
          }
        });
        break;
    }*/
  }

  generatePDF(bill:any){

  }
}
