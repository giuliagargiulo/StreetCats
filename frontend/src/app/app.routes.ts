import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddCatPageComponent } from './add-cat-page/add-cat-page.component';
import { CatDetailsPageComponent } from './cat-details-page/cat-details-page.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';

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
