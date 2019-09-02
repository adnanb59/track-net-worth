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
  public total: number;
  
  // TODO: Currency dropdown
  // TODO: Language & locale stuff
  // TODO: Language stuff
  // TODO: Build stuff & refactoring
  // TODO: Media Queries and Responsive Design
  // TODO: File upload/download
  // TODO: Move stuff to frontend, pack and move to public

  constructor(private dataService : DataService) {
  }

  ngOnInit() {
    this.total = 0;
    this.dataService.getProperty("assets").subscribe((data: any) => {
      this.assets = data;
      this.total += data.reduce((a, v) => a + v['total'], 0);
    });
    this.dataService.getProperty("liabilities").subscribe((data: any) => {
      this.liabilities = data;
      this.total -= data.reduce((a, v) => a + v['total'], 0);
    });
  }

  addAsset(o: Array<Object>) {
    this.assets = o;
  }

  update(v: number) {
    this.total += v;
  }

  addLiability(o: Array<Object>) {
    this.liabilities = o;
  }
}