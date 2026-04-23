import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { RegisterpageComponent } from "./registerpage/registerpage.component";
import { AddCatPageComponent } from "./add-cat-page/add-cat-page.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomepageComponent, LoginpageComponent, RegisterpageComponent, AddCatPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app';
}
