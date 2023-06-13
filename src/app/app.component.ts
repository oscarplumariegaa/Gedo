import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('Facturas')
  Facturas!: TemplateRef<any>;

  @ViewChild('Clientes')
  Clientes!: TemplateRef<any>;

  @ViewChild('Presupuestos')
  Presupuestos!: TemplateRef<any>;

  allTabs: any;

  ngOnInit() {
    this.allTabs = [
      { name: 'Facturas'},
      { name: 'Presupuestos'},
      { name: 'Clientes'}
    ];
  }
}

