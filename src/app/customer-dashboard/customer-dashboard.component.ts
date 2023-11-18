import {Component, inject, OnInit} from '@angular/core';
import {Customer} from "../types";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";

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

  item$: any;
  firestore: Firestore = inject(Firestore);

  ngOnInit() {
    const itemCollection = collection(this.firestore, 'mandanten');
    this.item$ = collectionData(itemCollection, {idField: 'id'});
    this.item$.subscribe((value: any) =>{this.dataSource = value; console.log(value)})
  }


  openCustomer(customerData: Customer) {
    this.router.navigate(["editCustomer/1"]).then(r => this.backendService.selectedCustomer.set(customerData))
  }


}
