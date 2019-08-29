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

  updateItem(prop: string, resource: string, body: Object) {
    return this.http.patch(this.base + prop + "/items?prop=" + encodeURIComponent(resource), body);
  }
}
