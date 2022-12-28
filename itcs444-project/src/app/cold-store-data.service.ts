import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs/operators";
import {ToastController} from "@ionic/angular";
import {NavController} from "@ionic/angular";

export interface Trade {
  id?:string;
  empStatus:string;
  ownerStatus: string;
  tradeFrom: string;
  tradeFromName: string;
  tradeTo: string;
  tradeToName: string;
  tradeDate: string;
}
export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  supplier: string;
  quantity: number;
  soldQuantity: number;
  discount: number;
  supplierEmail: string;
  sellPrice: number;
  threshold: number;
  perCartoon: number;
}

export interface Order {
  id?: string;
  title: string;
  name: string;
  totalPrice: number;
  totalQuantity: number;
  date: string[];
  status: string;
  supplier: string;
  favorite: boolean;
  numOrdered: number;
  numCartoons: number;

}
export interface Shift {
  id?:string;
  date:string;
  shift1id: string;
  shift1name: string;
  shift2id: string;
  shift2name: string;
}

export interface User {
  id?: string;
  name: string;
  role: string;
  email: string;
  image: string;
}
export interface Supplier {
  id?: string;
  name: string;
  phone: string;
  soldQuantity: number;
  logo: string;
  noOrders: number;
}

@Injectable({
  providedIn: 'root'
})
export class ColdStoreDataService {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;


  ordersCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;

  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  suppliers: Observable<Supplier[]>;
  providersCollection: AngularFirestoreCollection<Supplier>;

  public logged: boolean = false;

  public loggedEmail: string="";
  public loggedUser: User= {} as User;

  public loggedId: string="";

  public loggedRole:string="";
  public loggedName: string = "";

  allUsers:User[]=[];
  allOrders:Order[]=[] as Order[];
  allSuppliers: Supplier[] = [] as Supplier[];
  allProducts: Product[] = [] as Product[];
  updateStattobothaccept:boolean=false;
  updateStattotrejectByOwn :boolean=false;
  updateStattotrejectByEmp:boolean=false;

  trades: Observable<Trade[]>;
  tradesCollectionRef: AngularFirestoreCollection<Trade>;
  public trade : Trade = {} as Trade;



  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public toastController: ToastController, public navCtrl: NavController) {
    this.productsCollection = afs.collection<Product>('products');
    this.products = this.afs.collection<Product>('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return {id, ...data};
        }
      )));

    this.ordersCollection = afs.collection<Order>('orders');
    this.orders = this.afs.collection<Order>('orders').snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return {id, ...data};
        }
      )));

    this.usersCollection = afs.collection<User>('users');
    this.users = this.afs.collection<User>('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return {id, ...data};
        }
      )));

    this.providersCollection = afs.collection<Supplier>('providers');
    this.suppliers = this.afs.collection<Supplier>('providers').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Supplier;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
    //create collection for trades from firestore
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



    this.getallusers();
    this.getAllOrders();
    this.getAllSuppliers();
    this.getAllProducts();


    this.loggedUser = this.allUsers.find(user => user.email === this.loggedEmail) as User;
    console.log(this.loggedUser);
  }

  getUserByEmail(email: string){
    return this.allUsers.find(user => user.email === email) as User;
  }


  getallusers(){
    this.users.subscribe( (data)=>{this.allUsers=data});
  }
  getAllOrders() {
    this.orders.subscribe( (data)=>{this.allOrders=data});
  }
  getAllSuppliers() {
    this.suppliers.subscribe( (data)=>{this.allSuppliers=data});
  }
  getAllProducts() {
    this.products.subscribe( (data)=>{this.allProducts=data});
  }


