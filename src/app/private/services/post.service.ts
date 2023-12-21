import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';
import { IPost } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl: string = environment.apiUrl + '/post';
  allLoadedPosts: IPost[] = [];

  constructor(private http: HttpClient) {}

  getSelectedPosts(params: string) {
    return this.http.get<IPost[]>(this.baseUrl + params);
  }

  createPost(body: string) {
    return this.http.post<IPost>(this.baseUrl, { body }).pipe(take(1));
  }

  updatePost(id: number, body: string) {
    return this.http
      .put<IPost>(`${this.baseUrl}/${id}`, { body })
      .pipe(take(1));
  }

  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(take(1));
  }
}
