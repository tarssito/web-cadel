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
  authenticated = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.authenticated = true;
      return;
    }
    this.authenticated = false;
  }

  logout() {
    // this.loading = true;
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
