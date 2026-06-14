import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink, Router} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-registerpage',
  imports: [NavbarComponent, FooterComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.scss'
})
export class RegisterpageComponent {

  registerForm;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      alert('Please, fill all the fields!')
      return;
    }

    const payload = this.registerForm.value;

    this.authService.register(payload).subscribe({
        next: (user) => {
          console.log('User created:', user);
          alert('Registration completed successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Register error:', err);
          const backendMessage = err.error?.detail || 'Unknown error from server';
          this.errorMessage = `An error occurred during registration: ${backendMessage}`;
          alert(this.errorMessage);
        }
      });
  }
}
