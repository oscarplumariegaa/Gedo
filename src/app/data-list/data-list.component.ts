import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent {

  @Input() optionName!: string;

  constructor(private service: ApiService) {}

  ngOnInit() {
    if(this.optionName === 'Clientes'){
      console.log(this.optionName)
      this.service.getClients();
    }
  }
}
