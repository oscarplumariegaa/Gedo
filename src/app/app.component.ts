import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLogging = false;
  name: any = '';

  constructor(private router: Router){}
  
  ngOnInit() {
    this.name = localStorage.getItem('user');
    if(this.name == null){
      this.isLogging = false;
    }else{
      this.isLogging = true;
    }
  }

  closeLogin(){
    //localStorage.clear();
    this.router.navigate(['login']);
  }
}

