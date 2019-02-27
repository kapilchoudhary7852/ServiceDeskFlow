import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Ent = environment;
  constructor(private router: Router) { }
  
  ngOnInit() {}
  Mylisting(){
    this.router.navigateByUrl('/Mylisting/true');
  }
}