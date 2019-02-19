import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from '../../../model/ticket';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { filter } from 'rxjs/operators';
import { StatusEnum } from '../../../Common/Enum/StatusEnum';
import { PriorityEnum } from '../../../Common/Enum/PriorityEnum';
import { ServicedescService } from '../../../service/servicedesc.service';
import { ServiceDesk } from '../../../model/ServiceDesk';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../model/user';
import { DatePipe } from '@angular/common';
import { NotifytoService } from '../../../service/notifyto.service';
import { NotifyTo } from '../../../model/NotifyTo';
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
  ticketDateFromInput=''
  ticketDateToInput=''
  resolvedDateFromInput=''
  resolvedDateToInput=''
  assignerInput=''
  priorityInput=''
  tickets = []
  filteredTickets = []
  unFilteredTickets = []
  prioritys: {id: number; name: string}[] = [];
  status: {id: number; name: string}[] = [];
  serviceDesks: {id: string; name: string}[] = [];
  servicedesks :  ServiceDesk[]=[];
  users :  User[]=[];
  notifyTo: NotifyTo[]=[];
  dropdownSettings = {};
  Selectedusers: User[]=[];
  constructor(private formBuilder:FormBuilder,private notifytoService: NotifytoService,public datepipe: DatePipe,private UserService: UserService,private serviceDescService: ServicedescService, private ticketService: TicketService, private router: Router) { 

  }

  ngOnInit() 
  {
    this.getServiceDesks();
    this.getUsers();
    this.status.push({ id: 0 , name:'----Select----' });
    for(let n in StatusEnum) {
      if (typeof StatusEnum[n] === 'number') {
         this.status.push({id: <any>StatusEnum[n], name: n});
        }
    }
    this.prioritys.push({ id: 0 , name:'----Select----' });
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
    this.getAllTickets();
  }
  filterTickets ()
  {
    var arryFiltered = this.unFilteredTickets;
    if (this.serviceDeskInput != '') 
      arryFiltered =  arryFiltered.filter(item=> item.ServiceDeskId==this.serviceDeskInput)
    if (this.statusInput != '') 
      arryFiltered =  arryFiltered.filter(item=> item.Status==this.statusInput)
    this.tickets = arryFiltered;
    for (let t of this.tickets){
      for (let sd of this.servicedesks){
        if(t.ServiceDeskId == sd._id)
           t.ServiceDeskId=sd.Name;
    }
   }
  }
  getAllTickets()
  {
    this.ticketService.getTickets().subscribe(data => {
    this.tickets = data;
    this.UserService.getUsers().subscribe(x => {
    this.users = x;
    this.notifytoService.gets().subscribe(y => {
    this.notifyTo = y;
      for (let t of this.tickets){
        for (let u of this.users){
          if(t.CreatedBy == u._id)
            t.CreatedName = u.Fname+' '+u.Lname;
          if(t.Assigned == u._id)
            t.AssignedName = u.Fname+' '+u.Lname;
       }
      }
      for (let t of this.tickets){
        for (let sd of this.servicedesks){
          if(t.ServiceDeskId == sd._id)
             t.ServiceDeskName = sd.Name;
       }
     }
     for (let t of this.tickets){
       for(let n in StatusEnum) {
        if (typeof StatusEnum[n] === 'number') {
          if(t.Status == <any>StatusEnum[n]){
            t.StatusName = n;
         }
      }
     }
    }
    for (let t of this.tickets){
      if(t.CreatedDate != null && t.ResolvedDate != null){
        let diffInMs: number = Date.parse(t.ResolvedDate) - Date.parse(t.CreatedDate);
        t.ResolvedDuration  = ((diffInMs / 1000 / 60 / 60))/3;
      }
      t.CreatedDate = this.datepipe.transform(t.CreatedDate, 'dd-MMM-yyyy h:mm a');
      t.ResolvedDate = this.datepipe.transform(t.ResolvedDate, 'dd-MMM-yyyy h:mm a');
      for(let n in PriorityEnum) {
        if (typeof PriorityEnum[n] === 'number') {
           if(t.Status == <any>PriorityEnum[n]){
             t.PriorityName = n;
          }
       }
     }
     }
     for (let ds of this.tickets){
      ds.NotifyToName = [];
      for (let ua of this.notifyTo){
         for (let u of this.users){
           if(ds._id === ua.ServiceRequestId){
             if(ua.UserId === u._id)
              ds.NotifyToName.push(u.Fname+' '+u.Lname);
          }
       }
     }
    }
    });
   }); 
  });
  }
  getServiceDesks() {
    this.serviceDescService.getServiceDesks().subscribe(data => {
      this.servicedesks = data;
      this.serviceDesks.push({ id: '0' , name:'----Select----' });
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
  resetFilters()
  {
    this.serviceDeskInput = '';
    this.ticketInput = '';
    this.employeeInput = '';
    this.statusInput='';
    this.ticketDateFromInput='';
    this.ticketDateToInput='';
    this.resolvedDateFromInput='';
    this.resolvedDateToInput='';
    this.assignerInput='';
    this.getAllTickets();
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
}
