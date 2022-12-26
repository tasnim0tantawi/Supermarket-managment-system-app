import { Component, OnInit } from '@angular/core';
import { ColdStoreDataService, Order, User } from '../cold-store-data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  name: string = '';
  role: string = '';
  password: string = '';
  passwordConfirm: string = '';
  phone: string = '';

  constructor(public coldStoreDataService: ColdStoreDataService, public afAuth: AngularFireAuth) {}
  addUser() {
    const newUser = {
      name: this.name,
      email: this.email,
      role: this.role,
      image: "https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146"
    }
    if (this.password === this.passwordConfirm) {
      this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then( (response)=>{
        this.coldStoreDataService.presentToast('bottom', 'Registration Successful');
        this.coldStoreDataService.updateUser(newUser);
        if (this.role === 'supplier') {
          this.coldStoreDataService.createSupplier({
            name: this.name,
            phone: this.phone,
            soldQuantity: 0
          });
        }

      })
      .catch( (err)=>{
        this.coldStoreDataService.presentToast('bottom', 'Registration Failed');
        console.log(err);
      })

    }
    else {
      this.coldStoreDataService.presentToast('bottom', 'Passwords do not match!');
    }
  }


  ngOnInit() {
  }

}
