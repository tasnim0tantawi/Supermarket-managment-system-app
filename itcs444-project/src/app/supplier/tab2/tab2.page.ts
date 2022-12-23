import { Component } from '@angular/core';
import { ColdStoreDataService} from "../../cold-store-data.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public Datasrv: ColdStoreDataService, public navCtrl:NavController) {

  }

}
