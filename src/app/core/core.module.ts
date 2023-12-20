import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from './services/token.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  exports: [HomeComponent],
  providers: [AuthService, TokenService],
})
export class CoreModule {}
