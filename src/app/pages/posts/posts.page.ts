import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage {

  constructor(private postService: PostService) {
  }

  ionViewWillEnter() {
    this.postService.fetchPosts();
  }
}
