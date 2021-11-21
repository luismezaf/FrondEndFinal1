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
    let newProduct: any = {};
    this.showAddProductModal = false;
    if(this.nuevoProd.id){
      newProduct = await this._productsService.editProduct(this.nuevoProd);  
      this.products = this.products.map(
        p => p.id === newProduct.id ? 
          newProduct : p
      );
    }else{
      newProduct = await this._productsService.addProduct(this.nuevoProd);
      this.products.push(newProduct);
    }
    this.nuevoProd = {
      nombre: '', existencia: 0, precio: 0
    };
    console.log(newProduct);
  }
  async deleteProduct(idProduct: Number){
    await this._productsService.deleteProduct(idProduct);
    this.products = this.products.filter( p => p.id !== idProduct);
  }
  handleEditClick(idProduct: Number){
    this.nuevoProd = this.products.find(p => p.id === idProduct);
    this.showAddProductModal = true;
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
