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

  catsProva: Cat[] = [
  {
    uuid: "222738",
    title: 'Gatto curioso',
    description: 'Visto vicino al parco',
    latitude: 40.8518,
    longitude: 14.2681,
    picture_url: 'assets/molly.jpg',
    created_at: new Date().toISOString()
  },
  {
    uuid: "74748",
    title: 'Gatto nero',
    description: 'Molly is a medium-sized cat with a fluffy white coat and striking blue eyes. It has a distinctive black patch on its left ear. Molly is known for being very friendly and often approaches people for pets and cuddles. It was last seen near the central park, lounging on a bench.',
    latitude: 40.8525,
    longitude: 14.2700,
    picture_url: 'assets/molly2.jpg',
    created_at: new Date().toISOString()
  }
  ];
cats: Cat[] = this.catsProva;

  scrollToMap(): void {
    const element = document.getElementById('map');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit(): void {
    this.cats = this.catsProva;
    // this.catService.getCats().subscribe(data => {
    //   this.cats = data;
    // });
  }

}

