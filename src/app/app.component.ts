import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  pages = [
    {
      title: 'Home',
      url: 'home'
    },
    {
      title: 'Posts',
      url: 'posts'
    },
    {
      title: 'Groups',
      url: 'groups'
    }
  ];

  constructor(
    private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private authService: AuthService,
    private router: Router, private menuController: MenuController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.authService.autoLogin();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }
  
  logout() {
    this.authService.logout();
    this.menuController.close();
  }
}
