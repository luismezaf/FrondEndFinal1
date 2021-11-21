import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { ReportsComponent } from "./components/reports/reports.components";

import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
//import { ProductsComponent } from "./components/products/products.component";
import { HttpClientModule } from "@angular/common/http";
// import { ProductosService } from "./services/productos.service";
import { ReportService } from "./components/services/reports.service";
@NgModule({
  declarations: [AppComponent, ReportsComponent],
  imports: [
    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule {}
