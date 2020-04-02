import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { CreatePostPage } from 'src/app/modals/create-post/create-post.page';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {

  posts: Post[] = [];
  subscription: Subscription;

  constructor
  (
    private modalCtrl: ModalController, private postService: PostService, private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.postService.fetchPosts();
    this.subscription = this.postService.postsChanged$.subscribe(posts => {
      this.posts = posts;
    });
  }

  async createPost() {
    const createPostModal = await this.modalCtrl.create({
      component: CreatePostPage
    });
    return await createPostModal.present();
  }

  onPostClick(postId) {
    this.router.navigate(['menu', 'posts', postId]);
  }

}
