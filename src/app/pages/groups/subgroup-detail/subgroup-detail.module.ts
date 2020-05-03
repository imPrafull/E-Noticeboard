import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubgroupDetailPageRoutingModule } from './subgroup-detail-routing.module';

import { SubgroupDetailPage } from './subgroup-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubgroupDetailPageRoutingModule
  ],
  declarations: [SubgroupDetailPage]
})
export class SubgroupDetailPageModule {}
