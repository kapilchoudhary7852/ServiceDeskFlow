import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { RolesEnum } from '../../../Common/Enum/RolesEnum';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  isOpen: Boolean = false;
  users: User[];
  roles: {id: number; name: string}[] = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUsers();

  }
  getUsers() {
    for(var n in RolesEnum) {
      if (typeof RolesEnum[n] === 'number') {
          this.roles.push({id: <any>RolesEnum[n], name: n});
        }
    }
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.roles);
      for(var n=0;n<=this.users.length;n++){
        for(var r=0; r<= this.roles.length;r++){
          if (parseInt(this.users[n].RoleId) == this.roles[r].id) {
              this.users[n].RoleName = this.roles[r].name;
              break;
          }
        }
      }
    });
  }

  addUser() {
    this.router.navigateByUrl('/create');
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(res => { this.getUsers(); });
  }


}
