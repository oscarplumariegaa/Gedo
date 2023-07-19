import { Component, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public addClientForm!: FormGroup;
  public addBudgetForm!: FormGroup;
  public breakpoint!: number;
  wasFormChanged = false;
  clients!: any;
  public fieldArray: Array<any> = [];
  public newConcept: any = {};
  lastBudgetId!: number;
  public conceptData: any;
  public nextNameBudget!: string;
  public notEdit: boolean = true;
  idUser: any;
  year: any;

  ngOnInit() {
    this.year =  new Date().getFullYear().toString().substring(2,4);
    this.idUser = localStorage.getItem('idUser');
    this.newConcept, this.fieldArray = [];

    this.service.lastIdBudgetByUser(this.idUser).subscribe((data: any) => {
      if (data === 0) {
        this.lastBudgetId = data + 1;
        this.nextNameBudget = "0000" + '-' + this.year;
      } else {
        this.lastBudgetId = data.idBudget + 1;
        this.padNumber(data.nameBudget);
      }
    })
    this.addBudgetForm = this.fb.group({
      NameBudget: '',
      IdBudget: '',
      IdClient: '',
      IdUser: this.idUser,
      Import: '',
      ImportIVA: '',
      IdBill: '',
      IVA: 0
    })
    this.addClientForm = this.fb.group({
      NameClient: '',
      Address: '',
      Email: '',
      IdUser: this.idUser,
      CIF: '',
      PhoneNumber: ''
    })
    if (this.data.client) {
      this.addClientForm = this.fb.group({
        NameClient: this.data.client.nameClient ? this.data.client.nameClient : '',
        Address: this.data.client.address ? this.data.client.address : '',
        Email: this.data.client.email ? this.data.client.email : '',
        IdUser: this.idUser,
        CIF: this.data.client.cif ? this.data.client.cif : '',
        PhoneNumber: this.data.client.phoneNumber ? this.data.client.phoneNumber : ''
      })
    }
    if (this.data.budget) {
      if (this.data.budget.idBill > 0) {
        this.notEdit = false;
      }
      this.service.getBudgetConcepts(this.data.budget.idBudget).subscribe(data => {
        this.conceptData = data;
      })
      this.addBudgetForm = this.fb.group({
        NameBudget: this.data.budget.nameBudget ? this.data.budget.nameBudget : '',
        NameClient: this.data.budget.nameClient ? this.data.budget.nameClient : '',
        IdClient: this.data.budget.idClient ? this.data.budget.idClient : '',
        IdUser: this.idUser,
        Import: this.data.budget.import ? this.data.budget.import : '',
        ImportIVA: this.data.budget.importIVA ? this.data.budget.importIVA : '',
        IdBill: this.data.budget.idBill ? this.data.budget.idBill : '',
        IVA: this.data.budget.iva ? this.data.budget.iva : ''
      })
    }
    this.service.getClientsByUser(this.idUser).subscribe(clients => {
      this.clients = clients;
    })
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 1;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  padNumber(num: any) {
    let nsplit = num.split('-');
    num = nsplit[0];
    let nNumber: number = +num + 1;
    let n = nNumber.toString();
    let size = n.toString().length;
    if (size === 1) {
      n = "000" + nNumber;
    } else if (size === 2) {
      n = "00" + nNumber;
    } else if (size === 3) {
      n = "0" + nNumber;
    }
    this.nextNameBudget = n + '-' + this.year;
  }

  formChanged() {
    this.wasFormChanged = true;
  }
  openDialog(): void {
    if (this.addClientForm.dirty) {
      const dialogRef = this.dialog.closeAll()
    } else {
      this.dialog.closeAll();
    }
  }
  onAddCus() {
    if (this.data.action === 'createBill') {
      let arrBill =
      {
        "idUser": this.idUser,
        "idClient": this.data.budget.idClient,
        "idBudget": this.data.budget.idBudget,
        "nameBill": this.data.budget.nameBudget,
        "nameClient": this.data.budget.nameClient
      };

      this.service.postBill(arrBill).subscribe(data => {
        this.conceptsFunction('bill', this.fieldArray, this.conceptData);
        window.location.reload();
      })
    }
    if (this.data.action === 'client') {
      this.service.postClient(this.addClientForm.value).subscribe(data => {
        window.location.reload();
      })
    }
    if (this.data.action === 'budget') {
      this.addBudgetForm.removeControl('IdBill');
      this.addBudgetForm.controls['IdBudget'].setValue(this.lastBudgetId);
      this.addBudgetForm.controls['IVA'].setValue(parseInt(this.addBudgetForm.controls['IVA'].value));

      this.service.postBudget(this.addBudgetForm.value).subscribe(data => {
        this.conceptsFunction('budget', this.fieldArray, 0);
        window.location.reload();
      })
    }
    if (this.data.budget) {
      this.addBudgetForm.removeControl('IdBudget');
      this.addBudgetForm.removeControl('IdBill');
      this.service.editBudget(this.data.budget.idBudget, this.addBudgetForm.value).subscribe(data => {
        this.conceptsFunction('budget', this.fieldArray, this.conceptData);
        window.location.reload();
      })
    }
  }
  addFieldValue() {
    let importBudget = parseInt(this.addBudgetForm.controls['Import'].value);

    if (this.data.budget) {
      this.newConcept['idBudget'] = this.data.budget.idBudget;
    }

    this.calculateImport(importBudget, parseFloat(this.newConcept.value), 'sum');

    this.fieldArray.push(this.newConcept);
    this.newConcept = {};
  }

  deleteFieldValue(index: number) {
    let importBudget = parseInt(this.addBudgetForm.controls['Import'].value);
    this.calculateImport(importBudget, parseFloat(this.fieldArray[index].value), 'res');

    this.fieldArray.splice(index, 1);
  }

  calculateImport(a: any, b: any, o:any){
    if(isNaN(a)){
      a = 0;
    }
    if(o == 'res'){
      a = a - b;
    }else{
      a = a + b;
    }

    this.addBudgetForm.controls['Import'].setValue(a);

    if(this.addBudgetForm.controls['IVA'].value > 0){
      if(this.addBudgetForm.controls['IVA'].value == 10){
        this.addBudgetForm.controls['ImportIVA'].setValue(a * 1.1);
      }else{
        this.addBudgetForm.controls['ImportIVA'].setValue(a * 1.21);
      }
    }
  }

  ivaChange(iva: any){
    if(iva == 10){
      this.addBudgetForm.controls['ImportIVA'].setValue(this.addBudgetForm.controls['Import'].value * 1.1);
    }else{
      this.addBudgetForm.controls['ImportIVA'].setValue(this.addBudgetForm.controls['Import'].value * 1.21);
    }
  }

  conceptsFunction(action: string, newConcepts: any, toEditConcepts: any) {
    if (action === 'budget') {
      if (toEditConcepts.length > 0) {
        if (toEditConcepts.length > 0) {
          this.service.editConcepts(this.data.budget.idBudget, toEditConcepts).subscribe(data => { })
        }
        if (newConcepts.length > 0) {
          this.service.editConcepts(this.data.budget.idBudget, newConcepts).subscribe(data => { })
        }
      } else {
        console.log(this.lastBudgetId);
          for (let i = 0; i < newConcepts.length; i++) {
            newConcepts[i].idBudget = this.lastBudgetId;
          }
          if (newConcepts.length > 0) {
            this.service.postConcepts(newConcepts).subscribe(data => { })
          }
      }
    } else {
      this.service.billByBudget(this.data.budget.idBudget).subscribe((id: any) => {
        this.addBudgetForm.controls['IdBill'].setValue(id);
        this.service.editBudget(this.data.budget.idBudget, this.addBudgetForm.value);
        if (toEditConcepts && toEditConcepts.length > 0) {
          for (let i = 0; i < toEditConcepts.length; i++) {
            toEditConcepts[i]['idBill'] = id;
          }
          this.service.editConcepts(this.data.budget.idBudget, toEditConcepts).subscribe(data => {
           })
        }
      })
    }
  }
}
