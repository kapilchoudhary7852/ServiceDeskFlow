import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateForm: FormGroup;
  submitted: Boolean = false;
  userId: string = null;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private datePipe: DatePipe, private userService: UserService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.userId).subscribe(result => {
      this.updateForm = this.formBuilder.group({
        Fname: [result.Fname, [Validators.required]],
        Lane: [result.Lname, [Validators.required]],
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
      console.log(this.updateForm.controls['dob'].value);
      this.userService.updateUser(this.userId, this.updateForm.value).subscribe(res => {
        this.router.navigateByUrl('/home');
      });
    }
  }
}
