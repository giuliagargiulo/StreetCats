import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.scss'
})
export class RegisterpageComponent {

}
