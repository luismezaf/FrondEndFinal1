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

  public nuevoCliente: any = {
    nombreApellido: '', ruc: '', email: ''
  };
  public clients: Array<any> = [];
  public showAddClientModal: Boolean = false;
  async loadClients(){
    this.clients = await this._clientsService.getClients();
  }
  async initialize() {
    await this.loadClients();
  }

  async createClient(){
    let newClient: any = {};


    if(this.nuevoCliente.id){
      newClient = await this._clientsService.editClient(this.nuevoCliente);  
      this.clients = this.clients.map(
        c => c.id === newClient.id ? 
          newClient : c
      );
    }else{
      newClient = await this._clientsService.addClient(this.nuevoCliente);
      this.clients.push(newClient);
    }

    // Update page
    this.nuevoCliente = {
      nombreApellido: '', ruc: 0, email: 0
    };
    this.showAddClientModal = false;
    this.initialize();
  }

  async deleteClient(idClient: Number){
    await this._clientsService.deleteClient(idClient);
    this.clients = this.clients.filter( c => c.id !== idClient);
  }

  handleEditClick(idClient: Number){
    this.nuevoCliente = this.clients.find(c => c.id === idClient);
    this.showAddClientModal = true;
  }
  ngOnInit() {
    this.initialize();
  }
}
