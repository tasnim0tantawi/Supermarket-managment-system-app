import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ColdStoreDataService, Trade, User, Shift} from "../../cold-store-data.service";
import { ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  trades: Observable<Trade[]>;
  tradesCollectionRef: AngularFirestoreCollection<Trade>;

  public shift : Shift = {} as Shift;


  public trade : Trade = {} as Trade;

  users: Observable<User[]>;
  usersCollectionRef: AngularFirestoreCollection<User>;

  public user : User = {} as User;


  shifts: Observable<Shift[]>;
  shiftsCollectionRef: AngularFirestoreCollection<Shift>;


  segchoice:string="shifts";
  shiftchoice:string="s1";

  selectedemp:string="";

  show:boolean=false;
  leave:boolean=false;
  allUsers:User[]=[];
  tradedate: string="";



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

  }

  InsertTrade(s: Shift){
    this.shift.shift1id=s.shift1id;
    this.shift.shift2id=s.shift2id;
    this.trade.tradeDate=s.date;

    if(this.shift.shift1id!=''){
      for(let i=0;i<this.Datasrv.allUsers.length;i++){
        if(this.Datasrv.allUsers[i].id==this.shift.shift1id && this.Datasrv.allUsers[i].name==this.Datasrv.loggedName){
          this.trade.tradeFrom=this.Datasrv.allUsers[i].id as string;
          this.trade.tradeFromName=this.Datasrv.allUsers[i].name as string;
        }
        if(this.Datasrv.allUsers[i].id==this.shift.shift1id && this.Datasrv.allUsers[i].name!=this.Datasrv.loggedName){
          this.trade.tradeTo=this.Datasrv.allUsers[i].id as string;
          this.trade.tradeToName=this.Datasrv.allUsers[i].name as string;
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
        if(this.Datasrv.allUsers[i].id==this.shift.shift2id && this.Datasrv.allUsers[i].name==this.Datasrv.loggedName){
          this.trade.tradeFrom=this.Datasrv.allUsers[i].id as string;
          this.trade.tradeFromName=this.Datasrv.allUsers[i].name as string;
          // alert(this.trade.tradeFromName);
        }
        if(this.Datasrv.allUsers[i].id==this.shift.shift2id && this.Datasrv.allUsers[i].name!=this.Datasrv.loggedName){
          this.trade.tradeTo=this.Datasrv.allUsers[i].id as string;
          this.trade.tradeToName=this.Datasrv.allUsers[i].name as string;
        }
      }
    }

    if(this.shift.shift2id==''){
      this.shift.shift2id="None";
      this.shift.shift2name="None";
    }


    this.trade.empStatus="pending";
    this.trade.ownerStatus="pending";
    //check if shift1 or shift2 names are empty
    if(s.shift1name=="None"){
      this.trade.empStatus="accepted";
      this.trade.tradeFromName=s.shift2name as string;
      this.trade.tradeFrom=s.shift2id as string;
      this.trade.tradeToName='None';
      this.trade.tradeTo='None';
      alert("Direct send to owner for approval");
      // this.leave=true;
    }
    else if(s.shift2name=="None"){
      this.trade.empStatus="accepted";
      this.trade.tradeFromName=s.shift1name as string;
      this.trade.tradeFrom=s.shift1id as string;
      this.trade.tradeToName='None';
      this.trade.tradeTo='None';
      alert("Direct send to owner for approval");
    }
    else{
      //check if shift1 or shift2 names are the same
      if(s.shift1name==s.shift2name){
        alert("You cannot trade with yourself");
        this.leave=true;
      }
    }
    if(!this.leave){
      this.addtrade(this.trade)
        .then ((response)=>{alert("insert succeessfully to trade")})
        .catch((err)=>{alert("error")});
      this.trade={} as Trade;
    }
  }


  addtrade(trade:Trade): Promise<DocumentReference>{
    return this.tradesCollectionRef.add(trade);
  }

  update(trade: Trade){
    this.Datasrv.updateEmpStatusAccept(trade);
    this.Datasrv.checkStatus(trade);
    alert("accepted, this trade is now pending for owner approval");
  }

  updatereject(trade: Trade){
    // this.updatestatusreject(trade);
    this.Datasrv.updateEmpStatusReject(trade);
    this.Datasrv.checkStatus(trade);
    // this.delete(trade);
    alert("rejected");
  }

//delete trade
  delete(trade: Trade){
    this.Datasrv.deleteTrade(trade);
    alert("deleted");
  }






























  }







