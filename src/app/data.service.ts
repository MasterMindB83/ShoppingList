import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getItems() {
    return this.http.get('http://localhost:3000/list');
  }
  saveItem(name1) {
    return this.http.post('http://localhost:3000/add/' + name1, {});
  }
  deleteItem(name1) {
    return this.http.delete('http://localhost:3000/delete/' + name1, {});
  }
}
