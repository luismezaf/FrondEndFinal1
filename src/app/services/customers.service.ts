import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { mainEndpoint } from ".";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private urlApi = mainEndpoint + "/clientes";

  constructor(private _http: HttpClient) {}

  public async getCustomers(): Promise<any[]> {
    return await this._http.get<any>(this.urlApi).toPromise();
  }

  public async addCustomer(request: any): Promise<any[]> {
    return await this._http.post<any>(this.urlApi, request).toPromise();
  }
}
