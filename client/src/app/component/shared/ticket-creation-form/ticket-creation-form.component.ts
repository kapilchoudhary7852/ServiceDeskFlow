import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';


@Component({
  selector: 'app-ticket-creation-form',
  templateUrl: './ticket-creation-form.component.html',
  styleUrls: ['./ticket-creation-form.component.css']
})
export class TicketCreationFormComponent implements OnInit {

  ticketForm = new FormGroup({
     serviceDesk:new FormControl(),
     priority:new FormControl(),
    issueTitle :new FormControl(),
   description : new FormControl(), 
  });
  serviceDeskOptions = ["Desk 1","Desk 2","Desk 3","Desk 4"];
  priorityOptions = ["1","2","3","4"];

  constructor() { }

  ngOnInit() {
  }

}
