import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { DatePipe } from '@angular/common';
import { RolesEnum } from '../../../Common/Enum/RolesEnum';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateForm: FormGroup;
  submitted: Boolean = false;
  userId: string = null;
  roles: {id: number; name: string}[] = [];
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private datePipe: DatePipe, private userService: UserService) {
  }

  ngOnInit() {
    if(localStorage.getItem('User') == null)
      return this.router.navigateByUrl('login');
    for(var n in RolesEnum) {
      if (typeof RolesEnum[n] === 'number') {
          this.roles.push({id: <any>RolesEnum[n], name: n});
        }
    }
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.userId).subscribe(result => {
      this.updateForm = this.formBuilder.group({
        UserId: [result.UserId, [Validators.required]],
        Fname: [result.Fname, [Validators.required]],
        Lname: [result.Lname, [Validators.required]],
        RoleId: [result.RoleId, Validators.required]
      });
    });
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    } else {
      console.log(this.updateForm.value);
      this.userService.updateUser(this.userId, this.updateForm.value).subscribe(res => {
        this.router.navigateByUrl('/home');
      });
    }
  }
}
