import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  @Input() property: String;
  @Input() items: Object;
  // @Output() update = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  // deleteItem(v: string) {
  //   let L = this.items[v];
  //   delete this.items[v];
  //   this.update.emit(-1*L);
  // }
}
