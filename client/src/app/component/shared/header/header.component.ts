import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Ent = environment;
  RoleId : Number = 0;
  ServiceDeskList = [];
  constructor(private router: Router) { }
  
  ngOnInit() {
   if(localStorage.getItem('User') == null)
     return this.router.navigateByUrl('login');
   var User = JSON.parse(localStorage.getItem('User'));
   this.RoleId = Number(User[0].RoleId) 
   this.ServiceDeskList = [];
     for(let s of JSON.parse(localStorage.getItem('ServiceDesk'))){
       this.ServiceDeskList.push(s);
     } 
  }
  Mylisting(){
    this.router.navigateByUrl('/Mylisting/true');
  }
}