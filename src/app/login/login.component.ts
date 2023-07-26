import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addUserForm!: FormGroup;
  loginUserForm!: FormGroup;
  hide = true;
  isLogging: boolean = false;
  modalOpen: string = 'login';

  username: string = "";
  password: string = "";
  show: boolean = false;
  loginmessage: string = "";

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private router: Router
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
    this.loginUserForm = this.fb.group({
      email: '',
      password: ''
    })
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
    this.service.registerUser(this.addUserForm.value).subscribe((data: any) => {
      this.router.navigate(['']);
      window.location.reload();
    })
  }

  submit() {
    this.service.loginUser(this.loginUserForm.controls['email'].value, this.loginUserForm.controls['password'].value).subscribe((data: any) => {
      localStorage.setItem('idUser', data[0].idUser);
      this.router.navigate(['main/home']);
    }, error => {
      this.show = !this.show;
      this.loginmessage = 'Credenciales no válidas';
    })
  }

  goTo(action: string){
    this.modalOpen = action;
  }
}
