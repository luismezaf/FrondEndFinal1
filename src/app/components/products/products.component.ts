import { Component } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "products-root",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  constructor(
    private _productsService: ProductsService,
  ) {}

  public products: Array<any> = [];
  
  async loadProducts(){
    this.products = await this._productsService.getProducts();
  }
  async initialize() {
    await this.loadProducts();
  }
  ngOnInit() {
    this.initialize();
  }
}
