import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from '../../services/post.service';
import { IPost } from '../../models';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
})
export class StartPostComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  userFullName = '';
  private userFullNameSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.userFullNameSubscription = this.authService.userFullName.subscribe(
      (fullName: string) => (this.userFullName = fullName)
    );
  }

  ngOnDestroy(): void {
    this.userFullNameSubscription.unsubscribe();
  }

  onPost() {
    if (!this.form.valid) return;
    const body = this.form.value['body'];
    this.postService.createPost(body).subscribe((post: IPost) => {
      this.postService.allLoadedPosts.unshift(post);
      this.form.reset('');
    });
  }
}
