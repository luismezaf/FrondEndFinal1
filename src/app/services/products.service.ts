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
}
