import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  addUserForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private service: ApiService
  ){}

  ngOnInit() {
    this.createForm();
  }
  checkValidation(input: string) {
    const validation = this.addUserForm.controls[input].invalid && (this.addUserForm.controls[input].dirty || this.addUserForm.controls[input].touched)
    return validation;
  }
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.addUserForm = this.fb.group({
      Name: '',
      Email: '',
      Password: '',
      Address: '',
      CIF: '',
      PhoneNumber: ''
    })
  }
  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  registerUser(){
    console.log(this.addUserForm.value);
    this.service.registerUser(this.addUserForm.value).subscribe((data: any) => {
      console.log(data);
    })
  }
}
