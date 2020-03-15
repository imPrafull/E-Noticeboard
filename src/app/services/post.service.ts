import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = environment.url;
  private postsChanged$ = new Subject<void>();

  get postsChanged() {
    return this.postsChanged$;
  }

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(`${this.url}/api/posts`).pipe(
      map(res => {
        return res['posts'];
      })
    );
  }

  createPost(post: Post) {
    this.http.post(`${this.url}/api/posts`, post).pipe(
      tap(() => {
        this.postsChanged$.next();
      })
    )
    .subscribe();
  }

}
