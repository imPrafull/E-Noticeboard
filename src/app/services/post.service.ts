import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { createdBy } from '../shared/utilities';
import { Storage } from '@ionic/storage';
 
@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = environment.url;
  posts = []
  postsChanged$ = new Subject<any[]>();

  constructor(private http: HttpClient, private storage: Storage) { }

  async fetchPosts() {
    let userDetails = await this.storage.get('user-details');
    let params = new HttpParams();
    params = params.append('groupIds', userDetails.groups.join());
    params = params.append('subgroupIds', userDetails.subgroups.join());
    return this.http.get<Post[]>(`${this.url}/api/posts`, {params: params}).pipe(
      map(res => { 
        const posts: Post[] = [];
        res['posts'].forEach(post => {
          posts.push(createdBy(post));
        });
        return posts;
      })
    ).subscribe(posts => {
      this.posts = posts;
      this.postsChanged$.next(this.posts.slice());
    });
  }

  createPost(post: Post) {
    this.http.post(`${this.url}/api/posts`, post).subscribe(response => {
      this.posts.push(createdBy(response['post']));
      this.postsChanged$.next(this.posts.slice());
    });
  }

  getPosts() {
    return this.posts.slice();
  }

  getPostById(id: string) {
    return this.posts.find(post => post._id === id);
  }

}
