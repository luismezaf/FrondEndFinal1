import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { ReportsComponent } from "./components/reports/reports.components";

import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { ProductsComponent } from "./components/products/products.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { SalesComponent } from "./components/sales/sales.component";

import { CustomerService } from "./services/customers.service";
import { ProductsService } from "./services/products.service";
import { SalesService } from "./services/sales.service";
import { ClientsService } from "./services/clients.service";
import { ReportService } from "./services/reports.service";

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    ProductsComponent,
    SalesComponent,
    ClientsComponent,

  ],
  imports: [
    BrowserModule,
    MatInputModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SalesService, ProductsService, CustomerService, ClientsService,ReportService],
  bootstrap: [AppComponent]
})
export class AppModule {}
