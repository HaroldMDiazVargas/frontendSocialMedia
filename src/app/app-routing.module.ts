import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateComponent } from './private/private.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthComponent } from './core/components/auth/auth.component';

const routes: Routes = [
  {
    path: 'private',
    canMatch: [AuthGuard],
    component: PrivateComponent,
    loadChildren: () =>
      import('./private/private.module').then((x) => x.PrivateModule),
  },
  {
    path: '',
    redirectTo: 'private',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
