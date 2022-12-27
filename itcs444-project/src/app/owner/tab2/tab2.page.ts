import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ColdStoreDataService, User, Shift, Trade } from "../../cold-store-data.service";
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
  tradesCollectionRef: AngularFirestoreCollection<Trade>;

  allusers:User[]=[];
  allshifts:Shift[]=[];

  public trade : Trade = {} as Trade;
  trades: Observable<Trade[]>;



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
    this.tradesCollectionRef = this.afs.collection('trades');
    this.trades = this.tradesCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.getallShifts();
  }

  getallShifts(){
    this.shifts.subscribe( (data)=>{this.allshifts=data});
  }



  async presentModal() {
    const modal = await this.ModalCtrl.create({
      component: AddshiftPage ,
      backdropDismiss: false
    });
    return await modal.present();
  }
  update(trade:Trade){
    this.Datasrv.updateOwnerStatusAccept(trade);
    //update the shifts by replacing tradeFrom with tradeTo and vice versa
    // this.Datasrv.updateShifts(trade);
    // and delete the trade
    this.updateShifts(trade);
    this.Datasrv.checkStatus(trade);
    //delete the trade from trades
    // this.Datasrv.deleteTrade(trade);
    alert("Trade Accepted and Shifts Updated");
  }

  updatereject(trade:Trade){
    this.Datasrv.updateOwnerStatusReject(trade);
  }


  //replace the id and name in shift1 with id and name of shift2
  //replace the id and name in shift2 with id and name of shift1
  updateShifts(trade: Trade){
    //get the date with names of shift1 and shift2
    for(let i=0;i<this.allshifts.length;i++){
      if(this.allshifts[i].date==trade.tradeDate){
        //save the shift id
        const shift_id = this.allshifts[i].id;
        if(trade.tradeFromName==this.allshifts[i].shift1name){
          this.afs.collection('shifts').doc(shift_id).update({
            shift1id: trade.tradeTo,
            shift1name: trade.tradeToName,
            shift2id: trade.tradeFrom,
            shift2name: trade.tradeFromName
          });
        }
        else{
          this.afs.collection('shifts').doc(shift_id).update({
            shift2id: trade.tradeTo,
            shift2name: trade.tradeToName,
            shift1id: trade.tradeFrom,
            shift1name: trade.tradeFromName
          });
        }
        alert(this.allshifts[i].shift1name);
        alert(this.allshifts[i].shift2name);
      }

    }
  }

  changeshow(){
    this.show=true;
  }





















}







