import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { Cat } from "../../models/cat";
import { CatService } from "../../services/cat.service"

@Component({
  selector: 'app-homepage',
  imports: [MapComponent, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {


  constructor(private catService: CatService) {}

  cats: Cat[] = [];

  scrollToMap(): void {
    const element = document.getElementById('map');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit(): void {
    // this.cats = this.catsProva;
    this.catService.getCats().subscribe(data => {
      this.cats = data;
    });
  }
}

