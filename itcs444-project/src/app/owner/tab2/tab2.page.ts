import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ColdStoreDataService, User, Shift } from "../../cold-store-data.service";
import { AddshiftPage } from '../../addshift/addshift.page';
import { ModalController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {


  users: Observable<User[]>;
  usersCollectionRef: AngularFirestoreCollection<User>;
  public user : User = {} as User;


  shifts: Observable<Shift[]>;
  shiftsCollectionRef: AngularFirestoreCollection<Shift>;


  segchoice:string="shifts";
  shiftchoice:string="s1";

  selectedemp:string="";

  show:boolean=false;


  allusers:User[]=[];



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







