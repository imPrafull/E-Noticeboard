import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
              private platform: Platform, private alertController: AlertController, private router: Router) {
    
  }

  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials);
  }

  autoLogin() {
    this.storage.get(TOKEN).then(token => {
      if(!token) {
        return; 
      }
      this.authenticationState.next(true);
      this.user = this.helper.decodeToken(token);
      const expirationDuration =
        new Date(this.helper.getTokenExpirationDate(token)).getTime() -
        new Date().getTime();
        this.autoLogout(expirationDuration);
    });
  }

  login(credentials) {
    return this.http.post(`${this.url}/api/login`, credentials).pipe(
      tap(res => {
        this.authenticationState.next(true);
        this.user = this.helper.decodeToken(res['token']);
        const expirationDuration =
        new Date(this.helper.getTokenExpirationDate(res['token'])).getTime() -
        new Date().getTime();
        this.autoLogout(expirationDuration);
        this.storage.set(TOKEN, res['token']);
      })
    );
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.authenticationState.next(false);
    this.router.navigate(['/login']);
    this.storage.remove(TOKEN);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  getUserDetails() {
    let params = new HttpParams();
    params = params.append('userid', this.user.id);
    return this.http.get(`${this.url}/api/userDetails`, { params: params })
      .pipe(
        map(response => {
          let userDetails = response['userDetails']
          this.storage.set('user-details', userDetails)
          return userDetails;
        })
      );
  }

  async showAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.present();
  }

}
