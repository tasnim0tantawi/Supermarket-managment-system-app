import { Component } from '@angular/core';
import {ColdStoreDataService, Product, Supplier} from "../../cold-store-data.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  products: Product[] = [] as Product[];
  suppliers: Supplier[] = [] as Supplier[];
  selectedSupplier: string = "";
  selectedSort: string = "";


  constructor(public coldStoreDataService: ColdStoreDataService) {
    this.products = this.coldStoreDataService.allProducts;
    this.suppliers = this.coldStoreDataService.allSuppliers;

  }
  filterProducts(event: any){

    this.products = this.coldStoreDataService.allProducts;
    if(this.selectedSupplier != "" && this.selectedSupplier != "all"){
      this.products = this.products.filter(p => p.supplier == this.selectedSupplier);
    }
  }
  sortProducts(event: any){
    if(event.detail.value == "name"){
      this.products.sort((a,b) => a.name.localeCompare(b.name));
    }
    else if(event.detail.value == "price"){
      this.products.sort((a,b) => a.price - b.price);
    }
    else if(event.detail.value == "quantity"){
      this.products.sort((a,b) => a.quantity - b.quantity);
    }
    else if(event.detail.value == "sold"){
      this.products.sort((a,b) => a.soldQuantity - b.soldQuantity);
    }
    else if(event.detail.value == "category"){
      this.products.sort((a,b) => a.category.localeCompare(b.category));
    }
  }



}
