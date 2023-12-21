import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PrivateComponent } from './private.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/header/sidebar/sidebar.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { StartPostComponent } from './components/start-post/start-post.component';
import { FeedComponent } from './components/feed/feed.component';
import { PrivateRoutingModule } from './private-routing.module';
import { FormsModule } from '@angular/forms';
import { ScrollNearEndDirective } from './directives/scrollNear.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    PrivateComponent,
    SidebarComponent,
    AllPostsComponent,
    StartPostComponent,
    FeedComponent,
    ScrollNearEndDirective,
  ],
  imports: [CommonModule, RouterModule, PrivateRoutingModule, FormsModule],
})
export class PrivateModule {}
