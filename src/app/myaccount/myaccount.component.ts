import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent {

  userForm!: FormGroup;
  idUser: any = '';
  user: any;
  srcResult:any;

  constructor(private fb: FormBuilder, private service: ApiService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Name: '',
      Email: '',
      Address: '',
      CIF: '',
      PhoneNumber: '',
      Logo: ''
    })

    this.idUser = localStorage.getItem('idUser');
    this.service.dataUser(this.idUser).subscribe((data) => {
      this.user = data;

      this.userForm.controls['Name'].setValue(this.user.name);
      this.userForm.controls['Email'].setValue(this.user.email);
      this.userForm.controls['Address'].setValue(this.user.address);
      this.userForm.controls['CIF'].setValue(this.user.cif);
      this.userForm.controls['PhoneNumber'].setValue(this.user.phoneNumber);
      this.userForm.controls['Logo'].setValue(this.user.logo);
    })

  }

  onFileSelected(event:any){
    this.userForm.controls['Logo'].setValue(event.target.files[0].name);
  }
  editUser(){
    this.service.editUser(this.user.idUser, this.userForm.value).subscribe(data => {
    })
  }
}
