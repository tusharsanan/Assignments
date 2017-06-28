import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ '../scss/module-styles.css' ],
})
export class DashboardComponent implements OnInit {
  constructor(private user: UserService){}
  ngOnInit() {
    
  }
}
