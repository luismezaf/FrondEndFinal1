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
  public nuevoProd: any = {
    nombre: '', existencia: 0, precio: 0
  };
  async loadProducts(){
    this.products = await this._productsService.getProducts();
  }
  async addProduct(){
    const newProduct = await this._productsService.addProduct(this.nuevoProd);
    console.log(newProduct);
    this.products.push(newProduct);
    this.showAddProductModal = false;
  }
  handleEditClick(idProduct: Number){
    console.log('Editing ' + idProduct);
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
