import { Component, OnInit } from '@angular/core';
import { ColdStoreDataService, Order } from '../../cold-store-data.service';

@Component({
  selector: 'app-owner-orders',
  templateUrl: './owner-orders.page.html',
  styleUrls: ['./owner-orders.page.scss'],
})
export class OwnerOrdersPage implements OnInit {
  orders: Order[];

  constructor(public coldStoreDataService: ColdStoreDataService) {
    this.orders = this.coldStoreDataService.allOrders;
    console.log(this.orders);

  }

  ngOnInit() {
  }

}
