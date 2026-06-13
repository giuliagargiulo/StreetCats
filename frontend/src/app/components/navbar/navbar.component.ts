import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  username$!: Observable<string>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username$ = this.authService.getCurrentUser().pipe(
      map(user => user?.username ? user.username : '')
    );
  }

  onLogout(): void {
    this.authService.logout();
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
