import { Component, OnInit } from '@angular/core';
import {ColdStoreDataService, Order} from "../../cold-store-data.service";

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.page.html',
  styleUrls: ['./all-orders.page.scss'],
})
export class AllOrdersPage implements OnInit {
  segChoice:string="all";
  orders: Order[] = this.coldStoreDataService.allOrders;

  constructor(public coldStoreDataService: ColdStoreDataService) { }

  ngOnInit() {
  }
  cancelOrder(id:string){
    let order = this.coldStoreDataService.getOrderByID(id);
    this.coldStoreDataService.deleteOrder(order);


  }

}
