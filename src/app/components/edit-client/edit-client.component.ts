import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

//Services
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "../../services/client.service";

//Module
import { Client } from "../../models/client";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  id: string;

  disabledBalanceOnAdd: boolean = JSON.parse(localStorage.getItem('settings')).disableBalanceOnAdd;

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

        this.client = client;
      }
    } );
  }

  onSubmit(form) {

    if ( !form.valid ) {
      this.flashMessages.show('Please enter form', {
        timeout: 4000,
        cssClass: 'alert-danger'
      })
    } else {
      // Client has been edited
      this.clientServices.editClient(this.client);
      // show message success
      this.flashMessages.show('Client has been edited', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // Redirect
      this.router.navigate([`client/${this.id}`]);
    }

  }

}
