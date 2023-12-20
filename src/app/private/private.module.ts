import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PrivateComponent } from './private.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/header/sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, PrivateComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
})
export class PrivateModule {}
