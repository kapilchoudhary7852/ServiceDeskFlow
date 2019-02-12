import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  isOpen: Boolean = false;
  users: User[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUsers();

  }
  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

  addUser() {
    this.router.navigateByUrl('/create');
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(res => { this.getUsers(); });
  }


}
