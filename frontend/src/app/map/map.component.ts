import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Input() size: 'small' | 'large' = 'large';

  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef;

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement)
      .setView([40.8518, 14.2681], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }
}

