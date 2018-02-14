import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";

import { Client } from "../../models/client";
import { ClientService } from "../../services/client.service";
import { SettingsService } from "../../services/settings.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disabledBalanceOnAdd: boolean;

  @ViewChild('clientForm') form: any;

  constructor(
    private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    console.log(this.form);
    this.disabledBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit() {

    if ( !this.form.valid ) {
      this.flashMessages.show('Please enter form', {
        timeout: 4000,
        cssClass: 'alert-danger'
      })
    } else {
      // Add new client
      this.clientService.newClient(this.client);
      // show message success
      this.flashMessages.show('New client add success', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // Redirect
      this.router.navigate(['/']);
    }

  }

}
