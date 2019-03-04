import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Route, Router } from '@angular/router';
import { RolesEnum } from '../../../Common/Enum/RolesEnum';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  submitted = false;
  createForm: FormGroup;
  roles: {id: number; name: string}[] = [];
  RoleId : Number = 0;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: Router) { }
  ngOnInit() {
    if(localStorage.getItem('User') == null)
      this.route.navigateByUrl('login');
    var User = JSON.parse(localStorage.getItem('User'));
    this.RoleId = Number(User[0].RoleId) 
    if(this.RoleId != RolesEnum.HRCEO)
      this.route.navigateByUrl('dashboard');
    for(var n in RolesEnum) {
    if (typeof RolesEnum[n] === 'number') {
        this.roles.push({id: <any>RolesEnum[n], name: n});
        }
    }
    this.createForm = this.formBuilder.group({
      UserId: ['', [Validators.required]],
      Fname: ['', [Validators.required]],
      Lname: ['', [Validators.required]],
      RoleId: ['', Validators.required]
    });
    
  }
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    } else {
      console.log(this.createForm.value);
      this.userService.createUser(this.createForm.value).subscribe(res => {
        if(res == true) {
          this.route.navigateByUrl('/home');
        }
        else{
          alert(res);
        }
      });
    }
  }
}
