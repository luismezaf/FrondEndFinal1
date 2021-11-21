import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { mainEndpoint } from "./utils";
@Injectable({
  providedIn: "root"
})
export class ReportService {
  private urlApi = mainEndpoint;
  public isLogged: boolean = true;
  public user: any = { usuarioLogin: "usuario1" };

  constructor(private _http: HttpClient) {}

  public async getbd(): Promise<any[]> {
    const response = await this._http.get<any>(this.urlApi + "db/").toPromise();
    //console.log(response);
    return response;
  }
  public async getServiceFromTo(
    fechaDesde: string,
    fechaHasta: string
  ) {
    const fechaDesdeCadena: string = fechaDesde.replace(/-/gi, "");
    const fechaHastaCadena: string = fechaHasta.replace(/-/gi, "");
    const requestObj = {
      fechaDesdeCadena: fechaDesdeCadena,
      fechaHastaCadena: fechaHastaCadena
    };
  }
}
