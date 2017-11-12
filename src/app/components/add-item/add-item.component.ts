import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item = {
    title: "",
    description: ""
  }
  
  constructor(private itemService : ItemService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.item.title != '' && this.item.description != ''){
      //item is valid
      this.itemService.addItem(this.item);
      //clear the fields
      this.item.title ='';
      this.item.description ='';
    }
  }
}
