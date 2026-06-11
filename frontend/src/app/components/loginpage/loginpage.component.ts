import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const payload = this.loginForm.value;
    this.http.post<any>('http://localhost:3000/auth/login', payload)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Login failed');
        }
      });
  }
}
