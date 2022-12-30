import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ColdStoreDataService, Shift, User} from "../cold-store-data.service";

declare var dynamics: any;

@Component({
  selector: 'app-addshift',
  templateUrl: './addshift.page.html',
  styleUrls: ['./addshift.page.scss'],
})
export class AddshiftPage implements OnInit {


  users: Observable<User[]>;
  usersCollectionRef: AngularFirestoreCollection<User>;

  public user : User = {} as User;


  shifts: Observable<Shift[]>;
  shiftsCollectionRef: AngularFirestoreCollection<Shift>;

  public shift : Shift = {} as Shift;

  public item : Shift = {} as Shift;

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
      .then ((response)=>{
        this.Datasrv.presentToast("top","insert succeessfully");
      })
      .catch((err)=>{alert("error")});
       this.shift={} as Shift;
    }


    addshift(shift:Shift): Promise<DocumentReference>{
       return this.shiftsCollectionRef.add(shift);
    }



    animate(){
      var elem = document.getElementById("logo")
              dynamics.animate(elem, {
            translateX: 	150,
        
            
              },
              {
            type: 	dynamics.spring,
            frequency: 	200,
            friction: 	200,
            duration: 	1500,
              complete: () => {
               
          }
    })}

callAll(){
  this.insert();
  this.animate();
}








}
