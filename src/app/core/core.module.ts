import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule],
  exports: [AuthComponent],
  providers: [AuthService, TokenService],
})
export class CoreModule {}
