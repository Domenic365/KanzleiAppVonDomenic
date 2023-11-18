import {Injectable, signal} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  customer: MatTableDataSource<any> = new MatTableDataSource<any>([{name: "Domenic", address: "Scheffelstr. 32, 47057 Duisburg", employees: []}])
  selectedCustomer = signal({})

  constructor() {
  }

}
