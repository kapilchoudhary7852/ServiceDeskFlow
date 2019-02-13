import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';


@Component({
  selector: 'app-role-create-update',
  templateUrl: './role-create-update.component.html',
  styleUrls: ['./role-create-update.component.css']
})

export class RoleCreateUpdateComponent implements OnInit {

  names =["123",'789',"887777",'99999'];
  roles = []
  editIndex = null;

  roleForm = new FormGroup(
    {
      name:new FormControl(),
      createdBy:new FormControl(),
      description :new FormControl(),
      isActive:new FormControl(),
    }
  )

  addUser()
  {

    if(this.editIndex==null)
    {
      this.roles.push (this.roleForm.value);
    }
    else
    {
      this.roles.pop[this.editIndex]

      this.roles[this.editIndex]=this.roleForm.value;
    }
    
    this.resetRoleForm();
    
  }

  resetRoleForm ()
  {
    this.roleForm.reset();
    this.editIndex = null;
  }

  editRole(index)
  {
    this.roleForm.setValue(this.roles[index]);
    this.editIndex = index;
  }

  deactivateRole(index)
  {
    let user = this.roles[index];
    user.isActive = !user.isActive;
  }

  constructor() { }

  ngOnInit() 
  {

  }

 

}
