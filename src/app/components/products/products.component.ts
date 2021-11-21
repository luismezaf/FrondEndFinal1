import { Component } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "products-root",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  public products: Array<any> = [];
  public showAddProductModal: Boolean = false;
  async loadProducts(){
    this.products = await this._productsService.getProducts();
  }
  constructor(
    private _productsService: ProductsService,
  ) {}

  async initialize() {
    await this.loadProducts();
  }
  ngOnInit() {
    this.initialize();
  }
}
