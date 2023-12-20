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
  private userFullNameSubscription!: Subscription;

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userFullNameSubscription = this.authService.userFullName.subscribe(
      (fullName: string) => (this.userFullName = fullName)
    );
  }

  ngOnDestroy(): void {
    this.userFullNameSubscription.unsubscribe();
  }

  closeSideBar() {
    this.sidebarService.toggle();
  }
}
