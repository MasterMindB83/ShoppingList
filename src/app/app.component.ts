import { Component } from '@angular/core';
import {DataService} from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShoppingList';
  add: string;
  items: Object;
  test: string;
  constructor(private data: DataService) {
    this.refreshData();
  }
  addItem() {
    this.data.saveItem(this.add).subscribe((data) => console.log('Item added'));
    this.refreshData();
  }
  removeItem(name) {
      this.data.deleteItem(name).subscribe((data) => console.log('Item deleted'));
      this.refreshData();
  }
  refreshData() {
    // this.items = [{name: 'Hleb'},{name:'Mleko'},{name: 'Sir'}];
    this.data.getItems().subscribe((data) => this.items = data);
  }
}
