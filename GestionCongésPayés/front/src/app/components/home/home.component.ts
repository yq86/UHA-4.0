import { Component, OnInit } from '@angular/core';
import { Payload } from 'src/app/models/payload';
import decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role!: number;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const pl: Payload = decode(token);
      this.role = pl.role;
    }
  }

  redirect(roler: number) {
    if (roler == 1) {
      this.router.navigate(['admin']);
    } else if(roler == 2) {
      this.router.navigate(['manager']);
    } else if(roler == 3) {
      this.router.navigate(['employee-demandes']);
    }
  }
}
