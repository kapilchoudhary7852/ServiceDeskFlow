import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from '../../../model/ticket';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { PriorityEnum } from '../../../Common/Enum/PriorityEnum';
import { ServiceDesk } from '../../../model/ServiceDesk';
import { ServicedescService } from '../../../service/servicedesc.service';
import { User } from '../../../model/user';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  ticketId = "5c6bf0b589c4b1e5976ce0e5";
  ticketDetails = null;


  submitted = false;
  ticketForm: FormGroup;
  prioritys: {id: number; name: string}[] = [];
  serviceDesks: {id: string; name: string}[] = [];
  servicedesks :  ServiceDesk[]=[];
  users :  User[]=[];
  Selectedusers: User[]=[];
  CreatedBy: string ='5c63a65dda007e1474b2b5cc';;
  Description:string ='NoNeed';
  dropdownSettings = {};







  constructor(private formBuilder:FormBuilder,private UserService: UserService, private serviceDescService: ServicedescService,private ticketService: TicketService, private router: Router) { 

  }

  ngOnInit() 
  {
    this.getUsers();
    this.getServiceDesks();

    for(let n in PriorityEnum) {
      if (typeof PriorityEnum[n] === 'number') {
        this.prioritys.push({id: <any>PriorityEnum[n], name: n});
        }
    }
    
    this.ticketForm = this.formBuilder.group({
      ServiceDeskId: ['', [Validators.required]],
      PriorityId: ['', [Validators.required]],
      IssueTitle: ['', [Validators.required]],
      CreatedBy: ['5c63a65dda007e1474b2b5cc'],
      Description: ['',[Validators.required]],
      NotifyTo: ['',[Validators.required]],
    });


    this.getTicketDetails();

  }

  getTicketDetails()
  {

    this.ticketService.getTicketWithId(this.ticketId).subscribe(data => {
      this.ticketDetails = data;
      this.ticketForm.controls.ServiceDeskId.setValue(this.ticketDetails.ServiceDeskId);

      this.ticketForm.controls.PriorityId.setValue(this.ticketDetails.PriorityId);
      this.ticketForm.controls.IssueTitle.setValue(this.ticketDetails.IssueTitle);

      console.log(data);
    });
  }

  getUsers() {
    this.UserService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  getServiceDesks() {
    this.serviceDescService.getServiceDesks().subscribe(data => {
      this.servicedesks = data;
      for (let ds of this.servicedesks){
        this.serviceDesks.push({ id: ds._id , name:ds.Name });
      }

      console.log(this.servicedesks);
    });
  }


  generateTicket()
  {

  }

  get f() { return this.ticketForm.controls; }


}