// add firebase CRUD methods here
  createProduct(product: Product) {
    // add product to firebase
    return this.productsCollection.add(product);
  }


  updateProduct(product: Product){
    // update product in firebase
    return this.productsCollection.doc(product.id).update({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      threshold: product.threshold,
      supplier: product.supplier,
      quantity: product.quantity,
      soldQuantity: product.soldQuantity,
      discount: product.discount,
      sellPrice: product.sellPrice,
      perCartoon: product.perCartoon,
    })

  }

  deleteProduct(product: Product) {
    // delete product from firebase
    return this.productsCollection.doc(product.id).delete();
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.products.pipe(
      map(products => products.filter(product => product.category === category))
    );
  }
  getProduct(id: string)  {
    return this.products.pipe(
      map(products => products.find(product => product.id === id))
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }

  createOrder(order: Order) {
    // add order to firebase
    return this.ordersCollection.add(order);
  }

  getOrder(id: string): Observable<Order | undefined> {
    return this.ordersCollection.doc<Order>(id).valueChanges().pipe(
      map(order => {
        if (order) {
          order.id = id;
        }
        return order;
      })
    );
  }
  getOrders(): Observable<Order[]> {
    return this.orders;
  }
  getProductByName(name: string){
    return this.allProducts.find(product => product.name == name) as Product;
  }

  acceptOrder(order: Order, product: Product){
    let newQuantity = product.quantity + order.totalQuantity;
    // update order status in firebase, update supplier soldQuantity, update product quantity
     this.ordersCollection.doc(order.id).update({
      status: 'accepted'});

      this.productsCollection.doc(product.id).update({
      quantity: newQuantity}

    );
  }

     rejectOrder(order: Order){
    // update order status in firebase
       return this.ordersCollection.doc(order.id).update({
      status: 'rejected'
    })
       }


  deleteOrder(order: Order) {
    // delete order from firebase
    return this.ordersCollection.doc(order.id).delete();

  }
  createUser(user: User) {
    // add user to firebase
    return this.usersCollection.add(user);
  }
  updateUser(user: User){
    // update user in firebase
    return this.usersCollection.doc(user.id).update({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      image: user.image,
    })
  }
  deleteUser(user: User) {
    // delete user from firebase
    return this.usersCollection.doc(user.id).delete();
  }

  getUser(id: string): Observable<User | undefined> {
    return this.usersCollection.doc<User>(id).valueChanges().pipe(
      map(user => {
        if (user) {
          user.id = id;
        }
        return user;
      })
    );
  }


  getUsers(): Observable<User[]> {
    return this.users;
  }
  getEmployees(): Observable<User[]> {
    return this.users.pipe(
      map(users => users.filter(user => user.role === 'employee'))
    );
  }


  createSupplier(supplier: Supplier) {
    // add provider to firebase
    return this.providersCollection.add(supplier);
  }
  updateSupplier(supplier: Supplier){
    // update provider in firebase
    return this.providersCollection.doc(supplier.id).update({
      name: supplier.name,
      phone: supplier.phone,
      logo: supplier.logo,

    })

  }
  deleteSupplier(provider: Supplier) {
    // delete provider from firebase
    return this.providersCollection.doc(provider.id).delete();
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.suppliers;
  }

  getProvider(id: string): Observable<Supplier | undefined> {
    return this.providersCollection.doc<Supplier>(id).valueChanges().pipe(
      map(provider => {
          if (provider) {
            provider.id = id;
          }
          return provider;
        }
      ));
  }
  toggleFavorite(order: Order) {
    this.ordersCollection.doc(order.id).update({
      favorite: !order.favorite
    });

  }
  reOrder(order: Order) {
    this.ordersCollection.doc(order.id).update({
      status: 'pending',
      date: [...order.date, new Date().toLocaleDateString()],
      numOrdered: order.numOrdered + 1
    });
  }
  getOrderByID(id: string){
    return this.allOrders.find(order => order.id == id) as Order;
  }
  getSupplierByName(name: string){
    return this.allSuppliers.find(supplier => supplier.name == name) as Supplier;
  }

  //create function to update empstatus in the trades collection in firestore
  updateEmpStatusReject(trade: Trade){
    this.tradesCollectionRef.doc(trade.id).update({empStatus: 'rejected'});
  }

  //create function to update empstatus in the trades collection in firestore
  updateEmpStatusAccept(trade: Trade){
    this.tradesCollectionRef.doc(trade.id).update({empStatus: 'accepted'});
  }

  deleteTrade(trade: Trade) {
    return this.tradesCollectionRef.doc(trade.id).delete();
  }

  //create function to update ownerstatus in the trades collection in firestore
  updateOwnerStatusReject(trade: Trade){
    //if owner rejects the trade, delete the trade from the trades collection and add the trade back to the shifts collection
    this.tradesCollectionRef.doc(trade.id).update({ownerStatus: 'rejected'});
    // this.deleteTrade(trade);
  }

  //create function to update ownerstatus in the trades collection in firestore
  updateOwnerStatusAccept(trade: Trade){
    this.tradesCollectionRef.doc(trade.id).update({ownerStatus: 'accepted'});
  }

  //disply all trades that have pending status for owner and accepted status for employee
  // getPendingTradesForOwner(){
  //   return this.trades.pipe(
  //     map(trades => trades.filter(trade => trade.ownerStatus == 'pending' && trade.empStatus == 'accepted'))
  //   );
  // }


  checkStatus(trade: Trade){
    //if both emp and owner status is accepted
    if(trade.empStatus=="accepted" && trade.ownerStatus=="accepted"){
      this.updateStattobothaccept=true;
      alert("both accepted");
    }

    if(trade.empStatus=="pending" && trade.ownerStatus=="pending"){
      this.updateStattobothaccept=false;
    }

    if(trade.empStatus=="rejected" && trade.ownerStatus=="rejected"){
      this.updateStattotrejectByOwn=true;
    }

    if(trade.empStatus=="rejected" && trade.ownerStatus=="pending"){
      this.updateStattotrejectByEmp=true;
    }
  }


  checkRole(){
    for(let i=0;i<this.allUsers.length;i++){
      if( this.allUsers[i].email==this.loggedEmail && this.allUsers[i].role=="owner") {
        this.loggedRole="owner";
      }
      if( this.allUsers[i].email==this.loggedEmail && this.allUsers[i].role=="employee") {
        this.loggedRole="employee";
      }
      if( this.allUsers[i].email==this.loggedEmail && this.allUsers[i].role=="supplier") {
        this.loggedRole="supplier";
      }
    }
    return this.loggedRole;
  }
  async presentToast(position: 'top' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
  }
  logOut(){
    this.loggedEmail="";
    this.loggedRole="";
    this.logged=false;
    this.navCtrl.navigateBack('/login');
    return this.afAuth.signOut();
  }


}
