import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ReportsComponent } from "./components/reports/reports.component";

import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { ProductsComponent } from "./components/products/products.component";

// import { ProductosService } from "./services/productos.service";
@NgModule({
  declarations: [AppComponent, ReportsComponent, ProductsComponent],
  imports: [
    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
