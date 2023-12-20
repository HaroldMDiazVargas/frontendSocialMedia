import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';
import { IPost } from './../../../../../backend/src/post/models/post.inteface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl: string = environment.apiUrl + '/feed';

  constructor(private http: HttpClient) {}

  getSelectedPosts(params: string) {
    return this.http.get<IPost[]>(this.baseUrl + params);
  }

  createPost(body: string) {
    return this.http.post<IPost>(this.baseUrl, { body }).pipe(take(1));
  }

  updatePost(id: number, body: string) {
    return this.http.put(`${this.baseUrl}/${id}`, { body }).pipe(take(1));
  }

  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(take(1));
  }
}
