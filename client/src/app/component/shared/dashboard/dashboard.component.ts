import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { environment } from '../../../../environments/environment';
import { TicketService } from 'src/app/service/ticket.service';
import { ServicedescService } from '../../../service/servicedesc.service';
import { ServiceDesk } from '../../../model/ServiceDesk';
import { RolesEnum } from 'src/app/Common/Enum/RolesEnum';
import { StatusEnum } from '../../../Common/Enum/StatusEnum';
import { Ticket } from '../../../model/ticket';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Ent = environment;
  canvas: any;
  ctx: any;
  chart:any;
  tickets = [];
  filteredTickets = [];
  unFilteredTickets = [];
  servicedesks :  ServiceDesk[]=[];
  serviceDesks: {id: string; name: string}[] = [];
  serviceDeskInput = '';
  ticketDateFromInput='';
  ticketDateToInput='';
  Labels  = []; //["New", "InProgress", "Closed","Reopen","Resolved","Escalated","Pending"];
  Data = []; //[1,2,3,4,5,6,7];
  BackgroundColorList =['rgba(100, 99, 132, 1)','rgba(150, 162, 235, 1)','rgba(200, 99, 132, 1)',
                    'rgba(250, 162, 235, 1)','rgba(300, 99, 132, 1)', 'rgba(500, 162, 235, 1)', 
                    'rgba(400, 206, 86, 1)'];
  BackgroundColor=[];        
  ServiceDeskList = [];     
  RoleId : Number = 0;       
  constructor(private serviceDescService: ServicedescService, 
    private router: Router, private ticketService: TicketService) { }
  ngOnInit() {
    
    if(localStorage.getItem('User') == null)
     return this.router.navigateByUrl('login');
     var User = JSON.parse(localStorage.getItem('User'));
     this.RoleId = Number(User[0].RoleId);
     this.ServiceDeskList = [];
     for(let s of JSON.parse(localStorage.getItem('ServiceDesk'))){
       this.ServiceDeskList.push(s);
     } 
     if(this.RoleId == RolesEnum.Employee || this.RoleId == RolesEnum.SecondaryAuthorityAssigner)
       this.router.navigateByUrl('/Mylisting/true');
    this.getAllTickets();
    this.getServiceDesks();
  }
  filterTickets ()
  {
    var arryFiltered = this.unFilteredTickets;
    if (this.serviceDeskInput != '' && this.serviceDeskInput != '0' && this.serviceDeskInput != null) 
      arryFiltered =  arryFiltered.filter(item=> item.ServiceDeskId==this.serviceDeskInput)
    if (this.ticketDateFromInput !=''|| this.ticketDateToInput !='') 
     {
        if(this.ticketDateFromInput =='')
          this.ticketDateFromInput = '1000-01-01T08:07:20.717Z';
        if(this.ticketDateToInput =='')
          this.ticketDateToInput = '3000-01-01T08:07:20.717Z';
        arryFiltered =  arryFiltered.filter(item=> new Date(item.CreatedDate) >= new Date(this.ticketDateFromInput) && new Date(item.CreatedDate) <= new Date(this.ticketDateToInput))
     }
    this.tickets = arryFiltered;
    this.FillChart(this.tickets,2);
  }
  getAllTickets()
  {
    this.ticketService.getTickets().subscribe(data => {
    this.tickets = data;
    this.unFilteredTickets = data;
    this.FillChart(this.tickets,1);
   });
  }
  getServiceDesks() {
    let ServiceDeskList = [];
    var Sd = JSON.parse(localStorage.getItem('ServiceDesk'));
    for(let s of Sd){
      ServiceDeskList.push(s);
    }
    this.serviceDescService.getServiceDesks().subscribe(data => {
      this.servicedesks = data;
      if(this.RoleId != RolesEnum.HRCEO)
        this.servicedesks = this.servicedesks.filter(f => ServiceDeskList.includes(f._id));
      this.serviceDesks.push({ id: '0' , name:'----Select----' });
      for (let ds of this.servicedesks){
        this.serviceDesks.push({ id: ds._id , name:ds.Name });
      }
    });
  }
  FillChart(val,check) {
    if(val.length > 0){
    this.Labels = [];
    this.Data = [];
    this.canvas = null;
    this.ctx = null;
    for(let n in StatusEnum) {
      if (typeof StatusEnum[n] === 'number') {
         this.Labels.push(n); 
         this.Data.push(val.filter(item=> item.Status == <any>StatusEnum[n]).length);
       }
    }
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    if(this.chart != undefined) 
    this.chart.destroy(); 

    this.chart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.Labels,
          datasets: [{
            data: this.Data,  
            label: '# of Votes',
            backgroundColor: this.BackgroundColorList,
            borderWidth: 1
           }]
       },
       options: {
         responsive: false,
         display:true,
       }
    });
    this.chart.data[0].data.update();
    }
  else{
    alert('No data found')
  }
 }
}
