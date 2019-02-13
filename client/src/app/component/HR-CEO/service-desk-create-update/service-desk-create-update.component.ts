import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ServicedescService } from '../../../service/servicedesc.service';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../model/user';
@Component({
  selector: 'app-service-desk-create-update',
  templateUrl: './service-desk-create-update.component.html',
  styleUrls: ['./service-desk-create-update.component.css']
})
export class ServiceDeskCreateUpdateComponent implements OnInit {
  submitted = false;
  createForm: FormGroup;
  servicemanager : string;
  IRA : string;
  secondarymanager : string;
  users :  User[];
  CreatedBy: string ;
  Description:string ;
  constructor(private formBuilder: FormBuilder,private UserService: UserService, private serviceDescService: ServicedescService, private route: Router) { }
  ngOnInit() {
    this.createForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      AssignedReminder: ['', [Validators.required]],
      CreatedBy: [''],
      Description: [''],
      IsActive: ['', [Validators.required]],
    });
    this.getUsers();
  }
  get f() { return this.createForm.controls; }
  getUsers() {
    this.UserService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    } else {
      console.log(this.createForm.value);
      this.CreatedBy = '5c63a65dda007e1474b2b5cc';
      this.Description = 'NoNeed';
      this.serviceDescService.createServiceDesk(this.createForm.value).subscribe(res => {
        this.route.navigateByUrl('/home');
      });
    }
  }
  getSelectedManager(id) {
   if(id!=null)
     this.servicemanager = id;
  }
  getSelectedIRA(id) {
    if(id!=null)
    this.IRA = id;
  }
  getSelected(id,val) {
   if(id!=null){
     if(val==1 || val =="1")
         this.servicemanager = id;
     if(val==2 || val =="2")
         this.IRA = id;
     if(val==3 || val =="3")
         this.secondarymanager = id;
   }
  }
}
