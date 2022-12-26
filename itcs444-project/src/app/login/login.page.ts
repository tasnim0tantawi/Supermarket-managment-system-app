import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ColdStoreDataService } from '../cold-store-data.service';
import { ModalController, NavController } from '@ionic/angular';


export interface user{
  email:string;
  password:string;
  uid?:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  ngOnInit() {
  }


 constructor(public afAuth: AngularFireAuth , public Datasrv: ColdStoreDataService, public modalController: ModalController, public navCtrl: NavController) { }



     email:string="";
     password:string="";


     login(){
         this.afAuth.signInWithEmailAndPassword(this.email,this.password)
         .then( (response)=>{
          alert("Login Successful");
          this.Datasrv.logged=true;
          this.Datasrv.loggedEmail=this.email;
          this.Datasrv.loggedName= this.Datasrv.getUserByEmail(this.email).name;

          let role =this.Datasrv.checkRole();

           if (role=="owner"){
             this.navCtrl.navigateForward('/owner/tabs/tab1');
            }
            else if (role=="supplier"){
              this.navCtrl.navigateForward('/supplier/tabs/tab1');
            }
            else if (role=="employee"){
              this.navCtrl.navigateForward('/employee/tabs/tab1');
            }

         })
         .catch( (err)=>{
          alert("error");
         })
         }



     }




