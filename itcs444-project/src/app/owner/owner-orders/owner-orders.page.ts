import { Component, OnInit } from '@angular/core';
import { ColdStoreDataService, Order, User } from '../../cold-store-data.service';
import { ToastController} from "@ionic/angular";

@Component({
  selector: 'app-owner-orders',
  templateUrl: './owner-orders.page.html',
  styleUrls: ['./owner-orders.page.scss'],
})
export class OwnerOrdersPage implements OnInit {

  constructor(public coldStoreDataService: ColdStoreDataService, public toastController: ToastController) {


  }
  reOrder(orderId: string | undefined) {
    if (orderId) {
    let order = this.coldStoreDataService.getOrderByID(orderId) as Order;
    this.coldStoreDataService.reOrder(order);
    //toast message
    this.presentReorder('top');

  }
  }
  fav(orderId: string | undefined) {
    if (orderId) {
    let order = this.coldStoreDataService.getOrderByID(orderId) as Order;
    this.coldStoreDataService.toggleFavorite(order);
    //toast message
      if (!order.favorite) {
        this.presentToastAddedFav('top', 'Added to');
      }
      else {
        this.presentToastAddedFav('top', 'Removed from');
      }

  }
  }
  async presentToastAddedFav(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message +' favorites!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }
  async presentReorder(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Item reordered successfully!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  ngOnInit() {
  }

}
