import { Component } from "@angular/core";
import { ClientsService } from "src/app/services/clients.service";

@Component({
  selector: "clients-root",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent {
  constructor(
    private _clientsService: ClientsService,
  ) {}

  public clients: Array<any> = [];
  public showAddClientModal: Boolean = false;
  async loadClients(){
    this.clients = await this._clientsService.getClients();
  }
  async initialize() {
    await this.loadClients();
  }
  ngOnInit() {
    this.initialize();
  }
}
