import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  username!: string;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
      const userid = localStorage.getItem("id");
      const token = localStorage.getItem("accessToken");
      if (userid && token) {
      this.userService.getUserById(userid, token).subscribe((res) => {

        this.username = res.firstName + ' ' + res.lastName;
      })
    }
  }

  ngOnInit(): void {


  }

  signout() {
    this.username = "";
    localStorage.removeItem('id');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    this.router.navigate(['login']);
  }

  redirectHome() {
    this.router.navigate(['home'])
  }
}
