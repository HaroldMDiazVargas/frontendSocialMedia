import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from '../../services/post.service';
import { BehaviorSubject, Subscription, map, take } from 'rxjs';
import { IPost } from '../../models';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  private userSubscription!: Subscription;
  userId$ = new BehaviorSubject<number>(0);
  userFullName = '';
  numberOfPosts = 5;
  skipPosts = 0;
  allCurrentUpdatePosts: number[] = [];
  queryParams = '';
  endPosts = false;

  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getPosts();
    this.authService.userId
      .pipe(take(1))
      .subscribe((userId: number) => this.userId$.next(userId));
    this.authService.userFullName
      .pipe(take(1))
      .subscribe((userFullName: string) => (this.userFullName = userFullName));
  }

  onNearEndScroll(): void {
    this.getPosts();
  }

  getPosts() {
    this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;
    if (!this.endPosts)
      this.postService.getSelectedPosts(this.queryParams).subscribe({
        next: (posts: IPost[]) => {
          for (let index = 0; index < posts.length; index++) {
            this.postService.allLoadedPosts.push(posts[index]);
          }
          this.skipPosts = this.skipPosts + 5;
          this.endPosts = posts.length == 0;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  togglePost(id: number) {
    this.allCurrentUpdatePosts.push(id);
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: (result) => {
        this.postService.allLoadedPosts =
          this.postService.allLoadedPosts.filter((post) => post.id !== id);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  discardChanges(postId: number) {
    this.allCurrentUpdatePosts = this.allCurrentUpdatePosts.filter(
      (id) => id !== postId
    );
  }

  updatePost(id: number, body: string) {
    this.postService
      .updatePost(id, body)
      .pipe(
        map((updatedPost: IPost) => {
          const indx = this.postService.allLoadedPosts.findIndex(
            (post) => post.id === updatedPost.id
          );
          this.postService.allLoadedPosts[indx] = updatedPost;
          this.allCurrentUpdatePosts = this.allCurrentUpdatePosts.filter(
            (postId) => postId !== id
          );
        })
      )
      .subscribe();
  }
}
