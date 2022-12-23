import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ColdStoreDataService} from "../cold-store-data.service";
import { AddshiftPage } from '../addshift/addshift.page';
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


  users: Observable<users[]>;
  usersCollectionRef: AngularFirestoreCollection<users>;

  public user : users = {} as users;


  shifts: Observable<shifts[]>;
  shiftsCollectionRef: AngularFirestoreCollection<shifts>;


  segchoice:string="shifts";
  shiftchoice:string="s1";

  selectedemp:string="";

  show:boolean=false;


  allusers:users[]=[];







    constructor(public afs: AngularFirestore , public Datasrv: ColdStoreDataService,public ModalCtrl:ModalController, public navCtrl:NavController) {
      this.usersCollectionRef = this.afs.collection('users');
          this.users = this.usersCollectionRef.snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );

          this.shiftsCollectionRef = this.afs.collection('shifts');
          this.shifts = this.shiftsCollectionRef.snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );







        }


        async presentModal() {
          const modal = await this.ModalCtrl.create({
          component: AddshiftPage ,
          backdropDismiss: false
          });
          return await modal.present();
          }



          changeshow(){
            this.show=true;
          }





















  }







