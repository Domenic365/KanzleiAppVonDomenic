import {Component, inject, OnInit} from '@angular/core';
import {Customer} from "../types";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {collectionData} from "@angular/fire/firestore";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit{
  columns = [
    {
      columnDef: 'customerID',
      header: 'Nummer',
      cell: (element: Customer) => `${element.customerID}`,
    },
    {
      columnDef: 'firstName',
      header: 'Vorname',
      cell: (element: Customer) => `${element.firstName}`,
    },
    {
      columnDef: 'secondName',
      header: 'Nachname',
      cell: (element: Customer) => `${element.secondName}`,
    },
    {
      columnDef: 'company',
      header: 'Unternehmensname',
      cell: (element: Customer) => `${element.company}`,
    },
    {
      columnDef: 'address',
      header: 'Unternehmensanschrift',
      cell: (element: Customer) => `${element.address}`,
    },
  ];
  dataSource: any;
  displayedColumns = this.columns.map(c => c.columnDef);
  backendService = inject(BackendService)
  router = inject(Router);
  customerCollection: any;

  ngOnInit() {
    this.customerCollection = collectionData(this.backendService.getCollection(), {idField: 'id'});
    this.customerCollection.subscribe((value: any) =>{this.dataSource = value})
  }


  openCustomer(customerData: Customer) {
    this.router.navigate(["editCustomer/" + customerData.id]).then()
  }


  newCustomer() {
    this.router.navigate(["newCustomer"]).then()
  }
}
