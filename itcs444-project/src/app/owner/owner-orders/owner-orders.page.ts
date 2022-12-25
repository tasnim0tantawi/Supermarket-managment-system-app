import { Component, OnInit } from '@angular/core';
import { ColdStoreDataService, Order, User } from '../../cold-store-data.service';

@Component({
  selector: 'app-owner-orders',
  templateUrl: './owner-orders.page.html',
  styleUrls: ['./owner-orders.page.scss'],
})
export class OwnerOrdersPage implements OnInit {

  constructor(public coldStoreDataService: ColdStoreDataService) {


  }

  ngOnInit() {
  }

}
