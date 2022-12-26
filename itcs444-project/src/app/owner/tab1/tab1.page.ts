import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import {ColdStoreDataService, Order, Product, Supplier, User} from "../../cold-store-data.service";
import { ModalController, NavController } from '@ionic/angular';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef = new ElementRef(null);
  @ViewChild('polarAreaCanvas') private polarAreaCanvas: ElementRef = new ElementRef(null);


  barChart: any;
  lineChart: any;
  polarAreaChart: any;
  suppliers: Supplier[] = this.Datasrv.allSuppliers as Supplier[];
  supplierNames: string[] = this.suppliers.map((supplier) => supplier.name);
  supplierSales: number[] = this.suppliers.map((supplier) => supplier.noOrders);
  products: Product[] = this.Datasrv.allProducts;
  productNames: string[] = this.products.map((product) => product.name);
  productSales: number[] = this.products.map((product) => product.soldQuantity);


    constructor(public afs: AngularFirestore , public Datasrv: ColdStoreDataService,public ModalCtrl:ModalController, public navCtrl:NavController) {
      console.log(this.suppliers);
      console.log(this.supplierNames);
      console.log(this.products);
      console.log(this.productNames);
      if (!this.Datasrv.logged || this.Datasrv.loggedRole!="owner"){
        this.navCtrl.navigateBack('/login');



      }}
  ngAfterViewInit() {
    this.barChartMethod();
    this.polarAreaChartMethod();
  }

  polarAreaChartMethod() {
    this.polarAreaChart = new Chart(this.polarAreaCanvas.nativeElement, {
      type: 'polarArea',
      data: {
        labels: this.supplierNames,
        datasets: [{
          label: 'Number of Orders',
          data: this.supplierSales,
          backgroundColor: [
            '#FFB6C1',
            '#87CEFA',
            '#FFD700',
            '#90EE90',
            '#BA55D3',
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }
  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.productNames,
        datasets: [{
          label: 'Number of Products',
          data: this.productSales,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxis: {
            beginAtZero: true
          }
        }


      }
    });
  }


}







































