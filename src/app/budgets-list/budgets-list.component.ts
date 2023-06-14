import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteItemComponent } from '../delete-item/delete-item.component';

@Component({
  selector: 'app-budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.css']
})
export class BudgetsListComponent {
  displayedColumns: string[] = ['Client', 'Import', 'ImportIVA', 'Actions'];
  dataSource:any = [];

  constructor(public dialog: MatDialog, private service: ApiService){}
  ngOnInit() {
    this.service.getBudgets().subscribe(budgets => {
      this.dataSource = budgets;
    })
  }

  openDialog(budget:any){
    console.log(budget);
  }
  openDialogDelete(id:number){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '1340px', disableClose: true, data: {
        idBudget: id
      }
    });
  }
}
