import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { RolesEnum } from '../../../Common/Enum/RolesEnum';
import { ServiceDesk } from '../../../model/ServiceDesk';
import { ServicedescService } from '../../../service/servicedesc.service';
import { UserAccess } from '../../../model/UserAccess';
import { UserAccessService } from 'src/app/service/user-access.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  isOpen: Boolean = false;
  users: User[];
  roles: {id: number; name: string}[] = [];
  servicedesks :  ServiceDesk[]=[];
  userAccess :  UserAccess[]=[];
  constructor(private userService: UserService,private UserAccessService: UserAccessService,private serviceDescService: ServicedescService, private router: Router) { }

  ngOnInit() {
    this.getUsers();

  }
  getServiceDesks() {
    this.serviceDescService.getServiceDesks().subscribe(data => {
      this.servicedesks = data;
      
    });
  }
  getUsers() {
    for(var n in RolesEnum) {
      if (typeof RolesEnum[n] === 'number') {
          this.roles.push({id: <any>RolesEnum[n], name: n});
        }
    }
      this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.serviceDescService.getServiceDesks().subscribe(x => {
      this.servicedesks = x;
      this.UserAccessService.getUserAccesss().subscribe(y=>{
      this.userAccess = y;
      for(var n=0;n<this.users.length;n++){
        for(var r=0; r< this.roles.length;r++){
          if (parseInt(this.users[n].RoleId) == this.roles[r].id) {
              this.users[n].RoleName = this.roles[r].name;
              break;
          }
         }
       }
       for(let u of this.users){
        for(let sd of this.userAccess){
          if (u._id == sd.UserId) {
              u.ServiceDeskId=sd.ServiceDeskId;
          }
        }
        for(let sd of this.servicedesks){
          if (u.ServiceDeskId == sd._id) {
              u.ServiceDeskName=sd.Name;
          }
        }
       }
       console.log(this.users);
     });
    });
   });
  }

  addUser() {
    this.router.navigateByUrl('/create');
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(res => { this.getUsers(); });
  }


}
