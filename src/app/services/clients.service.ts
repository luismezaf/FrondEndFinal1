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

  public async addClient(request: any): Promise<any> {
    return await this._http.post<any>(this.urlApi, request).toPromise();
  }

  public async editClient(request: any): Promise<any> {
    return await this._http.put<any>(`${this.urlApi}/${request.id}`, request).toPromise();
  }

  public async deleteClient( idClient: Number): Promise<any[]> {
    return await this._http.delete<any>(this.urlApi + `/${idClient}`).toPromise();
  }
}
