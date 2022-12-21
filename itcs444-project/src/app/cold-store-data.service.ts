import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
export interface Order {
  id: number;
  name: string;
  products: Product[];
  total_price: number;
  quantity: number;
  image: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  role: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColdStoreDataService {
// add firebase code here



  constructor() { }
}
