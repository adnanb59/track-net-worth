import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sheet-form',
  templateUrl: './sheet-form.component.html',
  styleUrls: ['./sheet-form.component.css']
})

export class SheetFormComponent implements OnInit {
  @Input() properties: Array<Object>;
  @Input() category: String;
  @Output() childTotalChange = new EventEmitter<number>();
  public status: Boolean;
  public total: number;
  constructor() { 
    this.status = false;
  }

  ngOnInit() {
  }

  updateProperty(v: number) {
    this.total += v;
    this.childTotalChange.emit(v);
  }

  ngOnChanges() {
    if (this.properties && !this.total) this.total = this.properties.reduce((a, v) => a + v['total'], 0);
  }
}
