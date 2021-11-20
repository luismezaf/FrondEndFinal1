import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { mainEndpoint } from "./utils";
@Injectable({
  providedIn: "root"
})
export class ProductosService {
  private urlApi = mainEndpoint + "/productos";
  public isLogged: boolean = true;
  public user: any = { usuarioLogin: "usuario1" };

  constructor(private _http: HttpClient) {}

  public async getProductos(): Promise<any[]> {
    const response = await this._http.get<any>(this.urlApi).toPromise();
    return response;
  }
}
