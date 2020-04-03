import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoginMode: boolean = true;
  credentialsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (!this.credentialsForm.valid) {
      return;
    }
    if (this.isLoginMode) {
      this.authService.login(this.credentialsForm.value).subscribe(() => {
        this.router.navigate(['home'], { replaceUrl: true });
      });
    }
    else {
      this.authService.register(this.credentialsForm.value).subscribe(response => {
        console.log('Registered '+ response);
        this.presentToast(response.toString());
      });
    }
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
