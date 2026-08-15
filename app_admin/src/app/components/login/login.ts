import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from '../../models/user';
import { AuthenticationService } from '../../services/authentication';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  submitting = false;
  errorMessage = '';
  readonly loginForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.authenticationService.login(this.loginForm.getRawValue() as LoginCredentials).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.loginForm.controls.password.reset();
        this.submitting = false;
      }
    });
  }
}
