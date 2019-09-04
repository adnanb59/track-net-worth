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
  @Input() currency: string;
  @Input() rate: number;
  @Output() updateTotal = new EventEmitter<number>();
  @Output() delete = new EventEmitter<Object>();
  
  public form: object = {};

  public showNewForm: boolean;
  public currencies: Object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.showNewForm = false;
    this.dataService.getCurrencies().subscribe(data => {
      this.currencies = data['rates'];
    })
  }

  addItem() {
    let v = Math.round(this.form['value']*this.form['currency']*100)/100;
    this.dataService.addItem(this.parent, this.property, {[this.form['item']]: v}).subscribe((data: any) => {
      this.items = data['items'];
      this.form = {};
      this.total = data['total'];
      this.updateTotal.emit(v);
      this.showNewForm = false;
    });
  }

  checkInvalidNewItem() {
    if (!this.form.hasOwnProperty('item') || !this.form['item']) return true;
    else if (!this.form.hasOwnProperty('currency') || !this.form['currency']) return true;
    else if (!this.form.hasOwnProperty('value') || !this.form['value']) return true;
    else if (this.items.findIndex(item => item['label'] === this.form['item'].trim()) != -1) return true;
    else if (this.form['value'] < 0 || ((this.form['value'] * 10000) / 100) % 1 != 0) return true;
    else return false;
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
