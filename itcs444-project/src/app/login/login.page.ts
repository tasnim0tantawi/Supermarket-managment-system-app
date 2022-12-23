import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ColdStoreDataService } from '../cold-store-data.service';


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




 constructor(public afAuth: AngularFireAuth , public Datasrv: ColdStoreDataService) {

     }



     email:string="";
     password:string="";


     login(){
         this.afAuth.signInWithEmailAndPassword(this.email,this.password)
         .then( (response)=>{
          alert("Login Successful");
          this.Datasrv.logged=true;
          this.Datasrv.loggedEmail=this.email;
          this.Datasrv.checkRole();
         })
         .catch( (err)=>{
          alert("error");
         })
         }



     }




