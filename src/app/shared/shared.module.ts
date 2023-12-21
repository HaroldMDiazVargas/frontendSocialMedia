import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule],
  exports: [FormsModule, RouterModule, HttpClientModule, CommonModule],
})
export class SharedModule {}
