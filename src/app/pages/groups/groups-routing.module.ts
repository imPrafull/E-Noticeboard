import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsPage } from './groups.page';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage,
    children: [
      { 
        path: '', 
        redirectTo: 'group-list' 
      },
      {
        path: 'group-list',
        loadChildren: () => import('./group-list/group-list.module').then( m => m.GroupListPageModule),
        canActivate: [AuthGuardService]
      },
      { 
        path: ':id', 
        loadChildren: () => import('../groups/group-detail/group-detail.module').then( m => m.GroupDetailPageModule),
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
