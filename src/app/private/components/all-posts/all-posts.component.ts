import {
  Component,
  HostListener,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
  @Input() searchFilter?: string;

  userId$ = new BehaviorSubject<number>(0);
  userFullName = '';
  numberOfPosts = 5;
  skipPosts = 0;
  pattern = '';
  allCurrentUpdatePosts: number[] = [];
  queryParams = '';
  endPosts = false;

  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getPosts(true);
    this.authService.userId
      .pipe(take(1))
      .subscribe((userId: number) => this.userId$.next(userId));
    this.authService.userFullName
      .pipe(take(1))
      .subscribe((userFullName: string) => (this.userFullName = userFullName));
  }

  ngOnChanges(changes: SimpleChanges) {
    //Detect the input variable changes
    this.pattern = changes['searchFilter'].currentValue;
    this.numberOfPosts = 5;
    this.skipPosts = 0;
    this.endPosts = false;
    this.getPosts(true);
  }

  onNearEndScroll(): void {
    this.getPosts(false);
  }

  getPosts(initilizate: boolean) {
    this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;
    if (this.pattern)
      this.queryParams = `${this.queryParams}&pattern=${this.pattern}`;
    if (!this.endPosts) {
      this.postService.getSelectedPosts(this.queryParams).subscribe({
        next: (posts: IPost[]) => {
          if (initilizate) this.postService.allLoadedPosts = posts;
          else this.postService.allLoadedPosts.push(...posts);
          this.skipPosts = this.skipPosts + 5;
          this.endPosts = posts.length == 0;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
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
