import { Component, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent {
  constructor(
    private service: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  NameClient!:string;

  ngOnInit() {
    /*if(this.data){
      if(this.data.idClient){
        console.log(this.data);
        this.NameClient = this.data.nameClient;
        this.service.deleteClient(this.data.idClient).subscribe(data => {
          console.log(data);
        })
      }
    }*/
  }
  
}
