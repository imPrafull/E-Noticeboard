import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { createdBy } from '../shared/utilities';
 
@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = environment.url;
  posts = []
  postsChanged$ = new Subject<any[]>();

  get postsChanged() {
    return this.postsChanged$;
  }

  constructor(private http: HttpClient) { }

  fetchPosts() {
    return this.http.get<Post[]>(`${this.url}/api/posts`).pipe(
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
