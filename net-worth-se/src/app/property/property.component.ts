import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})

export class PropertyComponent implements OnInit {
  @Input() properties: Array<Object>;
  @Input() category: String;
  @Output() childTotalChange = new EventEmitter<number>();
  @Output() add = new EventEmitter<Object>();
  public showForm: Boolean;
  public total: number;
  public newResource: string;

  constructor(private dataService: DataService) { 
  }

  ngOnInit() {
    this.showForm = false;
    this.newResource = "";
  }

  addProperty() {
    if (this.newResource != "") {
      this.dataService.addResource(this.category.toLowerCase(), {name: this.newResource}).subscribe(data => {
        this.add.emit(data);
        this.newResource = "";
        this.showForm = false;
      });
    }
  }

  updateProperty(v: number) {
    this.total += v;
    this.childTotalChange.emit(this.category === "Assets" ? v : -1*v);
  }

  deleteProperty(o: Array<Object>) {
    this.properties = o;
    let v = this.total - o.reduce((a, b) => a + b['total'], 0);
    this.total -= v;
    this.childTotalChange.emit(-1*v);
  }

  ngOnChanges() {
    if (this.properties && !this.total) this.total = this.properties.reduce((a, v) => a + v['total'], 0);
  }
}
