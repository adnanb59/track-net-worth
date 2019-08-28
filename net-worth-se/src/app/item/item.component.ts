import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: String;
  @Input() value: number;
  // @Output() deleteItem = new EventEmitter<String>();

  public error: boolean;

  constructor() {
    this.error = false;
   }

  ngOnInit() {
  }

  // removeItem() {
  //   this.deleteItem.emit(this.item);
  // };
}
