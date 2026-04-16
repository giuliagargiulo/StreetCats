import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { RegisterpageComponent } from "./registerpage/registerpage.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomepageComponent, LoginpageComponent, RegisterpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app';
}
