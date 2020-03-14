import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePostPage } from 'src/app/modals/create-post/create-post.page';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts = [
    {
      title: 'First Post',
      body: 'This is my first post and i am exciited'
    },
    {
      title: 'Second Post',
      body: 'This is my second post'
    }
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async createPost() {
    const createPostModal = await this.modalCtrl.create({
      component: CreatePostPage
    });
    return await createPostModal.present();
  }

}
