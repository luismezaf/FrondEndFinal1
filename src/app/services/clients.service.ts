import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { mainEndpoint } from ".";
@Injectable({
  providedIn: "root"
})
export class ClientsService {
  private urlApi = mainEndpoint + "/clientes";

  constructor(private _http: HttpClient) {}

  public async getClients(): Promise<any[]> {
    return await this._http.get<any>(this.urlApi).toPromise();
  }
}
