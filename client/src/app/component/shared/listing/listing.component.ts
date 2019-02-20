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
  userAssignee :  {id: string; name: string}[] = [];
  userReporter :  {id: string; name: string}[] = [];
  notifyTo: NotifyTo[]=[];
  dropdownSettings = {};
  SelectedReporter: User[]=[];
  SelectedAssignee: User[]=[];
  ReporterInput =''
  AssigneeInput =''
  _id = null;
  constructor(private formBuilder:FormBuilder,private notifytoService: NotifytoService,public datepipe: DatePipe,private UserService: UserService,private serviceDescService: ServicedescService, private ticketService: TicketService, private router: Router) { 

  }
  deactivateSR(data,val)
  {
    this._id = data._id;
    if(val==0){
       data.IsActive=false;
       this.ticketService.update(this._id, data).subscribe(res => {
        location.reload();
      });
    }
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
    if (this.serviceDeskInput != '' && this.serviceDeskInput != '0' && this.serviceDeskInput != null) 
      arryFiltered =  arryFiltered.filter(item=> item.ServiceDeskId==this.serviceDeskInput)
    if (this.statusInput != '' &&  this.statusInput != '0') 
      arryFiltered =  arryFiltered.filter(item=> item.Status==this.statusInput)
    if (this.priorityInput != '' &&  this.priorityInput != '0') 
      arryFiltered =  arryFiltered.filter(item=> item.PriorityId==this.priorityInput)
    if (this.AssigneeInput != '0' && this.AssigneeInput != '') 
        arryFiltered =  arryFiltered.filter(item=> item.Assigned == this.AssigneeInput)
    if (this.ReporterInput!= '0' && this.ReporterInput!= '') 
        arryFiltered =  arryFiltered.filter(item=> item.CreatedBy == this.ReporterInput)
    if (this.ticketDateFromInput !=''|| this.ticketDateToInput !='') 
     {
        if(this.ticketDateFromInput =='')
          this.ticketDateFromInput = '1000-01-01T08:07:20.717Z';
        if(this.ticketDateToInput =='')
          this.ticketDateToInput = '3000-01-01T08:07:20.717Z';
        arryFiltered =  arryFiltered.filter(item=> new Date(item.CreatedDate) >= new Date(this.ticketDateFromInput) && new Date(item.CreatedDate) <= new Date(this.ticketDateToInput))
     }
     if (this.resolvedDateFromInput !=''|| this.resolvedDateToInput !='') 
     {
        if(this.resolvedDateFromInput =='')
          this.resolvedDateFromInput = '1000-01-01T08:07:20.717Z';
        if(this.resolvedDateToInput =='')
          this.resolvedDateToInput = '3000-01-01T08:07:20.717Z';
        arryFiltered =  arryFiltered.filter(item=> new Date(item.ResolvedDate) >= new Date(this.resolvedDateFromInput) && new Date(item.ResolvedDate) <= new Date(this.resolvedDateToInput))
     }
    this.tickets = arryFiltered;
  }
  getAllTickets()
  {
    this.ticketService.getTickets().subscribe(data => {
    this.tickets = data;
    this.unFilteredTickets = data;
    this.UserService.getUsers().subscribe(x => {
    this.users = x;
    this.userReporter = [];
    this.userAssignee = [];
    this.userReporter.push({ id: '0' , name:'----Select----' });
    for (let t of this.tickets){
      for (let u of this.users){
        if(t.CreatedBy == u._id)
          this.userReporter.push({ id: u._id , name:u.Fname+' '+u.Fname});
      }
    }
    this.userReporter = this.userReporter.filter((el, i, a) => i === a.indexOf(el))
    this.userAssignee.push({ id: '0' , name:'----Select----' });
    for (let t of this.tickets){
      for (let u of this.users){
        if(t.Assigned == u._id)
        this.userAssignee.push({ id: u._id , name:u.Fname+' '+u.Fname});
     }
    }
    this.userAssignee = this.userAssignee.filter((el, i, a) => i === a.indexOf(el))
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
       for(let n in  StatusEnum) {
        if (typeof StatusEnum[n] === 'number') {
           let ID = <any>StatusEnum[n];
           let NAME = n;
           if(t.Status == ID)
             t.StatusName=NAME;
         }
     }
    }
    for (let t of this.tickets){
      for(let n in  PriorityEnum) {
        if (typeof PriorityEnum[n] === 'number') {
           let ID = <any>PriorityEnum[n];
           let NAME = n;
           if(t.PriorityId == ID)
             t.PriorityName=NAME;
         }
     }
      if(t.CreatedDate != null && t.ResolvedDate != null){
        let diffInMs: number = Date.parse(t.ResolvedDate) - Date.parse(t.CreatedDate);
        t.ResolvedDuration  = ((diffInMs / 1000 / 60 / 60))/3;
      }
      t.CreatedDate = this.datepipe.transform(t.CreatedDate, 'dd-MMM-yyyy h:mm a');
      t.ResolvedDate = this.datepipe.transform(t.ResolvedDate, 'dd-MMM-yyyy h:mm a');
     
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
    this.ReporterInput ='';
    this.AssigneeInput='';
    this.getAllTickets();
  }
  onItemSelect(item: any, val:any) {
    if(item!=null){
      if(val==1)
        this.SelectedAssignee.push(item);
      if(val==2)
        this.SelectedReporter.push(item);
    }
  }
  onSelectAll(items: any, val:any) {
    if(items!=null){
      if(val==1){
        this.SelectedAssignee = null;
        this.SelectedAssignee= items;
      }
      if(val==1){
        this.SelectedReporter  = null;
        this.SelectedReporter = items;
      }
   }
  }
  
}
