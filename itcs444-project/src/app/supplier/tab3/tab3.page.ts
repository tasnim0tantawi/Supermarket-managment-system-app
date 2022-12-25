import { Component } from '@angular/core';
import { ColdStoreDataService, Order, User } from '../../cold-store-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public coldStoreDataService: ColdStoreDataService) {
  }
  acceptOrder(order: Order) {
    let product = this.coldStoreDataService.getProductByName(order.name);
    this.coldStoreDataService.acceptOrder(order, product);
  }
  rejectOrder(order: Order) {
    this.coldStoreDataService.rejectOrder(order);
  }
  }


