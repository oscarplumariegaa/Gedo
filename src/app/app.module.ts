import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule  } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { DataListComponent } from './data-list/data-list.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { EditItemComponent } from './edit-item/edit-item.component'

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    DeleteItemComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
