import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-add-cat-page',
  imports: [NavbarComponent, FooterComponent, MapComponent],
  templateUrl: './add-cat-page.component.html',
  styleUrl: './add-cat-page.component.scss'
})
export class AddCatPageComponent {
}
