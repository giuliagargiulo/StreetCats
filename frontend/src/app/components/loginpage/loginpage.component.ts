import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/user';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [ NavbarComponent, FooterComponent, RouterLink, ReactiveFormsModule ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginpageComponent {

  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert('Please, fill all the fields!')
      return;
    }
    const payload = this.loginForm.value;

    this.authService.login(payload).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.access_token);
          alert('Login completed successfully!');
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Login error:', err);
          const backendMessage = err.error?.detail || 'Unknown error from server';
          alert(`Login failed: ${backendMessage}`);
        }
      });
  }
}
