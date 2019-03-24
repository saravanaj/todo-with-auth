import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private commonService: CommonService, private router: Router) { }
  private isAuthenticated;
  private username;
  ngOnInit() {
    this.commonService.loginChangeEmitter.subscribe((tokenInfo) => {
      this.username = tokenInfo.username;
      this.isAuthenticated = tokenInfo.isAuthenticated;
      if (tokenInfo.isAuthenticated) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['login']);
      }
    });
    this.commonService.checkToken();
  }

  logout() {
    this.commonService.clearToken();
  }

}
