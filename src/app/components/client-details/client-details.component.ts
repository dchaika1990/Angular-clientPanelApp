import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

//Services
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";

//Modules
import { Client } from "../../models/client";

//Router
import { Router } from "@angular/router";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client: Client = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  id: string;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientServices: ClientService,
    public route: ActivatedRoute,
    public router: Router,
    public  flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.clientServices.getClient(this.id).subscribe( client => {
      if (this.client) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    } );

  }

  deleteClient() {
    if (confirm('Are you sure?')) {
      this.clientServices.deleteClient(this.client);
      // show message success
      this.flashMessages.show('Client deleted with success', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      //Redirect
      this.router.navigate(['/']);
    }
  }

  updateBalance() {
    this.clientServices.updateClient(this.client);
    // show message success
    this.flashMessages.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000
    });
    this.showBalanceUpdateInput = false;
  }

}
