import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from '../../../model/ticket';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  tickets = []
  constructor(private formBuilder:FormBuilder, private ticketService: TicketService, private router: Router) { 

  }

  ngOnInit() 
  {
    this.getAllTickets();
  }

  getAllTickets()
  {
    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data;
      console.log(data);
    });
  }

}
