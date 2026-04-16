import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-sign-up-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');
  protected readonly usernameState = signal<'idle' | 'checking' | 'available' | 'taken'>('idle');
  protected readonly usernameHint = signal('');
  protected readonly passwordMismatch = computed(() => {
    const confirmPassword = this.form.controls.confirmPassword;
    return confirmPassword.touched && this.form.hasError('passwordMismatch');
  });

  protected readonly form = this.formBuilder.nonNullable.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9._-]+$/)]
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    },
    { validators: passwordsMatchValidator }
  );

  protected checkUsernameAvailability(): void {
    const username = this.form.controls.username.value.trim();

    if (!username || this.form.controls.username.invalid) {
      this.usernameState.set('idle');
      this.usernameHint.set('');
      return;
    }

    this.usernameState.set('checking');
    this.usernameHint.set('Checking username availability...');

    this.authService.checkUsernameAvailability(username).subscribe({
      next: (response) => {
        if (this.form.controls.username.value.trim() !== username) {
          return;
        }

        this.usernameState.set(response.available ? 'available' : 'taken');
        this.usernameHint.set(response.message);
      },
      error: () => {
        this.usernameState.set('idle');
        this.usernameHint.set('Unable to verify the username right now.');
      }
    });
  }

  protected clearUsernameState(): void {
    if (this.usernameState() === 'idle' && !this.usernameHint()) {
      return;
    }

    this.usernameState.set('idle');
    this.usernameHint.set('');
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.signup(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.successMessage.set(response.message);
        this.form.reset({
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmPassword: '',
          mobileNumber: ''
        });
        this.usernameState.set('idle');
        this.usernameHint.set('');
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(error.error?.message ?? 'Unable to create the account right now.');
      }
    });
  }
}
