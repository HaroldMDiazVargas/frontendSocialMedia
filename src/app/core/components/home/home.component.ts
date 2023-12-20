import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('f') form!: NgForm;

  submissionType: 'login' | 'join' = 'login';

  constructor(private auth: AuthService, private router: Router) {}
  toggleText() {
    this.submissionType = this.submissionType === 'login' ? 'join' : 'login';
  }

  onSubmit() {
    const { email, password } = this.form.value;

    if (this.submissionType === 'login') {
      console.log({ email, password });
      if (!email || !password) return;
      return this.auth
        .login({
          email,
          password,
        })
        .subscribe({
          next: (result) => {
            console.log(result);
            return;
          },
        });
    } else {
      const { firstName, lastName, age } = this.form.value;
      return this.auth
        .register({
          firstName,
          lastName,
          email,
          password,
          age,
        })
        .subscribe({
          next: (result) => {
            this.toggleText();
          },
          error: (e) => {
            console.log(e);
          },
        });
    }
  }
}
