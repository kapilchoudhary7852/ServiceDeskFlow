import { Component, OnInit, OnChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ServicedescService } from '../../../service/servicedesc.service';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../model/user';
import { ServiceDesk } from '../../../model/ServiceDesk';
import { UserAccessService } from 'src/app/service/user-access.service';
import { UserAccess } from '../../../model/UserAccess';
import { RolesEnum } from '../../../Common/Enum/RolesEnum';
@Component({
  selector: 'app-service-desk-create-update',
  templateUrl: './service-desk-create-update.component.html',
  styleUrls: ['./service-desk-create-update.component.css'],
})
export class ServiceDeskCreateUpdateComponent implements OnInit {
 
  submitted = false;
  createForm: FormGroup;
  users :  User[]=[];
  userAccess :  UserAccess[]=[];
  servicedesks :  ServiceDesk[]=[];
  servicedesk: ServiceDesk ;
  dropdownList = [];
  selectedItemManager : User[]=[];
  selectedItemIRA : User[]=[];
  selectedItemSecondary : User[]=[];
  dropdownSettings = {};
  CreatedBy: string ='5c63a65dda007e1474b2b5cc';;
  Description:string ='NoNeed';
  _id = null;
  userM :  User[];
  userP :  User[];
  userS :  User[];
  isEdit : boolean = false;
  constructor(private formBuilder: FormBuilder,private UserAccessService: UserAccessService,private UserService: UserService, private serviceDescService: ServicedescService, private route: Router) { }
  ngOnInit() {
    this.createForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      AssignedReminder: ['', [Validators.required]],
      CreatedBy: ['5c63a65dda007e1474b2b5cc'],
      selectedManager: ['',[Validators.required]],
      selectedIRA: ['',[Validators.required]],
      selectedSecondary: ['',[Validators.required]],
      Description: ['NoNeed'],
      IsActive: ['true'],
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'Fname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.getUsers();
    this.getServiceDesks();

    this.UserAccessService.getUserAccesss().subscribe(data=>{
     this.userAccess = data;
     for (let ds of this.servicedesks){
         ds.servicemanager = [];
         for (let ua of this.userAccess){
            for (let u of this.userM){
              if(ds._id === ua.ServiceDeskId){
                if(ua.UserId === u._id)
                 ds.servicemanager.push(u.Fname+' '+u.Lname);
             }
          }
        }
       }
       for (let ds of this.servicedesks){
        ds.primaryauthority = [];
        for (let ua of this.userAccess){
          for (let u of this.userP){
            if(ds._id === ua.ServiceDeskId){
              if(ua.UserId === u._id)
               ds.primaryauthority.push(u.Fname+' '+u.Lname);
           }
        }
      }
     }
     for (let ds of this.servicedesks){
      ds.secondaryauthority = [];
      for (let ua of this.userAccess){
        for (let u of this.userS){
          if(ds._id === ua.ServiceDeskId){
            if(ua.UserId === u._id)
             ds.secondaryauthority.push(u.Fname+' '+u.Lname);
         }
      }
    }
   }
      });

  }
  get f() { return this.createForm.controls; }
  onItemSelect(item: any,val : any) {
    if(item!=null){
      if(val==1 ){
          this.selectedItemManager.concat(item);}
      if(val==2 )
          this.selectedItemIRA.concat(item);
      if(val==3 )
          this.selectedItemSecondary.concat(item);
    }
    console.log(this.selectedItemManager);
  }
  onSelectAll(items: any,val : any) {
    if(items!=null){
      if(val==1 )
          {
            this.selectedItemManager = null;
            this.selectedItemManager = items;
          }
      if(val==2 )
          {
            this.selectedItemIRA = null;
            this.selectedItemIRA= items;
          }
      if(val==3 )
          {
            this.selectedItemSecondary = null;
            this.selectedItemSecondary= items;
          }
    }
    console.log(this.selectedItemManager);
  }
  editRow(data,val)
  {
    this.isEdit = true;
    this._id = data._id;
    if(val==0){
       data.IsActive=false;
       this.serviceDescService.updateServiceDesk(this._id, data).subscribe(res => {
        location.reload();
      });
    }
    else{
      this.createForm = this.formBuilder.group({
        Name: ['', [Validators.required]],
        AssignedReminder: ['', [Validators.required]],
        CreatedBy: ['5c63a65dda007e1474b2b5cc'],
        selectedManager: ['',[Validators.required]],
        selectedIRA: ['',[Validators.required]],
        selectedSecondary: ['',[Validators.required]],
        Description: ['NoNeed'],
        IsActive: ['true'],
      });
      this.getUsers();
      this.serviceDescService.getServiceDesk(data._id).subscribe(data=>{
        this.servicedesk = data;
      });
      this.UserAccessService.getUserAccessByServiceDeskId(data._id).subscribe(data=>{
      this.userAccess = data;
      this.selectedItemManager =[];
      this.selectedItemIRA =[];
      this.selectedItemSecondary =[];
      for (let us of this.userM){
          for (let ac of this.userAccess){
            if(ac.UserId === us._id)
             this.selectedItemManager.push(us);
            }
        }
      for (let us of this.userP){
          for (let ac of this.userAccess){
            if(ac.UserId === us._id)
              this.selectedItemIRA.push(us);

            }
                   }
      for (let us of this.userS){
          for (let ac of this.userAccess){
            if(ac.UserId === us._id)
            this.selectedItemSecondary.push(us);
            }
       }
      });
      this.createForm.patchValue({
        Name: this.servicedesk.Name,
        AssignedReminder: this.servicedesk.AssignedReminder,
        CreatedBy: '5c63a65dda007e1474b2b5cc',
        Description: 'NoNeed',
        selectedManager: this.selectedItemManager,
        selectedIRA: this.selectedItemIRA,
        selectedSecondary: this.selectedItemSecondary,
        IsActive:  this.servicedesk.IsActive,
      });  
    }
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
        location.reload();
       });
      }
      else{
        this.serviceDescService.updateServiceDesk(this._id, this.createForm.value).subscribe(res => {
          location.reload();
        });
       }
      
    }
  }
   

  
  resetData(){
    this.createForm.reset();
    this._id = null;
    this.isEdit = false;
  }
  getUsers() {
    this.UserService.getUsers().subscribe(data => {
      this.users = data;
      this.userM = data.filter(x => parseInt(x.RoleId) === RolesEnum.ServiceManager);
      this.userP = data.filter(x => parseInt(x.RoleId) === RolesEnum.PrimaryAuthority);
      this.userS = data.filter(x => parseInt(x.RoleId) === RolesEnum.SecondaryAuthorityAssigner);
    });
  }
  getServiceDesks() {
    this.serviceDescService.getServiceDesks().subscribe(data => {
      this.servicedesks = data;
    });
  }
}