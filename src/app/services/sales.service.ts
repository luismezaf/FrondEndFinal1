import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { mainEndpoint } from ".";
import { ProductsService } from "src/app/services/products.service";
import { CustomerService } from "src/app/services/customers.service";

@Injectable({
  providedIn: "root"
})
export class SalesService {
  private urlApi = mainEndpoint + "/ventas";
  private urlApiDetails = mainEndpoint + "/detalleVentas";

  constructor(
    private _http: HttpClient,
    private _productsService: ProductsService,
    private _customerService: CustomerService
  ) {}

  public async getSales(): Promise<any[]> {
    const sales = await this._http.get<any>(this.urlApi).toPromise();
    const details = await this._http.get<any>(this.urlApiDetails).toPromise();
    const products = await this._productsService.getProducts();
    const customers = await this._customerService.getCustomers();

    const getSaleProducts = (s: { id: any; }) => {
      return details
        .filter((d: { idVenta: any; }) => d.idVenta === s.id)
        .map((d: { cantidad: any; idProducto: any; }) => {
          return {
            cantidad: d.cantidad,
            ...products.find((p) => p.id === d.idProducto)
          };
        });
    };

    return sales.map((s:any) => {
      const saleProducts = getSaleProducts(s);
      const total = saleProducts.reduce(
        (total:any, p:any) => total + p.precio * p.cantidad,
        0
      );
      return {
        ...s,
        total,
        products: saleProducts,
        customer: customers.find((c) => c.id === s.idCliente)
      };
    });
  }

  public async addSale(request: any): Promise<any> {
    return await this._http.post<any>(this.urlApi, request).toPromise();
  }
  public async addSaleDetail(request: any): Promise<any> {
    return await this._http.post<any>(this.urlApiDetails, request).toPromise();
  }
}
