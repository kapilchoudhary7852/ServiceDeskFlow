import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from '../../../model/ticket';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';




@Component({
  selector: 'app-ticket-creation-form',
  templateUrl: './ticket-creation-form.component.html',
  styleUrls: ['./ticket-creation-form.component.css']
})
export class TicketCreationFormComponent implements OnInit {

  ticketForm = new FormGroup({
    ServiceDeskId:new FormControl(),
    PriorityId:new FormControl(),
    IssueTitle :new FormControl(),
    Comment : new FormControl(),
    Status : new FormControl(),
    NotifyTo : new FormControl(), 
    CreatedBy : new FormControl(), 
  });
  serviceDeskOptions = ["Desk 1","Desk 2","Desk 3","Desk 4"];
  priorityOptions = ["1","2","3","4"];


  
  generateTicket() 
  {
    console.log(this.ticketForm.value)
    this.ticketService.createTicket(this.ticketForm.value).subscribe(res =>  alert('User created.') ,
    
    error=>alert('error'));
  }

  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
  }

}
