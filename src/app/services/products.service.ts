import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { mainEndpoint } from ".";
@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private urlApi = mainEndpoint + "/productos";

  constructor(private _http: HttpClient) {}

  public async getProducts(): Promise<any[]> {
    return await this._http.get<any>(this.urlApi).toPromise();
  }
  public async addProduct(request: any): Promise<any> {
    return await this._http.post<any>(this.urlApi, request).toPromise();
  }
  public async editProduct(request: any): Promise<any> {
    return await this._http.put<any>(`${this.urlApi}/${request.id}`, request).toPromise();
  }
  public async deleteProduct( idProduct: Number): Promise<any[]> {
    return await this._http.delete<any>(this.urlApi + `/${idProduct}`).toPromise();
  }
}
