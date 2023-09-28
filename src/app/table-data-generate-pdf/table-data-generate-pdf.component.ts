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
  idUser: any;
  sendButton: boolean = false;

  ngOnInit() {
    this.idUser = localStorage.getItem('idUser');
    this.service.getBudgetById(this.data.bill.idBudget).subscribe((dataBudget: any) => {
      this.service.getClientById(dataBudget.idClient).subscribe((client: any) => {
        this.service.getBudgetConcepts(this.data.bill.idBudget).subscribe((dataConcepts: any) => {
          this.service.dataUser(this.idUser).subscribe((dataUser: any) => {
            this.dataConcepts = [dataConcepts, dataBudget, client, dataUser];
          })
        })
      })
    })
  }

  openDialog(): void {
    this.dialog.closeAll();
  }

  generateBodyConcepts(){
    let arr = [];
    for (let i = 0; i < this.dataConcepts[0].length; i++) {
      arr.push([this.dataConcepts[0][i].nameField, this.dataConcepts[0][i].units, this.dataConcepts[0][i].value+'€']);
    }
    return arr;
  }

  generatePDF(action: string) {
    let typeFile = 'Factura #';
    if(action === 'sendEmail'){
      typeFile = 'Presupuesto #';
    };
    const doc = new jsPDF();
    let img = new Image();
    img.src = this.dataConcepts[3].logo;
    autoTable(doc, {
      styles: {
        fontSize: 12
      },
      startY: 55,
      head: [
        [{ content: typeFile + this.dataConcepts[1].nameBudget, colSpan: 3, styles: { halign: 'center', fillColor: [22, 160, 133] } }
        ],
        [{ content: 'Cliente ' + this.dataConcepts[2].nameClient, styles: { halign: 'left', fillColor: [20, 90, 110] } },
        { content: ' ', styles: { halign: 'left', fillColor: [20, 120, 110] } },
        { content: 'Empresa ' + this.dataConcepts[3].name, styles: { halign: 'left', fillColor: [20, 90, 110] } }],
        [{ content: 'Teléfono ' + this.dataConcepts[2].phoneNumber, styles: { halign: 'left', fillColor: [20, 120, 110] } },
        { content: ' ', styles: { halign: 'left', fillColor: [20, 120, 110] } },
        { content: 'Teléfono ' + this.dataConcepts[3].phoneNumber, styles: { halign: 'left', fillColor: [20, 120, 110] } }
        ],
        [
          { content: 'Dirección ' + this.dataConcepts[2].address, styles: { halign: 'left', fillColor: [20, 120, 110] } },
          { content: ' ', styles: { halign: 'left', fillColor: [20, 120, 110] } },
          { content: 'Dirección ' + this.dataConcepts[3].address, styles: { halign: 'left', fillColor: [20, 120, 110] } }
        ],
        [['Concepto'], ['Unidades'], ['Valor']],
        /*[{ content: 'Importe ' + this.dataConcepts[1].import, styles: { halign: 'left', fillColor: [20, 120, 110] } },
        { content: 'Importe IVA ' + this.dataConcepts[1].importIVA, styles: { halign: 'left', fillColor: [20, 120, 110] } }],*/
      ],
      body: this.generateBodyConcepts(),
      foot:[[' ', 'Importe Total', this.dataConcepts[1].import+'€', '  '],[' ', 'Importe Total IVA%', this.dataConcepts[1].importIVA+'€', '  ']]
    });
    doc.addImage(img,  'JPEG', 20, 0, 50, 50);

    if(action === 'sendEmail'){
      //doc.save('presupuesto'+this.dataConcepts[1].nameBudget+'.pdf');
      let binary = doc.output();
      this.service.sendEmail(this.dataConcepts[2].email, "subject", this.dataConcepts[2].email, binary).subscribe((data) => {
      })
    }else{
      doc.save('factura'+this.dataConcepts[1].nameBudget+'.pdf');
    }
  }
}
