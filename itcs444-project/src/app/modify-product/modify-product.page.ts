import { Component, OnInit } from '@angular/core';
import { ColdStoreDataService, Product} from "../cold-store-data.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.page.html',
  styleUrls: ['./modify-product.page.scss'],
})
export class ModifyProductPage implements OnInit {
  // get the product name from the url
  name: string = this.route.snapshot.params['name'];
  product: Product;

  constructor(private coldStoreDataService: ColdStoreDataService, private route: ActivatedRoute) {
    this.product = this.coldStoreDataService.getProductByName(this.name);
  }

  ngOnInit() {
  }
  updateProduct() {
    this.coldStoreDataService.updateProduct(this.product);
  }

}
