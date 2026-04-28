import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginbarComponent } from '../loginbar/loginbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [MapComponent, NavbarComponent, FooterComponent, LoginbarComponent, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}

