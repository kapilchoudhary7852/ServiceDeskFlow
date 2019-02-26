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
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-ticket-creation-form',
  templateUrl: './ticket-creation-form.component.html',
  styleUrls: ['./ticket-creation-form.component.css']
})
export class TicketCreationFormComponent implements OnInit {
  Ent = environment;
  submitted = false;
  ticketForm: FormGroup;
  prioritys: {id: number; name: string}[] = [];
  serviceDesks: {id: string; name: string}[] = [];
  servicedesks :  ServiceDesk[]=[];
  users :  User[]=[];
  Selectedusers: User[]=[];
  CreatedBy = this.Ent.UserId;
  Description:string ='NoNeed';
  dropdownSettings = {};
  generateTicket() 
  {
    console.log(this.ticketForm.value)
    this.submitted = true;
    if (this.ticketForm.invalid) {
      return;
    } else {
    this.ticketService.createTicket(this.ticketForm.value).subscribe(res => this.router.navigateByUrl('/Mylisting/true'), error=>alert('error'));
    }
  }
  constructor(private formBuilder:FormBuilder,private UserService: UserService, private serviceDescService: ServicedescService,private ticketService: TicketService, private router: Router) { 

  }
  ngOnInit() {
    this.getUsers();
    for(let n in PriorityEnum) {
      if (typeof PriorityEnum[n] === 'number') {
        this.prioritys.push({id: <any>PriorityEnum[n], name: n});
        }
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'Fname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.getServiceDesks();
    this.ticketForm = this.formBuilder.group({
      ServiceDeskId: ['', [Validators.required]],
      PriorityId: ['', [Validators.required]],
      IssueTitle: ['', [Validators.required]],
      CreatedBy: [this.CreatedBy],
      Status: [1],
      Description: ['',[Validators.required]],
      NotifyTo: ['',[Validators.required]],
    });
  }

   getServiceDesks() {
    this.serviceDescService.getServiceDesks().subscribe(data => {
      this.servicedesks = data;
      for (let ds of this.servicedesks){
        this.serviceDesks.push({ id: ds._id , name:ds.Name });
      }
    });
  }
  getUsers() {
    this.UserService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  onItemSelect(item: any) {
    if(item!=null){
        this.Selectedusers.push(item);
    }
  }
  onSelectAll(items: any) {
    if(items!=null){
      this.Selectedusers = null;
      this.Selectedusers= items;
    }
  }
  get f() { return this.ticketForm.controls; }
}
