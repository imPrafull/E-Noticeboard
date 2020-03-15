import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  PostForm: FormGroup;

  constructor(
    private modalCtrl: ModalController, private formBuilder: FormBuilder,
    private postService: PostService
  ) {
    this.PostForm = this.formBuilder.group({
      title: ['', Validators.compose([ Validators.required, Validators.maxLength(100) ])],
      body: ['', Validators.compose([ Validators.required, Validators.maxLength(500) ])]
    });
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async createPost() {
    console.log(this.PostForm.value);
    this.postService.createPost(this.PostForm.value);
    await this.modalCtrl.dismiss();
  }

}
