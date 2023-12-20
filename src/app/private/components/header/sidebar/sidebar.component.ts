import { Component } from '@angular/core';
import { SidebarService } from 'src/app/private/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public sidebarService: SidebarService) {}

  closeSideBar() {
    this.sidebarService.toggle();
  }
}
