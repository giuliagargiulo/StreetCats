import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddCatPageComponent } from './components/add-cat-page/add-cat-page.component';
import { CatDetailsPageComponent } from './components/cat-details-page/cat-details-page.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { RegisterpageComponent } from './components/registerpage/registerpage.component';

export const routes: Routes = [
  {
    path: "",
    title: "Homepage",
    component: HomepageComponent
  }, {
    path: "login",
    title: "Login Page",
    component: LoginpageComponent
  }, {
    path: "register",
    title: "Register Page",
    component: RegisterpageComponent
  }, {
    path: "add-cat",
    title: "Add Cat Page",
    component: AddCatPageComponent
  }, {
    path: "cat-details",
    title: "Cat Details Page",
    component: CatDetailsPageComponent
  }
];
