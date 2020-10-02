import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userDetails;

  constructor(
    private authService: AuthService,
    private storage: Storage) { }

  ngOnInit() {
      this.authService.getUserDetails().subscribe(userDetails => {
        this.userDetails = userDetails;
      });
  }

}
