import { Component, OnInit } from '@angular/core';
import { ColdStoreDataService, User } from '../cold-store-data.service';
import { AlertController} from "@ionic/angular";
import { Router } from '@angular/router';

import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User = {} as User;
  constructor(public coldStoreDataService: ColdStoreDataService, public alertController: AlertController, public router: Router) {
    if(!this.coldStoreDataService.logged) {
      this.router.navigate(['/login']);

    }

    if(this.coldStoreDataService.logged){
      this.user = this.coldStoreDataService.allUsers.find(user => user.email === this.coldStoreDataService.loggedEmail) as User;
      console.log(this.user);
    }
    else{
      this.user = {
        id: ' ',
        email: ' ',
        name: ' ',
        role: ' ',
        image: ' ',
      };
    }

  }
  updateUser(){

    this.coldStoreDataService.updateUser(this.user).then(() => {
      this.showUpdated();
    }
    );
    ;
  }


  async showUpdated(){
    const alert = await this.alertController.create({
      header: 'Updated!',
      message: 'Your profile has been updated.',
      buttons: ['OK']
    });
    await alert.present();
    }


  ngOnInit() {
  }

}
