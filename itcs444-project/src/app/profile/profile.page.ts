import { Component, OnInit } from '@angular/core';
import { ColdStoreDataService, User } from '../cold-store-data.service';
import { AlertController} from "@ionic/angular";
import { Router } from '@angular/router';


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
      this.coldStoreDataService.presentToast("bottom", "Your profile has been updated !");
    }
    );
  }
  deleteUser() {
    this.coldStoreDataService.deleteUser(this.user).then(() => {
      if (this.user.role === 'supplier') {

        this.coldStoreDataService.deleteSupplier(this.coldStoreDataService.getSupplierByName(this.user.name));

      }
      this.coldStoreDataService.presentToast("bottom", "Sad to see you leave :(").then(() => {
          // log out
          this.coldStoreDataService.logged = false;
          this.router.navigate(['/login']);

        }
      );
    });
  }




  ngOnInit() {
  }

}
