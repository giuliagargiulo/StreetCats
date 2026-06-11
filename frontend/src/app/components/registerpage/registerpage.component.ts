import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink, Router} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
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
      return;
    }

    const payload = {
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };

    this.http.post('http://localhost:3000/auth/register', payload)
      .subscribe({
        next: (user) => {
          console.log('User created:', user);
          alert('Registration completed successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Register error:', err);
          alert('An error occurred during registration.');
        }
      });
  }
}
