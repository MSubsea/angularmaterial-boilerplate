import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../modules/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isScreenSmall!:boolean;
  users!: Observable<User[]>;
  constructor(private breakpointObserver:BreakpointObserver,
    private userService:UserService,
    private router:Router) {

  }

  @ViewChild(MatSidenav)sidenav!:MatSidenav;

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall])
    .subscribe((state:BreakpointState) => {
      this.isScreenSmall = state.matches;
    })
    this.users = this.userService.users;
    this.userService.loadUsers();
    this.users.subscribe(data =>{
      // console.log(data)
      if (data.length > 0) this.router.navigate(['/contactmanager', data[0].id]);
    });
    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    })
  }
}
