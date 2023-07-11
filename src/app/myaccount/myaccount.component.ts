import { Component } from '@angular/core';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent {

  username: any = '';

  ngOnInit() {
    this.username = localStorage.getItem('user');
  }
}
