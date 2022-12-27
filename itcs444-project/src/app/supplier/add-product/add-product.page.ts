import { Component, OnInit } from '@angular/core';
import { ColdStoreDataService, Product, User } from '../../cold-store-data.service';
import { ToastController} from "@ionic/angular";
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  user: User = {} as User;
  product: Product = {} as Product;
  name: string = '';
  description: string = '';
  image: string = '';
  price: number = 0;
  soldQuantity: number = 0;
  category: string = '';
  perCartoon: number = 0;





  constructor(public coldStoreDataService: ColdStoreDataService, public toastController: ToastController) {
    this.user = this.coldStoreDataService.allUsers.find(user => user.email === this.coldStoreDataService.loggedEmail) as User;

  }
  addProduct(){
    this.product = {
      name: this.name,
      supplier: this.user.name,
      supplierEmail: this.user.email,
      quantity: 0,
      description: this.description,
      discount: 0,
      image: this.image,
      price: this.price,
      sellPrice: this.price,
      category: this.category,
      soldQuantity: this.soldQuantity,
      threshold: 20,
      perCartoon: this.perCartoon
    }
    this.coldStoreDataService.createProduct(this.product);


  }

  ngOnInit() {
  }

}
