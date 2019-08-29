import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {
  public assets: Array<Object>;
  public liabilities: Array<Object>;
  public assetsTotal: number;
  public liabilitiesTotal: number;
  
  constructor(private dataService : DataService) {
  }

  ngOnInit() {
    this.assetsTotal = 0;
    this.liabilitiesTotal = 0;
    this.dataService.getProperty("assets").subscribe((data: any) => {
      this.assets = data;
      this.assetsTotal = data.reduce((a, v) => a + v['total'], 0);
    });
    this.dataService.getProperty("liabilities").subscribe((data: any) => {
      this.liabilities = data;
      this.liabilitiesTotal = data.reduce((a, v) => a + v['total'], 0);
    });
  }

  updateAssets(v: number) {
    this.assetsTotal += v;
  }

  updateLiabilities(v: number) {
    this.liabilitiesTotal += v;
  }
}