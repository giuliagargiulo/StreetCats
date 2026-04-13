import { Component } from '@angular/core';
import { IntroComponent } from '../intro/intro.component';
import { MapComponent } from '../map/map.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginbarComponent } from '../loginbar/loginbar.component';

@Component({
  selector: 'app-homepage',
  imports: [MapComponent, IntroComponent, NavbarComponent, FooterComponent, LoginbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}

