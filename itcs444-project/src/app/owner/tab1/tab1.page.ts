import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {ColdStoreDataService, Order} from "../../cold-store-data.service";
import { AddshiftPage } from '../../addshift/addshift.page';
import { ModalController, NavController } from '@ionic/angular';
import firebase from "firebase/compat";
import User = firebase.User;

export interface users {
  id?:string;
  email:string;
  name: string;
  role:string;
}

export interface shifts {
  id?:string;
  date:string;
  shift1id: string;
  shift1name: string;
  shift2id: string;
  shift2name: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  orders: Observable<Order[]> | undefined;
  order: Order = {} as Order;

  suppliers = this.Datasrv.getSuppliers();
  supplier : User = {} as User;
    constructor(public afs: AngularFirestore , public Datasrv: ColdStoreDataService,public ModalCtrl:ModalController, public navCtrl:NavController) {
      if (!this.Datasrv.logged || this.Datasrv.loggedRole!="owner"){
        this.navCtrl.navigateBack('/login');


      }}

      ngOnInit() {
        this.orders = this.Datasrv.getOrders();

      }































  }







