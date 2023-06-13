import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.css']
})
export class BudgetsListComponent {
  displayedColumns: string[] = ['Client', 'Import', 'ImportIVA'];
  dataSource:any = [];

  constructor(private service: ApiService){}
  ngOnInit() {
    this.service.getBudgets().subscribe(budgets => {
      console.log(budgets);
      this.dataSource = budgets;
    })
  }
}
