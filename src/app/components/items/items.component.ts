import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items : Item[];

  //create an edit state to toggle back and forth; false --> not editing
  editState : boolean = false;
  itemToEdit : Item;

  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe( items => {
      //set the fetched items to the internal property
      this.items = items;
    });
  }

  deleteItem(event, item : Item){
    //also need to clear the state here
    this.clearState()
    this.itemService.deleteItem(item);
  }

  editItem(event, item : Item){
      this.editState = true;
      this.itemToEdit = item;
      console.log(this.itemToEdit.id);
  }

  updateItem(item : Item){
    console.log(item);
    this.itemService.updateItem(item);
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.itemToEdit=null;
  }
}
