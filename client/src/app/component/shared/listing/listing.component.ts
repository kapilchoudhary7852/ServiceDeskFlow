import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from '../../../model/ticket';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  serviceDeskInput = '';
  ticketInput = '';
  employeeInput = '';
  statusInput=''
  ticketDateInput=''
  resolvedDateInput=''
  assignerInput=''

  tickets = []
  filteredTickets = []
  unFilteredTickets = []
  constructor(private formBuilder:FormBuilder, private ticketService: TicketService, private router: Router) { 

  }

  ngOnInit() 
  {
    this.getAllTickets();
  }


  filterTickets ()
  {
    var arryFiltered = this.unFilteredTickets;

    if (this.serviceDeskInput != '') 
    {
      arryFiltered =  arryFiltered.filter(item=> item.ServiceDeskId==this.serviceDeskInput)
    }
    
    if (this.statusInput != '') 
    {
      arryFiltered =  arryFiltered.filter(item=> item.Status==this.statusInput)
    }
     
    this.tickets = arryFiltered;
  }

  resetFilters()
  {
    this.serviceDeskInput = '';
    this.ticketInput = '';
    this.employeeInput = '';
    this.statusInput='';
    this.ticketDateInput='';
    this.resolvedDateInput='';
    this.assignerInput='';
    
    this.getAllTickets();
  }

  getAllTickets()
  {
    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data;
      this.unFilteredTickets = data;
      console.log(data);
    });
  }

}
