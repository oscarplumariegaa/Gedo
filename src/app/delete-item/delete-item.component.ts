import { Component, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent {
  constructor(
    private service: ApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

  }

  confirmDelete() {
    if (this.data.action === 'client') {
      this.service.deleteClient(this.data.idClient).subscribe(data => {
        window.location.reload();
      })
    }
    if (this.data.action === 'budget') {
      this.service.deleteBudget(this.data.idBudget).subscribe(data => {
        window.location.reload();
      })
    }
    if (this.data.action === 'bill') {
      this.service.deleteBill(this.data.idBill).subscribe(data => {
        window.location.reload();
      })
    }
  }

  openDialog(): void {
    this.dialog.closeAll();
  }

}
