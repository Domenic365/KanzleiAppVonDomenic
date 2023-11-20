import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Customer } from "../types";
import { BackendService } from "../backend.service";
import { Router } from "@angular/router";
import { collectionData } from "@angular/fire/firestore";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: any;
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
  backendService: BackendService = inject(BackendService);
  router: Router = inject(Router);
  customerCollection: any;

  ngOnInit() {
    this.customerCollection = collectionData(this.backendService.getCollection(), { idField: 'id' });
    this.customerCollection.subscribe((value: any) => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.sort = this.sort;
      this.sort.sort({ id: 'customerID', start: 'asc' });
    });
  }

  openCustomer(customerData: Customer) {
    this.router.navigate(["editCustomer/" + customerData.id]).then();
  }

  newCustomer() {
    this.router.navigate(["newCustomer"]).then();
  }
}
