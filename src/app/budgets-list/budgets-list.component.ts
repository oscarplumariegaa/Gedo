import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.css']
})
export class BudgetsListComponent {
  displayedColumns: string[] = ['NameBudget', 'Client', 'Import', 'ImportIVA', 'Actions'];
  dataSource: any = [];

  constructor(public dialog: MatDialog, private service: ApiService) { }
  ngOnInit() {
    this.service.getBudgets(2).subscribe(budgets => {
      this.dataSource = budgets;
    })
  }

  openDialog(action: number, data: any, id: number, name: string) {
    switch (action) {
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
    }
  }

  generatePDF(budget:any){

  }
}
