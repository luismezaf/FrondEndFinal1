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
  public showAddSaleModal: Boolean = false;
  public sales: Array<any> = [];
  public total: Number = 0;
  public search: String = "";
  public selectedSale: any = null;

  public customers: Array<any> = [];
  public selectedCustomerId: Number = -1;

  public products: Array<any> = [];
  public selectedProductId: any = -1;
  public addedProducts: Array<any> = [];
  public selectedProduct: any = null;

  public salesStr: String = "";
  public addedProductsStr: String = "";

  constructor(
    private _salesService: SalesService,
    private _productsService: ProductsService,
    private _customerService: CustomerService
  ) {}

  updateSale() {}

  async addSale() {
    // Add sale
    const current = new Date();
    const newSale = await this._salesService.addSale({
      idCliente: this.selectedCustomerId,
      fecha: `${current.getFullYear()}/${
        current.getMonth() + 1
      }/${current.getDate()}`,
      total: this.addedProducts.reduce(
        (total, p) => total + p.cantidad * p.precio,
        0
      )
    });
    // Add details
    for (let product of this.addedProducts) {
      await this._salesService.addSaleDetail({
        idVenta: newSale.id,
        idProducto: product.id,
        cantidad: product.cantidad
      });
      // Update product stock
      const update = this.products.find((p) => `${p.id}` === `${product.id}`);
      await this._productsService.editProduct({
        ...update,
        existencia: update.existencia - product.cantidad
      });
    }

    // Update page
    this.showAddSaleModal = false;
    this.initialize();
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
          return { ...p, cantidad: Math.min(p.cantidad + 1, p.existencia) };
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
  async onSelectedProductChange(e:any) {
    this.selectedProductId = e.target.value //((e.target || {value:-1}).value || -1);
  }
  async onSelectedCustomerChange(e: any) {
    this.selectedCustomerId = e.target.value //((e.target || {value:-1}).value || -1);
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
