import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  @Output() update = new EventEmitter<number>();
  @Output() delete = new EventEmitter<Object>();
  public newItem: string;
  public showNewForm: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.newItem = "";
    this.showNewForm = false;
  }

  addItem() {
    if (this.newItem != "") {
      this.dataService.addItem(this.parent, this.property, {[this.newItem]: 0}).subscribe((data: any) => {
        alert(data);
        this.items = data;
        this.newItem = "";
      });
    }
  }

  deleteItem(o: Object) {
    this.dataService.deleteItem(this.parent, this.property, o).subscribe(data => {
      this.items = data['items'];
      this.update.emit(data['total'] - this.total);
      this.total = data['total'];
    });
  }

  updateItem(o: Object) {
    this.dataService.updateItem(this.parent, this.property, o).subscribe(data => {
      this.items = data['items'];
      this.update.emit(data['total'] - this.total);
      this.total = data['total'];
    });
  }

  deleteResource(e: any) {
    this.dataService.deleteResource(this.parent, this.property).subscribe(data => {
      this.delete.emit(data);
    });
  }
}
