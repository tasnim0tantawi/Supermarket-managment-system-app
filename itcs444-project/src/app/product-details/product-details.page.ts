import { Component, OnInit } from '@angular/core';
import {ColdStoreDataService, Product} from "../cold-store-data.service";
import {ActivatedRoute} from "@angular/router";
import {AlertController} from "@ionic/angular";
import{NavController} from "@ionic/angular";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  name:string = this.route.snapshot.paramMap.get('name') as string;
  product = this.coldStoreDataService.getProductByName(this.name);

  constructor(public coldStoreDataService: ColdStoreDataService, private route: ActivatedRoute,
              public alertController: AlertController, public navCtrl: NavController) {
    console.log(this.product);

  }
  updateProduct() {
    this.coldStoreDataService.updateProduct(this.product).then(
      () => {
        this.showUpdateSuccess();
      }
    )
  }
  deleteProduct() {
    this.coldStoreDataService.deleteProduct(this.product).then(
      () => {
        this.showDeleteSuccess();
        this.navCtrl.navigateBack('/suppliers/tabs/tab1');

      }
    )
  }

  async showUpdateSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Product updated successfully',
      buttons: ['OK']
    });
    await alert.present();

  }
  async showDeleteSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Product deleted successfully',
      buttons: ['OK']
    });
    await alert.present();

  }

  ngOnInit() {
  }

}
