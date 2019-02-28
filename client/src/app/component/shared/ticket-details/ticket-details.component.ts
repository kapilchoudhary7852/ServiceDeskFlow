import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from '../../../model/ticket';
import {ActivatedRoute, Router } from '@angular/router';
import { JsonPipe, DatePipe } from '@angular/common';
import { PriorityEnum } from '../../../Common/Enum/PriorityEnum';
import { ServiceDesk } from '../../../model/ServiceDesk';
import { ServicedescService } from '../../../service/servicedesc.service';
import { User } from '../../../model/user';
import { UserService } from 'src/app/service/user.service';
import { StatusEnum } from '../../../Common/Enum/StatusEnum';
import { NotifytoService } from '../../../service/notifyto.service';
import { NotifyTo } from '../../../model/NotifyTo';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  Ent = environment;
  ticketDetails = null;
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
  dropdownSettings2 = {};
  ticketId: string = null;

  notifyTo: NotifyTo[]=[];
  status: {id: number; name: string}[] = [];


  Assigned={};
  tickets = [];





  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute,private UserService: UserService, private serviceDescService: ServicedescService,private ticketService: TicketService, private router: Router,private notifytoService: NotifytoService,public datepipe: DatePipe) { 

  }

  ngOnInit() 
  {

    this.ticketId = this.route.snapshot.paramMap.get('id');
    this.getUsers();
    this.getServiceDesks();

    this.status.push({ id: 0 , name:'----Select----' });
    for(let n in StatusEnum) {
      if (typeof StatusEnum[n] === 'number') {
         this.status.push({id: <any>StatusEnum[n], name: n});
        }
    }

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

    this.dropdownSettings2 = {
      singleSelection: true,
      idField: '_id',
      textField: 'Fname',
     // selectAllText: 'Select All',
     // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.ticketForm = this.formBuilder.group({
      ServiceDeskId: ['', [Validators.required]],
      PriorityId: ['', [Validators.required]],
      IssueTitle: ['', [Validators.required]],
     // CreatedBy: [this.CreatedBy],
      Description: ['',[Validators.required]],
      NotifyTo: ['',[Validators.required]],
      Assigned: ['',[Validators.required]],
      AssignedTime: ['',[Validators.required]],
      Comment: ['',[Validators.required]],
      Status: ['',[Validators.required]],

    });


    this.getTicketDetails();
    this.getAllTickets();

  }

  getAllTickets()
  {
    console.log(this.ticketId);

    this.ticketService.getTicketHistoryForSR(this.ticketId).subscribe(data => {
      this.tickets = data;
    })
  }


  fillTicketDetails(ticket)
  {

    var tickets = [ticket];
    this.UserService.getUsers().subscribe(x => {
    this.users = x;
    this.notifytoService.gets().subscribe(y => {
    var notifyToLocal = y;
    
      for (let t of tickets){
        for (let u of this.users){
          if(t.CreatedBy == u._id)
            t.CreatedName = u.Fname+' '+u.Lname;
          if(t.Assigned == u._id)
          {
            t.AssignedName = u.Fname+' '+u.Lname;
            this.Assigned = u;
          }
            
       }
      }
      for (let t of tickets){
        for (let sd of this.servicedesks){
          if(t.ServiceDeskId == sd._id)
             t.ServiceDeskName = sd.Name;
       }
     }
   
     for (let t of tickets){
       for(let n in StatusEnum) {
        if (typeof StatusEnum[n] === 'number') {
          if(t.Status == <any>StatusEnum[n])
          {
            t.StatusName = n;
         }
      }
     }
    }


    for (let t of tickets){
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
     for (let ds of tickets){
      ds.NotifyToName = [];
      for (let ua of notifyToLocal){
         for (let u of this.users){
           if(ds._id === ua.ServiceRequestId){
             if(ua.UserId === u._id)
             {
                ds.NotifyToName.push(u.Fname+' '+u.Lname);
                 //this.Selectedusers.push(u);
                 this.Selectedusers.push(u);
             }

          }
       }
     }

    }

    this.ticketForm.controls.NotifyTo.setValue(this.Selectedusers);
    this.ticketForm.controls.AssignedTime.setValue(tickets[0].CreatedDate);
    //console.log(this.Assigned.UserId);
    if (this.Assigned["UserId"])
    {
      this.ticketForm.controls.Assigned.setValue([this.Assigned]);
    }
    




    
    });
   }); 
  }

  getStatusNameById(id)
  {
    return StatusEnum[id];
  }

  getPriorityNameById(id)
  {
    return PriorityEnum[id];
  }

  getUserNameById(id)
  {
    if(!id)
    return '';

    if(this.users)
    {
       let user = this.users.find(value=>value._id===id);
      
       if(user)
       return user.Fname
    }    
    return '';
  }

  getTicketDetails()
  {

    this.ticketService.getTicketWithId(this.ticketId).subscribe(data => {
      this.ticketDetails = data;
      this.ticketForm.controls.ServiceDeskId.setValue(this.ticketDetails.ServiceDeskId);

      this.ticketForm.controls.PriorityId.setValue(this.ticketDetails.PriorityId);
      this.ticketForm.controls.IssueTitle.setValue(this.ticketDetails.IssueTitle);
      this.ticketForm.controls.Description.setValue(this.ticketDetails.Description);
      this.ticketForm.controls.Status.setValue(this.ticketDetails.Status);

      this.ticketForm.controls.Comment.setValue(this.ticketDetails.Comment);


      this.fillTicketDetails(this.ticketDetails);
     // console.log(this.ticketDetails);
      
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

  
  onItemSelectAssigned(item: any) {
    if(item!=null){
       // this.Selectedusers.push(item);

    }
  }
  

  getServiceDesks() {
    this.serviceDescService.getServiceDesks().subscribe(data => {
      this.servicedesks = data;
      for (let ds of this.servicedesks){
        this.serviceDesks.push({ id: ds._id , name:ds.Name });
      }

    });
  }


  generateTicket()
  {
    var formValues = this.ticketForm.value

  
    
    if (this.ticketForm.controls.Assigned.value.length)
    {
     formValues['Assigned']= this.ticketForm.controls.Assigned.value[0]._id;
    }

     formValues['IsActive'] = this.ticketDetails.IsActive;

     if (StatusEnum.Resolved==this.ticketForm.controls.Status.value)
    {
        //alert("Resolved")

        formValues.ResolvedDate = Date.now();
    }
    else
    {
      formValues.ResolvedDate = null;

    }

    
     this.ticketService.update(this.ticketId,formValues ).subscribe(data=>{

      this.router.navigateByUrl('/listing'),
      error=>alert('error');
      

     });

  }

  get f() { return this.ticketForm.controls; }


}
