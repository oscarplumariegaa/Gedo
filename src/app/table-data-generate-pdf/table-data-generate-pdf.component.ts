import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

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

  dataConcepts: any;

  ngOnInit() {
    this.service.getBudgetById(this.data.bill.idBudget).subscribe((dataBudget: any) => {
      this.service.getClientById(dataBudget.idClient).subscribe((client: any) => {
        this.service.getBudgetConcepts(this.data.bill.idBudget).subscribe((dataConcepts: any) => {
          this.dataConcepts = [dataConcepts, dataBudget, client];
        })
      })
    })
  }

  openDialog(): void {
    this.dialog.closeAll();
  }

  generatePDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [{ content: 'Factura #' + this.dataConcepts[1].nameBudget, colSpan: 3, styles: { halign: 'center', fillColor: [22, 160, 133] } }
        ],
        [{ content: 'Cliente ' + this.dataConcepts[2].nameClient, styles: { halign: 'left', fillColor: [20, 120, 110] } },
        { content: 'Empresa ' + this.dataConcepts[2].nameClient, styles: { halign: 'left', fillColor: [20, 120, 110] } }],
        [{ content: 'Teléfono ' + this.dataConcepts[2].phoneNumber, styles: { halign: 'left', fillColor: [20, 120, 110] } }],
      ],
      body: [
        [this.dataConcepts[2].phoneNumber]
      ]
    });
    doc.save('table.pdf');
  }
}
