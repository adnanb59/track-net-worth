import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {
  public rate: number;
  public assets: Array<Object>;
  public liabilities: Array<Object>;
  public total: number;
  public rates: Object;
  public curr: string;

  // TODO: Language & locale stuff (later)
  // TODO: Media Queries and Responsive Design
  // TODO: File upload/download
  // TODO: Move stuff to frontend, pack and move to public

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.total = 0;
    this.rate = 0;
    this.curr = '';
    this.rates = {};

    this.dataService.getProperty('assets').subscribe((data: any) => {
      this.assets = data;
      this.total += data.reduce((a, v) => a + v["total"], 0);
    });
    this.dataService.getProperty('liabilities').subscribe((data: any) => {
      this.liabilities = data;
      this.total -= data.reduce((a, v) => a + v["total"], 0);
    });
    this.dataService.getStoredCurrency().subscribe((data: Object) => {
      this.curr = data["currency"];
    });
    this.dataService.getCurrencies().subscribe((data: any) => {
      this.rates = data.rates;
      this.rate = this.rates[this.curr];
    });
  }

  addAsset(o: Array<Object>) {
    this.assets = o;
  }

  update(v: number) {
    this.total += v;
  }

  updateRate(v: string) {
    this.dataService.updateStoredCurrency(v).subscribe(() => {
      this.curr = v;
      this.rate = this.rates[v];
    });
  }

  addLiability(o: Array<Object>) {
    this.liabilities = o;
  }
}