import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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


  
  submitted = false;
  ticketForm: FormGroup;
  serviceDeskOptions = ["Desk 1","Desk 2","Desk 3","Desk 4"];
  priorityOptions = ["1","2","3","4"];


  
  generateTicket() 
  {
    console.log(this.ticketForm.value)

    this.submitted = true;

    if (this.ticketForm.invalid) {
      return;
    } else {
    this.ticketService.createTicket(this.ticketForm.value).subscribe(res =>  alert('User created.') ,
    
    error=>alert('error'));
  }
  }
  constructor(private formBuilder:FormBuilder, private ticketService: TicketService, private router: Router) { 

  }

  
  ngOnInit() {

    this.ticketForm = this.formBuilder.group({
      ServiceDeskId: ['', [Validators.required]],
      PriorityId: ['', [Validators.required]],
      IssueTitle: ['', [Validators.required]],
      Comment: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      NotifyTo: ['',[Validators.required]],
      CreatedBy: ['', [Validators.required]],
    });
  }

  get f() { return this.ticketForm.controls; }


}
