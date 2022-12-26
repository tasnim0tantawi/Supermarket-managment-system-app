import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import {ColdStoreDataService, Order, Supplier} from "../../cold-store-data.service";
import { ModalController, NavController } from '@ionic/angular';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef = new ElementRef(null);
  @ViewChild('lineCanvas') private lineCanvas: ElementRef = new ElementRef(null);

  barChart: any;
  lineChart: any;
  suppliers: Supplier[] = this.Datasrv.allSuppliers as Supplier[];
  supplierNames:string[] = this.suppliers.map((supplier)=>supplier.name);


    constructor(public afs: AngularFirestore , public Datasrv: ColdStoreDataService,public ModalCtrl:ModalController, public navCtrl:NavController) {
      console.log(this.suppliers);
      console.log(this.supplierNames);
      if (!this.Datasrv.logged || this.Datasrv.loggedRole!="owner"){
        this.navCtrl.navigateBack('/login');



      }}
  ngAfterViewInit() {
    this.barChartMethod();
    this.lineChartMethod();
  }
  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
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


  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.supplierNames,
        datasets: [
          {
            label: 'Suppliers Sales',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }
}







































