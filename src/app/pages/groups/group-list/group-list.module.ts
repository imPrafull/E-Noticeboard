import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupListPageRoutingModule } from './group-list-routing.module';
import { SharedDirectives } from '../../../directives/shared-directives.module';

import { GroupListPage } from './group-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedDirectives,
    GroupListPageRoutingModule
  ],
  declarations: [GroupListPage]
})
export class GroupListPageModule {}
