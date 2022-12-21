import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";


export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  provider: string;
  quantity: number;
}
export interface Order {
  id: number;
  customerName: string;
  products: Product[];
  totalPrice: number;
  totalQuantity: number;
  date: Date;
}
export interface User {
  id: number;
  name: string;
  username: string;
  role: string;
  password: string;
}
export interface Provider {
  id: number;
  name: string;
  products: Product[];
  phone: string;
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


// add firebase CRUD methods here
  createProduct(product: Product) {
    // add product to firebase
    this.productsCollectionRef.add({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      provider: product.provider,
      quantity: product.quantity
    });
  }


  updateProduct(product: Product){
    // update product in firebase
    this.productsCollectionRef.doc(product.id.toString()).update({
      id: product.id,
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
    this.productsCollectionRef.doc(product.id.toString()).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
      }
    );
  }
  createOrder(order: Order) {
    // add order to firebase
    this.ordersCollectionRef.add({
      id: order.id,
      customerName: order.customerName,
      products: order.products,
      totalPrice: order.totalPrice,
      totalQuantity: order.totalQuantity,
      date: order.date
    });
  }
  updateOrder(order: Order){
    // update order in firebase
    this.ordersCollectionRef.doc(order.id.toString()).update({
      id: order.id,
      customerName: order.customerName,
      products: order.products,
      totalPrice: order.totalPrice,
      totalQuantity: order.totalQuantity,
      date: order.date
    })
}




  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.signInAnonymously().then(() => {
      this.products = this.afs.collection<Product>('products').valueChanges();
      this.orders = this.afs.collection<Order>('orders').valueChanges();
      this.users = this.afs.collection<User>('users').valueChanges();

    }
    );
  }
}
