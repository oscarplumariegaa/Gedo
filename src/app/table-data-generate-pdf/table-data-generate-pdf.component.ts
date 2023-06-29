import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-table-data-generate-pdf',
  templateUrl: './table-data-generate-pdf.component.html',
  styleUrls: ['./table-data-generate-pdf.component.css']
})
export class TableDataGeneratePdfComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  dataConcepts:any;

  ngOnInit(){
    console.log(this.data);
    this.service.getBudgetConcepts(this.data.bill.idBudget).subscribe((dataConcepts: any) =>{
      this.dataConcepts = dataConcepts;
    })
  }
}
