import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginpageComponent } from "./components/loginpage/loginpage.component";
import { RegisterpageComponent } from "./components/registerpage/registerpage.component";
import { AddCatPageComponent } from "./components/add-cat-page/add-cat-page.component";
import { CatDetailsPageComponent } from "./components/cat-details-page/cat-details-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomepageComponent, LoginpageComponent, RegisterpageComponent, AddCatPageComponent, CatDetailsPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app';

}
