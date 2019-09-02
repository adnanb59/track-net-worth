import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  @Input() property: string;
  @Input() items: Array<Object>;
  @Input() parent: string;
  @Input() total: number;
  @Output() updateTotal = new EventEmitter<number>();
  @Output() delete = new EventEmitter<Object>();
  public newItem: string;
  public showNewForm: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.newItem = "";
    this.showNewForm = false;
  }

  addItem() {
    console.log(this.newItem);
    if (this.newItem != "") {
      this.dataService.addItem(this.parent, this.property, {[this.newItem]: 0}).subscribe((data: any) => {
        this.items = data.items;
        this.newItem = "";
        this.showNewForm = false;
      });
    }
  }

  checkValidNewItem() {
    let c = this.newItem === "" || this.items.findIndex(item => item['label'] === this.newItem) != -1;
    return c;
  }

  deleteItem(s: string) {
    this.dataService.deleteItem(this.parent, this.property, s).subscribe(data => {
      if (data['data']) {
        let idx = this.items.findIndex(item => item['label'] === data['data']);
        let change = this.items.splice(idx, 1)[0]['value'];
        this.total -= change;
        this.updateTotal.emit(change*-1);
      }
    });
  }

  updateItem(o: Object) {
    this.dataService.updateItem(this.parent, this.property, o).subscribe(data => {
      this.items = data['items'];
      this.updateTotal.emit(data['total'] - this.total);
      this.total = data['total'];
    });
  }

  deleteResource() {
    this.dataService.deleteResource(this.parent, this.property).subscribe(data => {
      this.delete.emit(data);
    });
  }
}
