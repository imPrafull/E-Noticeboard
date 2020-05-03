import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupDetailPageRoutingModule } from './group-detail-routing.module';

import { GroupDetailPage } from './group-detail.page';
import { SharedDirectives } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedDirectives,
    GroupDetailPageRoutingModule
  ],
  declarations: [GroupDetailPage]
})
export class GroupDetailPageModule {}
