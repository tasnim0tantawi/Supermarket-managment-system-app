import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs/operators";


export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  provider: string;
  quantity: number;
}
export interface Order {
  id?: string;
  customerName: string;
  product_ids: string[];
  totalPrice: number;
  totalQuantity: number;
  date: Date;
}
export interface User {
  id?: string;
  name: string;
  username: string;
  role: string;
  password: string;
}
export interface Provider {
  id?: string;
  name: string;
  product_ids: string[];
  phone: string;
  logo: string;
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

  providers: Observable<Provider[]>;
  providersCollection: AngularFirestoreCollection<Provider>;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
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
          return { id, ...data };
        }
      )));

    this.usersCollection = afs.collection<User>('users');
    this.users = this.afs.collection<User>('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        }
      )));

    this.providersCollection = afs.collection<Provider>('providers');
    this.providers = this.afs.collection<Provider>('providers').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Provider;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
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
      provider: product.provider,
      quantity: product.quantity
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
  updateOrder(order: Order){
    // update order in firebase
    return this.ordersCollection.doc(order.id).update({
      id: order.id,
      customerName: order.customerName,
      product_ids: order.product_ids,
      totalPrice: order.totalPrice,
      totalQuantity: order.totalQuantity,
      date: order.date
    })
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
      username: user.username,
      role: user.role,
      password: user.password
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
  createProvider(provider: Provider) {
    // add provider to firebase
    return this.providersCollection.add(provider);
  }
  updateProvider(provider: Provider){
    // update provider in firebase
    return this.providersCollection.doc(provider.id).update({
      id: provider.id,
      name: provider.name,
      product_ids: provider.product_ids,
      phone: provider.phone,
      logo: provider.logo
    })

  }
  deleteProvider(provider: Provider) {
    // delete provider from firebase
    return this.providersCollection.doc(provider.id).delete();
  }

  getProviders(): Observable<Provider[]> {
    return this.providers;
  }

  getProvider(id: string): Observable<Provider | undefined> {
    return this.providersCollection.doc<Provider>(id).valueChanges().pipe(
      map(provider => {
        if (provider) {
        provider.id = id;
        }
        return provider;
      }
    ));
  }


  signIn(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(newEmail, newPassword);
  }







}
