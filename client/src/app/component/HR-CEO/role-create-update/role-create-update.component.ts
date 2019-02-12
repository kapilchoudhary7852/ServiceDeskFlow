import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';


@Component({
  selector: 'app-role-create-update',
  templateUrl: './role-create-update.component.html',
  styleUrls: ['./role-create-update.component.css']
})

export class RoleCreateUpdateComponent implements OnInit {

  roleForm = new FormGroup(
    {
      name:new FormControl(),
      isActive:new FormControl(),
    }
  )

  addUser()
  {

  }

  constructor() { }

  ngOnInit() 
  {

  }

 

}
