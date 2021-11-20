import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ProductosComponent } from "./components/productos/productos.component";
import { ReportsComponent } from "./components/reports/reports.component";

import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";

// import { ProductosService } from "./services/productos.service";
@NgModule({
  declarations: [AppComponent, ReportsComponent, ProductosComponent],
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
