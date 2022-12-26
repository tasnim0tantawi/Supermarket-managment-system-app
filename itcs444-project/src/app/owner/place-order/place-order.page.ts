import { Component, OnInit } from '@angular/core';
import {ColdStoreDataService, Product} from "../../cold-store-data.service";
import {ActivatedRoute} from "@angular/router";
import { NavController} from "@ionic/angular";

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  // get order name from URL
  productName = this.route.snapshot.params['name'];
  product: Product;
  numCartoons: number = 0;




  constructor(public coldStoreDataService: ColdStoreDataService, public route: ActivatedRoute, public navCtrl: NavController) {
    this.product = this.coldStoreDataService.getProductByName(this.productName);
  }


  placeOrder(){
    this.coldStoreDataService.createOrder({
      title: this.numCartoons +' of '+this.productName + ' from '+this.product.supplier,
      name: this.product.name,
      totalPrice: this.product.price * this.numCartoons * this.product.perCartoon,
      totalQuantity: this.numCartoons * this.product.perCartoon,
      date: [new Date().toLocaleDateString()],
      status: "pending",
      supplier: this.product.supplier,
      favorite: false,
      numOrdered: 1,
      numCartoons: this.numCartoons,
    }).then(() => {
      this.coldStoreDataService.presentToast("bottom","Order placed successfully");
      this.navCtrl.navigateBack('/owner/tabs/tab3');
    }).catch((err) => {
      this.coldStoreDataService.presentToast("bottom","Error placing order");
    });
    }



  ngOnInit() {
  }

}
