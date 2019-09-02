import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private base: string = "http://localhost:4201/api/";
  constructor(private http: HttpClient) { }

  getProperty(prop: string) {
    return this.http.get(this.base + prop);
  }

  addResource(prop: String, body: Object) {
    return this.http.post(this.base + prop, body)
  }

  deleteResource(prop: string, resource: string) {
    return this.http.delete(this.base + prop + "?prop=" + encodeURIComponent(resource));
  }

  addItem(prop: string, resource: string, body: Object) {
    return this.http.post(this.base + prop + "/items?prop=" + encodeURIComponent(resource), body)
  }

  updateItem(prop: string, resource: string, body: Object) {
    return this.http.patch(this.base + prop + "/items?prop=" + encodeURIComponent(resource), body);
  }

  deleteItem(prop: string, resource: string, item: string) {
    return this.http.delete(this.base + prop + "/items?prop=" + encodeURIComponent(resource) + "&item=" + encodeURIComponent(item));
  }
}
