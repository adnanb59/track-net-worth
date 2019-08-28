import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sheet-form',
  templateUrl: './sheet-form.component.html',
  styleUrls: ['./sheet-form.component.css']
})

export class SheetFormComponent implements OnInit {
  @Input() properties: Object;
  @Input() total: number;
  @Input() category: String;
  public status: Boolean;
  constructor() { 
    this.status = false;
  }

  ngOnInit() {
  }
}
