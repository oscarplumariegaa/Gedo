import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent {
  isLogging = false;
  name: any = '';

  constructor(private router: Router){}
  
  ngOnInit() {
    this.name = localStorage.getItem('idUser');
    if(this.name == null){
      this.isLogging = false;
    }else{
      this.isLogging = true;
    }
  }

  closeLogin(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
