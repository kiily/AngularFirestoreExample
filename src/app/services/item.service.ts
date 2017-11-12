import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';


@Injectable()
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  //variable for the item document
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {
    //get the collection from firebase and order by title (ascending order)
    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title', 'asc'))

    //valueChanges returns a collection as an observable (data stream)
    // this.items = this.afs.collection('items').valueChanges()

    //to retrieve the id for each item, need to use snapshotChanges() and 
    //then map the id to access the entire object
    this.items = this.itemsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item;
          //set the ide for the data observable and then return it;
          //can now access the id
          data.id = a.payload.doc.id;
          return data;
        });
      })
  }

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    //set the document to the specified id
    this.itemDoc = this.afs.doc('/items/' + item.id);
    //delete the document
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    //set the document to the specified id
    this.itemDoc = this.afs.doc('/items/' + item.id);
    //update the document by passing the new item
    this.itemDoc.update(item);
  }
}

