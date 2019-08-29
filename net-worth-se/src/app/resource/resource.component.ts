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
  public showNewForm: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.showNewForm = false;
  }


  updateItem(o: Object) {
    this.dataService.updateItem(this.parent, this.property, o).subscribe(data => {
      this.items = data['items'];
      this.update.emit(data['total'] - this.total);
      this.total = data['total'];
    });
  }
}
