import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubgroupDetailPageRoutingModule } from './subgroup-detail-routing.module';
import { SubgroupDetailPage } from './subgroup-detail.page';
import { SharedDirectives } from 'src/app/directives/shared-directives.module';


@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedDirectives,
    SubgroupDetailPageRoutingModule
  ],
  declarations: [SubgroupDetailPage]
})
export class SubgroupDetailPageModule {}
