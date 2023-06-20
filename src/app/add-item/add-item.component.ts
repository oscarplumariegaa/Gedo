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

  ngOnInit() {
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
      CIF: '',
      PhoneNumber: ''
    })

    if(this.data.idClient){
      this.service.getClientById(this.data.idClient).subscribe((client:any) => {
        this.addClientForm.controls['NameClient'].setValue(client.nameClient);
        this.addClientForm.controls['Address'].setValue(client.address);
        this.addClientForm.controls['Email'].setValue(client.email);
        this.addClientForm.controls['CIF'].setValue(client.cif);
        this.addClientForm.controls['PhoneNumber'].setValue(client.phoneNumber);
      })
    }
    if(this.data.idBudget){
      this.service.getBudgetById(this.data.idBudget).subscribe((client:any) => {
        this.addBudgetForm.controls['NameBudget'].setValue(client.nameBudget);
        this.addBudgetForm.controls['IdClient'].setValue(client.idClient);
        this.addBudgetForm.controls['IdUser'].setValue(client.idUser);
        this.addBudgetForm.controls['Import'].setValue(client.import);
        this.addBudgetForm.controls['ImportIVA'].setValue(client.importIVA);
      })
    }
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
  onAddCus(){
    if(this.data.action === 'client'){
      this.service.postClient(this.addClientForm.value).subscribe(data => {
        console.log(data);
      })
    }
    if(this.data.action === 'budget'){
      this.service.postBudget(this.addBudgetForm.value).subscribe(data => {
        console.log(data);
      })
    }
  }
}
