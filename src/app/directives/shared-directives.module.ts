import { NgModule } from '@angular/core';
import { HideIfUnauthorizedDirective } from './hide-if-unauthorized.directive';

@NgModule({
    imports: [],
    declarations: [HideIfUnauthorizedDirective],
    exports: [HideIfUnauthorizedDirective]
})
   
export class SharedDirectives{}