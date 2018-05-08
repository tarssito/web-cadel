import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Services
import { LoginService } from './login/shared/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser = null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  }

  ngOnInit() {
  }

  logout() {
    // this.loading = true;
    this.loginService.logout();
    window.location.href = '/login';
  }

}
