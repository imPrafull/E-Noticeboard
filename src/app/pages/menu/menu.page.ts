import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  selectedPath = '';
  pages = [
    {
      title: 'Home',
      url: '/menu/home'
    },
    {
      title: 'Posts',
      url: '/menu/posts'
    }
  ];

    constructor(private router: Router, private authService: AuthService, private menuController: MenuController) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }
  
  logout() {
    this.authService.logout();
    this.menuController.close();
  }

}
