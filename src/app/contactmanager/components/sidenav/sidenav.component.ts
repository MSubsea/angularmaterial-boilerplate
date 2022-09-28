import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
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
  constructor(private breakpointObserver:BreakpointObserver, private userService:UserService) {

  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall])
    .subscribe((state:BreakpointState) => {
      this.isScreenSmall = state.matches;
    })
    this.users = this.userService.users;
    this.userService.loadUsers();
    this.users.subscribe(data =>{
      console.log(data)
    })
  }
}
