import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule  } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { BillsListComponent } from './bills-list/bills-list.component';
import { BudgetsListComponent } from './budgets-list/budgets-list.component'

@NgModule({
  declarations: [
    AppComponent,
    DeleteItemComponent,
    EditItemComponent,
    ClientsListComponent,
    BillsListComponent,
    BudgetsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
