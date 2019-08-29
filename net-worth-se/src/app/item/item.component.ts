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
  @Output() itemUpdate = new EventEmitter<Object>();
  @Output() itemDelete = new EventEmitter<Object>();

  constructor(private dataService : DataService) {
  }

  ngOnInit() {
  }

  updateItem(e: any) {
    let potentialValue = (e.target.value) ? Number(e.target.value) : 0;
    if (potentialValue >= 0 && potentialValue * 100 % 1 == 0 && (potentialValue - this.value) !== 0) {
      this.itemUpdate.emit({[this.item]: potentialValue});
    } else {
      e.target.value = this.value;
    }
  }

  deleteItem(e: any) {
    this.itemDelete.emit({[this.item]: this.value});
  }
}
