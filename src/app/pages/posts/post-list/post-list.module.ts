import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostListPageRoutingModule } from './post-list-routing.module';
import { SharedDirectives } from '../../../directives/shared-directives.module';

import { PostListPage } from './post-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedDirectives,
    PostListPageRoutingModule
  ],
  declarations: [PostListPage]
})
export class PostListPageModule {}
