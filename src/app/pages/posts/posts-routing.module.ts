import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsPage } from './posts.page';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PostsPage,
    children: [
      { 
        path: '',
        redirectTo: 'post-list'
      },
      {
        path: 'post-list',
        loadChildren: () => import('./post-list/post-list.module').then( m => m.PostListPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: ':id',
        loadChildren: () => import('./post-detail/post-detail.module').then( m => m.PostDetailPageModule),
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsPageRoutingModule {}
