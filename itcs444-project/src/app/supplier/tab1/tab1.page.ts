import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ColdStoreDataService} from "../../cold-store-data.service";
import { AddshiftPage } from '../../addshift/addshift.page';
import { ModalController, NavController } from '@ionic/angular';

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



  public user: users = {} as users;



  constructor(public afs: AngularFirestore, public coldStoreDataService: ColdStoreDataService, public ModalCtrl: ModalController, public navCtrl: NavController) {
    if (!this.coldStoreDataService.logged || this.coldStoreDataService.loggedRole != "supplier") {
      this.navCtrl.navigateBack('/login');
    }

  }

























  }







