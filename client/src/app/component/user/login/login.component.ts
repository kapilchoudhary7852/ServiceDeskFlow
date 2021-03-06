import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Route, Router } from '@angular/router';
import { RolesEnum } from '../../../Common/Enum/RolesEnum';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { User } from '../../../model/user';
import { ServicedescService } from '../../../service/servicedesc.service';
import { ServiceDesk } from '../../../model/ServiceDesk';
import { UserAccessService } from 'src/app/service/user-access.service';
import { UserAccess } from '../../../model/UserAccess';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  createForm: FormGroup;
  Ent = environment;
  user : User;
  servicedesks :  ServiceDesk[]=[];
  userAccess : UserAccess[]=[];
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private UserAccessService: UserAccessService,private serviceDescService: ServicedescService, private route: Router) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      UserId: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }
  Remove(){
    localStorage.clear();
  }
  onSubmit() {
    if (this.createForm.invalid) {
      return;
    } else {
      this.userService.getSession(this.createForm.get('UserId').value+'_'+this.createForm.get('Password').value).subscribe(res => {
      this.user= res;
      this.user.ServiceDeskId = [];
      if(res[0].RoleId == RolesEnum.HRCEO){
        this.serviceDescService.getServiceDesks().subscribe(Y => {
          this.servicedesks= Y;    
          this.user.ServiceDeskId = [];
           for(let n of this.servicedesks){
              this.user.ServiceDeskId.push(n._id);
            }
          localStorage.setItem('ServiceDesk', JSON.stringify(this.user.ServiceDeskId));
          localStorage.setItem('IsEmploye', JSON.stringify('false'));
          localStorage.setItem('User', JSON.stringify(this.user));
          location.reload();
          return this.route.navigateByUrl('dashboard');
         });
      }
      else if(res[0].RoleId == RolesEnum.Employee){
        this.user.ServiceDeskId.push('5c78efca7b22c61ff466543d');
        localStorage.setItem('IsEmploye', JSON.stringify('true'));
        localStorage.setItem('ServiceDesk', JSON.stringify(this.user.ServiceDeskId));
        localStorage.setItem('User', JSON.stringify(this.user));
        location.reload();
        return this.route.navigateByUrl('dashboard');
      }
      else{
        this.UserAccessService.getUserAccessByUserId(res[0]._id).subscribe(X => {
          this.userAccess= X;
           for(let n of this.userAccess){
             this.user.ServiceDeskId.push(n.ServiceDeskId);
           }
           localStorage.setItem('ServiceDesk', JSON.stringify(this.user.ServiceDeskId));
           localStorage.setItem('IsEmploye', JSON.stringify('false'));
           localStorage.setItem('User', JSON.stringify(this.user));
           location.reload();
           return this.route.navigateByUrl('dashboard');
        });
       }
      });
    }
  }
}
