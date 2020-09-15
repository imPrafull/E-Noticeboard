import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';
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
  message: { [key: string]: string } = {};

  private validationMessages: {
    [key: string]: { [key: string]: string };
  };

  constructor(
    private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private toastController: ToastController, private menuController: MenuController
  ) {
    this.validationMessages = {
      email: {
        required: "Please enter your Email ",
        email: "Please enter a valid Email Address"
      },
      password: {
        required: "Please enter a Password",
        minLength: "Password should contain atleast 6 characters"
      }
    }
  }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  invalidInputs(formgroup: FormGroup): { [key: string]: string } {
    let messages = {};
    for (const input in formgroup.controls) {
      const control = formgroup.controls[input];
      if (this.validationMessages[input]) {
        messages[input] = '';
        if (control.errors && (control.dirty || control.touched || control.pristine)) {
          Object.keys(control.errors).map(messageKey => {
            if (this.validationMessages[input][messageKey]) {
              messages[input] = this.validationMessages[input][messageKey];
            }
          });
        }
      }
    }
    return messages;
  }

  onSubmit() {
    if (!this.credentialsForm.valid) {
      this.message = this.invalidInputs(this.credentialsForm);
      return;
    }
    if (this.isLoginMode) {
      this.authService.login(this.credentialsForm.value).subscribe(() => {
        this.router.navigate(['home'], { replaceUrl: true });
      });
    }
    else {
      this.authService.register(this.credentialsForm.value).subscribe(response => {
        console.log('Registered ' + response);
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

  ionViewWillLeave() {
    this.menuController.enable(true);
  }

}
