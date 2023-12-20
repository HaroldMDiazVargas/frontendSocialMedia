import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
})
export class StartPostComponent implements OnInit, OnDestroy {
  userFullName = '';
  private userFullNameSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userFullNameSubscription = this.authService.userFullName.subscribe(
      (fullName: string) => (this.userFullName = fullName)
    );
  }

  ngOnDestroy(): void {
    this.userFullNameSubscription.unsubscribe();
  }
}
