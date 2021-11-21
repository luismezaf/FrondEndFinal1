import { Component } from "@angular/core";
import { CustomerService } from "src/app/services/customers.service";
import { ProductsService } from "src/app/services/products.service";
import { SalesService } from "src/app/services/sales.service";

@Component({
  selector: "sales-root",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.css"]
})
export class SalesComponent {
  public showAddSaleModal: Boolean = true;
  public sales: Array<any> = [];
  public total: Number = 0;
  public search: String = "";
  public selectedSale: Object = null;

  public customers: Array<any> = [];
  public selectedCustomerId: Number = -1;

  public products: Array<any> = [];
  public selectedProductId: Number = -1;
  public addedProducts: Array<any> = [];

  public salesStr: String = "";
  public addedProductsStr: String = "";

  constructor(
    private _salesService: SalesService,
    private _productsService: ProductsService,
    private _customerService: CustomerService
  ) {}

  updateSale() {}

  addSale() {
    this.showAddSaleModal = false;
  }

  addSelectedProduct() {
    const product = this.products.find(
      (p) => `${p.id}` === `${this.selectedProductId}`
    );
    if (!product) return;

    const isInList = this.addedProducts.some(
      (p) => `${p.id}` === `${this.selectedProductId}`
    );
    if (isInList) {
      this.addedProducts = this.addedProducts.map((p) => {
        if (`${p.id}` === `${this.selectedProductId}`)
          return { ...p, cantidad: p.cantidad + 1 };
        else return p;
      });
    } else this.addedProducts.push({ ...product, cantidad: 1 });
  }

  removeSelectedProduct() {
    const product = this.products.find(
      (p) => `${p.id}` === `${this.selectedProductId}`
    );
    if (!product) return;
    const isInList = this.addedProducts.some(
      (p) => `${p.id}` === `${this.selectedProductId}`
    );
    if (!isInList) return;
    const newQty =
      this.addedProducts.find((p) => `${p.id}` === `${this.selectedProductId}`)
        .cantidad - 1;
    if (newQty <= 0) {
      this.addedProducts = this.addedProducts.filter(
        (p) => `${p.id}` !== `${this.selectedProductId}`
      );
    } else
      this.addedProducts = this.addedProducts.map((p) => {
        if (`${p.id}` === `${this.selectedProductId}`)
          return { ...p, cantidad: newQty };
        else return p;
      });
  }

  selectedProductHasAdded() {
    return this.addedProducts.some(
      (p) => `${p.id}` === `${this.selectedProductId}`
    );
  }

  async loadSales() {
    this.sales = await this._salesService.getSales();
    this.total = this.sales.reduce((total, s) => total + s.total, 0);
    this.salesStr = JSON.stringify(this.sales);
  }

  async loadCustomers() {
    this.customers = await this._customerService.getCustomers();
    this.selectedCustomerId = (this.customers[0] || {}).id || -1;
  }

  async loadProducts() {
    this.products = await this._productsService.getProducts();
  }

  async initialize() {
    await this.loadCustomers();
    await this.loadProducts();
    await this.loadSales();
  }

  ngOnInit() {
    this.initialize();
  }
}
