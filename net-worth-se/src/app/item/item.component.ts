import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: string;
  @Input() value: number;
  @Input() currency: string;
  @Input() rate: number;
  @Input() currencies: Object;
  @Output() itemUpdate = new EventEmitter<Object>();
  @Output() itemDelete = new EventEmitter<string>();
  public displayValue: number;

  constructor(private dataService : DataService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.rate != 0) {
      this.displayValue = Math.round(this.value*this.rate*100) / 100;
    }
  }

  updateItemButton(delta: number) {
    if (this.value != 0 || delta != -1) this.itemUpdate.emit({[this.item]: this.value + delta*(1/this.rate)});
  }

  updateItem(e: any) {
    let potentialValue = (e.target.value) ? Number(e.target.value) : 0;
    if (potentialValue >= 0 && potentialValue * 100 % 1 == 0 && (potentialValue - this.displayValue) !== 0) {
      this.itemUpdate.emit({[this.item]: potentialValue*(1/this.rate)});
    } else {
      e.target.value = this.displayValue;
    }
  }

  deleteItem() {
    this.itemDelete.emit(this.item);
  }
}
