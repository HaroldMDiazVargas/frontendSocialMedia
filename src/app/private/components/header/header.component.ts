import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  openUserDetails = false;
  mobileMenu = false;

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
  }
}
