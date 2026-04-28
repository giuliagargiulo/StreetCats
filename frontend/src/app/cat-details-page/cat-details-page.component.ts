import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-cat-details-page',
  imports: [NavbarComponent, FooterComponent, MapComponent],
  templateUrl: './cat-details-page.component.html',
  styleUrl: './cat-details-page.component.scss'
})
export class CatDetailsPageComponent {

}
