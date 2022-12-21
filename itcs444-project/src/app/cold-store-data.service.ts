import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
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
  products: Observable<Product[]> = new Observable<Product[]>();
  productsCollectionRef = this.afs.collection<Product>('products');
  orders: Observable<Order[]> = new Observable<Order[]>();
  ordersCollectionRef = this.afs.collection<Order>('orders');
  users: Observable<User[]> = new Observable<User[]>();
  usersCollectionRef = this.afs.collection<User>('users');
  providers: Observable<Provider[]> = new Observable<Provider[]>();
  providersCollectionRef = this.afs.collection<Provider>('providers');


// add firebase CRUD methods here
  createProduct(product: Product) {
    // add product to firebase
    return this.productsCollectionRef.add(product);
  }


  updateProduct(product: Product){
    // update product in firebase
    return this.productsCollectionRef.doc(product.id).update({
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
    return this.productsCollectionRef.doc(product.id).delete();
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.products.pipe(
      map(products => products.filter(product => product.category === category))
    );
  }
  getProduct(id: string): Observable<Product> {
    return this.productsCollectionRef.doc<Product>(id).valueChanges().pipe(
      map(product => {
        product.id = id;
        return product;
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }
  createOrder(order: Order) {
    // add order to firebase
    return this.ordersCollectionRef.add(order);
  }
  updateOrder(order: Order){
    // update order in firebase
    return this.ordersCollectionRef.doc(order.id).update({
      id: order.id,
      customerName: order.customerName,
      products: order.product_ids;
      totalPrice: order.totalPrice,
      totalQuantity: order.totalQuantity,
      date: order.date
    })
}
getOrder(id: string): Observable<Order> {
    return this.ordersCollectionRef.doc<Order>(id).valueChanges().pipe(
      map(order => {
        order.id = id;
        return order;
      })
    );
}
 getOrders(): Observable<Order[]> {
    return this.orders;

 }
   deleteOrder(order: Order) {
    // delete order from firebase
    return this.ordersCollectionRef.doc(order.id).delete();

   }
  createUser(user: User) {
    // add user to firebase
    return this.usersCollectionRef.add(user);
  }
  updateUser(user: User){
    // update user in firebase
    return this.usersCollectionRef.doc(user.id).update({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      password: user.password
    })
  }
  deleteUser(user: User) {
    // delete user from firebase
    return this.usersCollectionRef.doc(user.id).delete();
  }
  getUser(id: string): Observable<User> {
    return this.usersCollectionRef.doc<User>(id).valueChanges().pipe(
      map(user => {
        user.id = id;
        return user;
      })
    );
  }
  getUsers(): Observable<User[]> {
    return this.users;
  }
  createProvider(provider: Provider) {
    // add provider to firebase
    return this.providersCollectionRef.add(provider);
  }
  updateProvider(provider: Provider){
    // update provider in firebase
    return this.usersCollectionRef.doc(provider.id).update({
      id: provider.id,
      name: provider.name,
      products: provider.products_ids;
      phone: provider.phone,
      logo: provider.logo
    })

  }





  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.signInAnonymously().then(() => {
      this.products = this.afs.collection<Product>('products').valueChanges();
      this.orders = this.afs.collection<Order>('orders').valueChanges();
      this.users = this.afs.collection<User>('users').valueChanges();
      this.providers = this.afs.collection<Provider>('providers').valueChanges();

    }
    );
  }
}
