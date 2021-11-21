import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ReportService } from "../services/reports.service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getFechaForQuery } from "../services/index";

@Component({
  selector: "reports-root",
  templateUrl: "./reports.components.html",
  styleUrls: ["./reports.components.css"]
})
export class ReportsComponent {
  public columnas: string[] = [];
  public fechaDesde: string;
  public fechaHasta: string;
  public idProduct: number;

  public datos: Detalle[] = [];
  public services: any = null;
  //public _service: ReportService;
  constructor(private _service: ReportService) {
    this.getdb();
    this.idProduct = 0;
    const fecha:string = getFechaForQuery( new Date((new Date()).valueOf() - 1000*60*60*24));
    this.fechaDesde = `${fecha.substr(0,4)}-${fecha.substr(4,2)}-${fecha.substr(6)}`;
    this.fechaHasta = `${fecha.substr(0,4)}-${fecha.substr(4,2)}-${fecha.substr(6)}`;

    //this.datos = [new Detalle("ruben", "1234567", "pro1", 1, 5)];
    this.columnas = ["Cliente", "Fecha", "Producto", "Cantidad", "Total"];
  }
  async filterDate() {
    let fechaDesdeCadena: string = this.fechaDesde.replace(/-/gi, "");
    let fechaHastaCadena: string = this.fechaHasta.replace(/-/gi, "");
    console.log(fechaDesdeCadena);
    this.services = await this._service.getbd();
    let datos: Detalle[] = [];
    this.services.detalleVentas.forEach((detalleVentas: { idProducto: any; idVenta: any; cantidad: number; }) => {
      let idProducto = detalleVentas.idProducto;
      let producto: any = {};
      let idVenta = detalleVentas.idVenta; ///aun no hay en la bd
      let venta: any = {};
      let cliente: any = {};
      this.services.productos.forEach((productos: { id: any; }) => {
        if (idProducto === productos.id) {
          producto = productos;
        }
      });
      this.services.ventas.forEach((ventas: { id: number; }) => {
        if (idVenta === ventas.id) {
          venta = ventas;
        }
      });
      this.services.clientes.forEach((clientes: { id: any; }) => {
        if (venta.idCliente === clientes.id) {
          cliente = clientes;
        }
      });

      if (fechaDesdeCadena <= venta.fecha && venta.fecha <= fechaHastaCadena) {
        datos.push(
          new Detalle(
            cliente.nombreApellido,
            `${venta.fecha.substr(0, 4)}-${venta.fecha.substr(
              4,
              2
            )}-${venta.fecha.substr(6)}`,
            producto.id + " - "+producto.nombre,
            detalleVentas.cantidad,
            venta.total
          )
        );
      }
    });
    console.log(datos);
    this.datos = datos;
  }
  public async getdb() {
    this.services = await this._service.getbd();
    let datos: Detalle[] = [];
    this.services.detalleVentas.forEach((detalleVentas: { idProducto: any; idVenta: any; cantidad: number; }) => {
      let idProducto = detalleVentas.idProducto;
      let producto : any = {};
      let idVenta = detalleVentas.idVenta; ///aun no hay en la bd
      let venta : any = {};
      let cliente : any = {};
      this.services.productos.forEach((productos: { id: any; }) => {
        if (idProducto === productos.id) {
          producto = productos;
        }
      });
      this.services.ventas.forEach((ventas: { id: number; }) => {
        if (idVenta === ventas.id) {
          venta = ventas;
        }
      });
      this.services.clientes.forEach((clientes: { id: any; }) => {
        if (venta.idCliente === clientes.id) {
          cliente = clientes;
        }
      });

      datos.push(
        new Detalle(
          cliente.nombreApellido,
          `${venta.fecha.substr(0, 4)}-${venta.fecha.substr(
            4,
            2
          )}-${venta.fecha.substr(6)}`,
          producto.id + " - "+producto.nombre,
          detalleVentas.cantidad,
          venta.total
        )
      );
    });
    console.log(datos);
    this.datos = datos;
  }
  public dataSource = null;

  ngOnInit() {
    //this.dataSource = new MatTableDataSource(this.datos);
    this.getdb();
    //this.downloadPDF();
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filtro.trim().toLowerCase();
  }
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById("htmlData") as HTMLInputElement;
    const doc = new jsPDF("p", "pt", "a4");
    const options = {
      background: "white",
      scale: 3
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL("image/PNG");

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          "PNG",
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          "FAST"
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
  }
}

export class Detalle {
  constructor(
    public cliente: string,
    public fecha: string,
    public producto: string,
    public cantidad: number,
    public total: number
  ) {}
}
