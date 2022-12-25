import { Component, OnInit } from '@angular/core';
import { ColdStoreDataService, User } from '../cold-store-data.service';
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
  constructor(public coldStoreDataService: ColdStoreDataService) {


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



  ngOnInit() {
  }

}
