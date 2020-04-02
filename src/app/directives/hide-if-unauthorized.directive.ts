import { Directive, OnInit, Input, ElementRef } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHideIfUnauthorized]'
})
export class HideIfUnauthorizedDirective implements OnInit {

  @Input('appHideIfUnauthorized') role;

  constructor(private authService: AuthService, private el: ElementRef, ) { }

  ngOnInit() {
    if (this.authService.user.role === 'student') {
      this.el.nativeElement.style.display = 'none';
    }
  }

}
