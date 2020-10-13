import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  PostForm: FormGroup;
  userDetails: any;
  openDropdown: boolean = false;
  dropdownList;
  group = null;
  subgroup = null;
  prevChecked: any;

  constructor(
    private modalCtrl: ModalController, private formBuilder: FormBuilder, private storage: Storage, 
    private postService: PostService, private authService: AuthService, private groupService: GroupsService
  ) {
    this.PostForm = this.formBuilder.group({
      title: ['', Validators.compose([ Validators.required, Validators.maxLength(100) ])],
      body: ['', Validators.compose([ Validators.required, Validators.maxLength(500) ])],
      shareType: ['subgroup', Validators.required]
    });
  }

  ngOnInit() {
    this.getUserDetails();
  }

  async getUserDetails() {
    this.userDetails = await this.storage.get('user-details');
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async createPost() {
    let post, shareType
    ({ shareType, ...post} = this.PostForm.value);
    const postBody = {
      ...post,
      createdBy: this.authService.user['id'],
      groupId: this.group && this.group._id,
      subgroupId: this.subgroup && this.subgroup._id
    };
    this.postService.createPost(postBody);
    await this.modalCtrl.dismiss();
  }

  dropdown() {
    if (this.openDropdown) {
      this.openDropdown = false;
    }
    else {
      if (this.PostForm.value.shareType == 'group') {
        this.groupService.getGroupsByUserid(this.authService.user['id']).subscribe(groups => {
          this.openDropdown = true;
          this.dropdownList = groups;
        })
      }
      else {
        this.groupService.getsubgroupsByUserid(this.authService.user['id']).subscribe(groups => {
          this.openDropdown = true;
          this.dropdownList = groups;
        })
      }
    }
  }

  itemSelected(group) {
    this.PostForm.value.shareType == 'subgroup' ? this.subgroup = group : this.group = group;
    this.openDropdown = false;
  }

  radioChange(event) {
    if (event.target.value != this.prevChecked) {
      this.openDropdown = false;
    }
    this.prevChecked = event.target.value;
  }

}
