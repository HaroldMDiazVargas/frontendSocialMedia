import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarService } from 'src/app/private/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  userFullName = '';
  userAge = 0;
  private userFullNameSubscription!: Subscription;
  private userAgeSubscription!: Subscription;

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userFullNameSubscription = this.authService.userFullName.subscribe(
      (fullName: string) => (this.userFullName = fullName)
    );
    this.userAgeSubscription = this.authService.userAge.subscribe(
      (age: number) => (this.userAge = age)
    );
  }

  ngOnDestroy(): void {
    this.userFullNameSubscription.unsubscribe();
    this.userAgeSubscription.unsubscribe();
  }

  closeSideBar() {
    this.sidebarService.toggle();
  }

  logout() {
    this.sidebarService.toggle();
    this.authService.logout();
  }
}
