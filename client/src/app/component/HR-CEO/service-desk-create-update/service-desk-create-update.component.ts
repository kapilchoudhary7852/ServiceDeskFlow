import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ServicedescService } from '../../../service/servicedesc.service';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../model/user';
import { ServiceDesk } from '../../../model/ServiceDesk';
@Component({
  selector: 'app-service-desk-create-update',
  templateUrl: './service-desk-create-update.component.html',
  styleUrls: ['./service-desk-create-update.component.css']
})
export class ServiceDeskCreateUpdateComponent implements OnInit {
  submitted = false;
  createForm: FormGroup;
  servicemanager : string;
  primaryauthority : string;
  secondaryauthority : string;
  users :  User[];
  servicedesks :  ServiceDesk[];
  
  CreatedBy: string ='5c63a65dda007e1474b2b5cc';;
  Description:string ='NoNeed';
  _id = null;
  constructor(private formBuilder: FormBuilder,private UserService: UserService, private serviceDescService: ServicedescService, private route: Router) { }
  ngOnInit() {
    this.createForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      AssignedReminder: ['', [Validators.required]],
      CreatedBy: ['5c63a65dda007e1474b2b5cc'],
      servicemanager: ['', [Validators.required]],
      primaryauthority: ['', [Validators.required]],
      secondaryauthority: ['',[Validators.required]],
      Description: ['NoNeed'],
      IsActive: ['', [Validators.required]],
    });
    this.getUsers();
    this.getServiceDesks();
  }
  get f() { return this.createForm.controls; }
  getUsers() {
    this.UserService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  getServiceDesks() {
    this.serviceDescService.getServiceDesks().subscribe(data => {
      this.servicedesks = data;
    });
  }
  resetData(){
    this.createForm.reset();
    this._id = null;
  }
  editData(data)
  {
    this._id = data._id;
    this.createForm = this.formBuilder.group({
      Name: [data.Name, [Validators.required]],
      AssignedReminder: [data.AssignedReminder, [Validators.required]],
      CreatedBy: ['5c63a65dda007e1474b2b5cc'],
      Description: ['NoNeed'],
      servicemanager: [data.servicemanager, [Validators.required]],
      primaryauthority: [data.primaryauthority, [Validators.required]],
      secondaryauthority: [data.secondaryauthority,[Validators.required]],
      IsActive: [data.IsActive, [Validators.required]],
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
      if(this._id == null){
      this.serviceDescService.createServiceDesk(this.createForm.value).subscribe(res => {
        this.getUsers();
       this.getServiceDesks();
        this.route.navigateByUrl('/home');
       });
      }
      else{
        this.serviceDescService.updateServiceDesk(this._id, this.createForm.value).subscribe(res => {
          this.getUsers();
          this.getServiceDesks();
          this.route.navigateByUrl('/home');
        });
       }
    }
  }
  getSelected(id,val) {
   if(id!=null){
     if(val==1 )
         this.servicemanager = id;
     if(val==2 )
         this.primaryauthority = id;
     if(val==3 )
         this.secondaryauthority = id;
   }
  }
}
