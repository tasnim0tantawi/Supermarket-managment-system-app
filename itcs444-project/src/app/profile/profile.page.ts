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
  user: User | undefined = {
    id: '',
    email: '',
    name: '',
    password: '',
    role: '',
    image: '',
    username: '',

  };

  constructor(public coldStoreDataService: ColdStoreDataService) {
    if(this.coldStoreDataService.logged){
      this.user = this.coldStoreDataService.allUsers.find(user => user.email === this.coldStoreDataService.loggedEmail);
      console.log(this.user);
    }

  }





  ngOnInit() {
  }

}
