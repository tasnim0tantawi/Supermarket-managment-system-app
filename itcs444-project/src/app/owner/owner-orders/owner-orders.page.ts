import { Component, OnInit } from '@angular/core';
import {ColdStoreDataService, Order} from '../../cold-store-data.service';
import { ToastController} from "@ionic/angular";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-owner-orders',
  templateUrl: './owner-orders.page.html',
  styleUrls: ['./owner-orders.page.scss'],
})
export class OwnerOrdersPage implements OnInit {
  orders: Observable<Order[]> = this.coldStoreDataService.orders;
  selectedProduct: string = 'all';

  constructor(public coldStoreDataService: ColdStoreDataService, public toastController: ToastController) {
    // filter accepted orders
    this.orders = this.coldStoreDataService.orders.pipe(
      map((orders: Order[]) => orders.filter(order => order.status === 'accepted'))
    );

    console.log(this.orders);


  }
  reOrder(orderId: string | undefined) {
    if (orderId) {
    let order = this.coldStoreDataService.getOrderByID(orderId) as Order;
    this.coldStoreDataService.reOrder(order);
    //toast message
      this.coldStoreDataService.presentToast('top','Reordered successfully!');

  }
  }
  fav(orderId: string | undefined) {
    if (orderId) {
      let order = this.coldStoreDataService.getOrderByID(orderId) as Order;
      this.coldStoreDataService.toggleFavorite(order);
      //toast message
      if (!order.favorite) {
        this.presentToastAddedFav('top', 'Added to');
      } else {
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
  filterInvoice(event: any) {
    this.orders = this.coldStoreDataService.orders.pipe(
      map((orders: Order[]) => orders.filter(order => order.status === 'accepted'))
    );
    if (this.selectedProduct !== '' && this.selectedProduct !== 'All') {
      this.orders = this.orders.pipe(
        map((orders: Order[]) => orders.filter(order => order.name === this.selectedProduct))
      );
    }

    }




  ngOnInit() {
  }

}
