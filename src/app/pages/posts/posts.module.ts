import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPage } from './posts.page';
import { PostsPageRoutingModule } from './posts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule
  ],
  declarations: [PostsPage]
})
export class PostsPageModule {}
