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
  public nombreApellido ="";
  public ruc ="";
  public email ="";
   
  public clients: Array<any> = [];
  public showAddClientModal: Boolean = false;
  async loadClients(){
    this.clients = await this._clientsService.getClients();
  }
  async initialize() {
    await this.loadClients();
  }

  async createClient(){
    const newClient = await this._clientsService.addClient({
      id: 2,
      nombreApellido: this.nombreApellido,
      ruc: this.ruc,
      email:this.email
    });
    // Update page
    this.showAddClientModal = false;
    this.initialize();
  }
  ngOnInit() {
    this.initialize();
  }
}
