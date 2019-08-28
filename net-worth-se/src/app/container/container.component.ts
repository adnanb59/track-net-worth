import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {
  public obj: Object;
  
  constructor() {
    this.obj = {
      "Currency": "CAD",
      "Totals": {
        "Assets": 2200427,
        "Liabilities": 908297
      },
      "Assets": {
        "Cash and Investments": {
          "Chequing": 2000,
          "Savings for Taxes": 4000,
          "Rainy Day Fund": 506,
          "Savings for Fun": 5000,
          "Savings for Travel": 400,
          "Savings for Personal Development": 200,
          "Investment 1": 5000,
          "Investment 2": 60000,
          "Investment 3": 30000,
          "Investment 4": 50000,
          "Investment 5": 24000
        },
        "Long Term Assets": {
          "Primary Home": 455000,
          "Second Home": 1564321,
          "Other": 0
        }
      },
      "Liabilities": {
        "Short Term Liabilities": {
          "Credit Card 1": 4342,
          "Credit Card 2": 322,
          "(others...)": 0
        },
        "Long Term Debt": {
          "Mortgage 1": 250999,
          "Mortgage 2": 632634,
          "Line of Credit": 10000,
          "Investment Loan": 10000,
          "Student Loan": 0,
          "Car Loan": 0
        }
      }
    };
  }

  ngOnInit() {
  }
}