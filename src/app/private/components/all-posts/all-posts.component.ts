import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from '../../services/post.service';
import { BehaviorSubject, Subscription, take } from 'rxjs';
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

  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getPosts(false);
    this.authService.userId
      .pipe(take(1))
      .subscribe((userId: number) => this.userId$.next(userId));
    this.authService.userFullName
      .pipe(take(1))
      .subscribe((userFullName: string) => (this.userFullName = userFullName));
  }

  getPosts(isInitialLoad: boolean) {
    // if (this.skipPosts === 20) ev.target.disabled = true;
    this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;
    const posts = this.postService
      .getSelectedPosts(this.queryParams)
      .subscribe({
        next: (posts: IPost[]) => {
          for (let index = 0; index < posts.length; index++) {
            this.postService.allLoadedPosts.push(posts[index]);
          }
          this.skipPosts = this.skipPosts + 5;
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

  discardChanges(id: number) {
    this.allCurrentUpdatePosts = this.allCurrentUpdatePosts.filter(
      (id) => id !== id
    );
  }

  // updatePost(id: number, body: string){
  //   this.postService.updatePost(id, body).subscribe((next) => {
  //     const indx = this.postService.allLoadedPosts.findIndex(post => post.id === postToUpdate.id);
  //         this.postService.allLoadedPosts[indx].body = newBody;
  //   })
  //   // this.postService.createPost(body).subscribe((post: IPost) => {
  //   //   this.postService.allLoadedPosts.unshift(post);
  //   //   this.form.reset('');
  //   // });
  // }
}
