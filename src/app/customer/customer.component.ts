import {Component, inject, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customer: any;
  customerID: FormControl<number> | any;
  firstName: FormControl<string> | any;
  secondName: FormControl<string> | any;
  company: FormControl<string> | any;
  address: FormControl<string> | any;
  router = inject(Router)
  route = inject(ActivatedRoute)
  backendService = inject(BackendService)

  ngOnInit() {
    this.backendService.selectedCustomer.update(value => this.customer = value)
    this.customerID = new FormControl(this.customer.customerID)
    this.firstName = new FormControl(this.customer.firstName)
    this.secondName = new FormControl(this.customer.secondName)
    this.company = new FormControl(this.customer.company)
    this.address = new FormControl(this.customer.address)
    this.route.paramMap.subscribe(params => {console.log(params)})
  }

  backToDashboard() {
    this.router.navigate(["customerDashboard"]).then(r => this.customer = {})
  }
}
