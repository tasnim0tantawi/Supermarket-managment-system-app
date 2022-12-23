import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ColdStoreDataService} from "../cold-store-data.service";


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
  selector: 'app-addshift',
  templateUrl: './addshift.page.html',
  styleUrls: ['./addshift.page.scss'],
})
export class AddshiftPage implements OnInit {


  users: Observable<users[]>;
  usersCollectionRef: AngularFirestoreCollection<users>;

  public user : users = {} as users;


  shifts: Observable<shifts[]>;
  shiftsCollectionRef: AngularFirestoreCollection<shifts>;

  public shift : shifts = {} as shifts;

  public item : shifts = {} as shifts;

  s1:string="";

  s2:string="";




  constructor(public ModalCtrl:ModalController, public navCtrl:NavController,public afs: AngularFirestore , public Datasrv: ColdStoreDataService) {

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




  ngOnInit() {
  }




    dismiss() {
    this.ModalCtrl.dismiss({
    'dismissed': true
    });
    }


    insert(){

      this.shift.shift1id=this.s1;
      this.shift.shift2id=this.s2;

      if(this.shift.shift1id!=''){
        for(let i=0;i<this.Datasrv.allUsers.length;i++){
          if(this.Datasrv.allUsers[i].id==this.shift.shift1id){
            this.shift.shift1name=this.Datasrv.allUsers[i].name;
          }
        }
      }

      if(this.shift.shift1id==''){
        alert('null');
        this.shift.shift1id="None";
        this.shift.shift1name="None";
      }


      if(this.shift.shift2id!=''){
        for(let i=0;i<this.Datasrv.allUsers.length;i++){
          if(this.Datasrv.allUsers[i].id==this.shift.shift2id){
            this.shift.shift2name=this.Datasrv.allUsers[i].name;
          }

        }
      }

      if(this.shift.shift2id==''){
        this.shift.shift2id="None";
        this.shift.shift2name="None";
      }


      this.addshift(this.shift)
      .then ((response)=>{alert("insert succeessfully")})
      .catch((err)=>{alert("error")});
       this.shift={} as shifts;
    }


    addshift(shift:shifts): Promise<DocumentReference>{
       return this.shiftsCollectionRef.add(shift);
    }














}
