import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "reports-root",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"]
})
export class ReportsComponent {
  columnas: string[] = ["Cliente", "Fecha", "Producto", "Cantidad", "Total"];

  datos: Detalle[] = [
    new Detalle("LuisproCrack", "10-10-2021", "AguaGondwana", 10, 50000),
    new Detalle("David", "10-10-2021", "Producto 2", 5, 25000),
    new Detalle("Ger", "10-10-2021", "Producto 3", 10, 50000)
  ];

  dataSource = null;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.datos);
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
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
