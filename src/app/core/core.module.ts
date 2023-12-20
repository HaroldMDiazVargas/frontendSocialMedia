import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from './services/token.service';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  exports: [AuthComponent],
  providers: [AuthService, TokenService],
})
export class CoreModule {}
