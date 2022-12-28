import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { ColdStoreDataService} from "../../cold-store-data.service";
import { ModalController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(public afs: AngularFirestore, public coldStoreDataService: ColdStoreDataService, public ModalCtrl: ModalController, public navCtrl: NavController) {
    if (!this.coldStoreDataService.logged || this.coldStoreDataService.loggedRole != "supplier") {
      this.navCtrl.navigateBack('/login');
    }
  }
}































