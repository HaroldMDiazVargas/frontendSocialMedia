import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-public',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('f') form!: NgForm;

  submissionType: 'login' | 'join' = 'join';

  toggleText() {
    this.submissionType = this.submissionType === 'login' ? 'join' : 'login';
  }
}
