import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerDashboardComponent} from "./customer-dashboard/customer-dashboard.component";
import {CustomerComponent} from "./customer/customer.component";

const routes: Routes = [
  {path: "customerDashboard", component: CustomerDashboardComponent},
  {path: "editCustomer/:id", component: CustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
