import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubgroupDetailPage } from './subgroup-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SubgroupDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubgroupDetailPageRoutingModule {}
