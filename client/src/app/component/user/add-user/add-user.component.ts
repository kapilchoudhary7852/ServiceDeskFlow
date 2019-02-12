import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  submitted = false;

  createForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      dob: [, Validators.required]
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
        this.route.navigateByUrl('/home');
      });
    }
  }
}
