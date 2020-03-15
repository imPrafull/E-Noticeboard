import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePostPage } from 'src/app/modals/create-post/create-post.page';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: Post[] = [];

  constructor(private modalCtrl: ModalController, private postService: PostService) { }

  ngOnInit() {
    this.postService.postsChanged.subscribe(() => {
      this.getAllPosts();
    });
    this.getAllPosts();
  }

  private getAllPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  async createPost() {
    const createPostModal = await this.modalCtrl.create({
      component: CreatePostPage
    });
    return await createPostModal.present();
  }

}
