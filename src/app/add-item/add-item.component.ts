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
  lastBillId!: number;
  public conceptData: any;
  public nextNameBudget!: string;

  ngOnInit() {
    this.newConcept, this.fieldArray = [];
    this.service.lastIdBudgetByUser(2).subscribe((data: any) => {
      this.lastBudgetId = data.idBudget+1;
      if(data === 0){
        this.nextNameBudget = "0000";
      }else{
        this.padNumber(data.nameBudget);
      }
    })
    this.service.lastIdBillByUser(2).subscribe((id: any) => {
      this.lastBillId = id;
    })
    this.addBudgetForm = this.fb.group({
      NameBudget: '',
      IdClient: '',
      IdUser: 2,
      Import: '',
      ImportIVA: ''
    })
    this.addClientForm = this.fb.group({
      NameClient: '',
      Address: '',
      Email: '',
      IdUser: 2,
      CIF: '',
      PhoneNumber: ''
    })
    if (this.data.client) {
      this.addClientForm = this.fb.group({
        NameClient: this.data.client.nameClient ? this.data.client.nameClient : '',
        Address: this.data.client.address ? this.data.client.address : '',
        Email: this.data.client.email ? this.data.client.email : '',
        IdUser: 2,
        CIF: this.data.client.cif ? this.data.client.cif : '',
        PhoneNumber: this.data.client.phoneNumber ? this.data.client.phoneNumber : ''
      })
    }
    if (this.data.budget) {
      this.service.getBudgetConcepts(this.data.budget.idBudget).subscribe(data => {
        this.conceptData = data;
      })
      this.addBudgetForm = this.fb.group({
        NameBudget: this.data.budget.nameBudget ? this.data.budget.nameBudget : '',
        NameClient: this.data.budget.nameClient ? this.data.budget.nameClient : '',
        IdClient: this.data.budget.idClient ? this.data.budget.idClient : '',
        IdUser: 2,
        Import: this.data.budget.import ? this.data.budget.import : '',
        ImportIVA: this.data.budget.importIVA ? this.data.budget.importIVA : ''
      })
    }
    this.service.getClientsByUser(2).subscribe(clients => {
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

  padNumber(num:any){
    let nNumber: number = +num+1;
    let n = nNumber.toString();
    let size = n.toString().length;
    if(size === 1){
      n = "000"+nNumber;
    }else if(size === 2){
      n = "00"+nNumber;
    }else if(size === 3){
      n = "0"+nNumber;
    }
    this.nextNameBudget = n;
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
    console.log(this.data.action);
    if (this.data.action === 'createBill') {
      let arrBill =
      {
        "idUser": 2,
        "idClient": this.data.budget.idClient,
        "idBudget": this.data.budget.idBudget
      };
      this.service.postBill(arrBill).subscribe(data => {
        this.conceptsFunction(this.fieldArray, this.conceptData);
      })
    }
    if (this.data.action === 'client') {
      this.service.postClient(this.addClientForm.value).subscribe(data => {
        window.location.reload();
      })
    }
    if (this.data.action === 'budget') {
      this.service.postBudget(this.addBudgetForm.value).subscribe(data => {
        this.conceptsFunction(this.fieldArray, 0);
        window.location.reload();
      })
    }
    if(this.data.budget){
      this.addBudgetForm.removeControl('IdBudget');
      this.service.editBudget(this.data.budget.idBudget, this.addBudgetForm.value).subscribe(data => {
        this.conceptsFunction(this.fieldArray, this.conceptData);
      })
    }
  }
  addFieldValue() {
    this.newConcept['IdBudget'] = this.data.budget.idBudget;
    this.fieldArray.push(this.newConcept);
    this.newConcept = {};
  }

  deleteFieldValue(index: number) {
    this.fieldArray.splice(index, 1);
  }

  conceptsFunction(newConcepts:any, toEditConcepts:any){
    console.log(newConcepts);
    console.log(toEditConcepts);
    if(toEditConcepts){
      if (toEditConcepts.length > 0) {
        for (let i = 0; i < toEditConcepts.length; i++) {
          toEditConcepts[i]['idBill'] = this.lastBillId;
        }
        this.service.editConcepts(this.data.budget.idBudget, toEditConcepts).subscribe(data => { })
      }
    }
    if (newConcepts.length > 0) {
      for (let i = 0; i < newConcepts.length; i++) {
        newConcepts[i]['idBill'] = this.lastBillId;
      }
      this.service.editConcepts(this.data.budget.idBudget, newConcepts).subscribe(data => { })
    }
  }
}
