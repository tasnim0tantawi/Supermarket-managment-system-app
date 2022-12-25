import { Component } from '@angular/core';
import {ColdStoreDataService, Product} from "../../cold-store-data.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  products: Product[] = [] as Product[];

  constructor(public coldStoreDataService: ColdStoreDataService) {
    this.products = this.coldStoreDataService.allProducts;

  }



}
