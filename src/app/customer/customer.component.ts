import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {BackendService} from "../backend.service";
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import app = firebase.app;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customer: any;
  customerForm = new FormGroup(
    {
      customerID: new FormControl(""),
      firstName: new FormControl(""),
      secondName: new FormControl(""),
      company: new FormControl(""),
      address: new FormControl(""),
    }
  )

  router = inject(Router)
  route = inject(ActivatedRoute)
  firestore = inject(Firestore)
  backendService = inject(BackendService)
  currentParams: any;
  isNewCustomer: boolean | undefined


  ngOnInit() {
    this.route.url.subscribe(segments => {
      const path = segments[0]?.path;
      if (path === 'newCustomer') {
        this.isNewCustomer = true
      } else {
        this.subscribeToValues()
      }
    });
  }

  private loadCustomer(params: ParamMap) {
    collectionData(this.backendService.getCollection()).subscribe(value => {
      getDoc(this.getDocument(params)).then(doc => {
        if (doc.exists()) {
          this.customer = doc.data();
          this.setCustomerValues();
        }
      })
    })
  }

  private getDocument(params: ParamMap) {
    return this.backendService.getDocument(params.get("id"));
  }

  private setCustomerValues() {
    for (let controlsKey in this.customerForm.controls) {
      this.getControl(controlsKey).setValue(this.customer[controlsKey])
    }
  }


  private getControl(key: string) {
    const control = this.customerForm.get(key)
    if (control) {
      return control;
    }
    return new FormControl("");
  }

  backToDashboard() {
    this.router.navigate(["customerDashboard"]).then(r => this.customer = undefined)
  }

  addOrEditCustomer() {
    if (this.isNewCustomer) {
      addDoc(this.backendService.getCollection(), this.customerForm.value).then(value => {
        this.backToDashboard()
      })
    } else {
      updateDoc(this.getDocument(this.currentParams), this.customerForm.value).then(value => {
        this.backToDashboard()
      })
    }
  }

  private subscribeToValues() {
    this.route.paramMap.subscribe(params => {
      this.loadCustomer(params);
      this.currentParams = params
    })
  }
}
