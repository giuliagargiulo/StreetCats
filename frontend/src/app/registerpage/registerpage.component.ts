import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-registerpage',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.scss'
})
export class RegisterpageComponent {

}
