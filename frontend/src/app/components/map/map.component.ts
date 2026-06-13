import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { Cat } from "../../models/cat";
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges, AfterViewInit {

  @Input() cats: Cat[] = [];
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() isClickable: boolean = false;

   @Output() locationSelected = new EventEmitter<{
    lat: number;
    lng: number;
  }>();

  private selectedMarker?: L.Marker;

  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef;

  private map!: L.Map;
  private markersLayer = L.layerGroup();

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 300);
    this.markersLayer.addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);

    this.tryRender();
  }

  ngOnChanges(): void {
    this.tryRender();
  }

  private tryRender(): void {
    if (!this.map) return;
    if (!this.cats || this.cats.length === 0) return;
    this.renderMarkers();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [40.8518, 14.2681], // Napoli
      12
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    const container = this.mapContainer.nativeElement as HTMLElement;
    container.blur?.();
    container.removeAttribute('tabindex');

    if(this.isClickable){
      this.map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        if (this.selectedMarker) {
          this.map.removeLayer(this.selectedMarker);
        }
        this.selectedMarker = L.marker([lat, lng]).addTo(this.map);
        this.locationSelected.emit({ lat, lng });
      });
      this.mapContainer.nativeElement.style.cursor = 'crosshair';
    }

    const mapElement: HTMLElement = this.mapContainer.nativeElement;

    mapElement.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target && target.classList.contains('popup-trigger-btn')) {
        const uu_id = target.getAttribute('data-uu_id');
        if (uu_id) {
          this.router.navigate(['/cat-details', uu_id]);
        }
      }
    });
  }

  private renderMarkers(): void {
    this.markersLayer.clearLayers();
    if (!this.cats || this.cats.length === 0) return;

    this.cats.forEach(cat => {

      const lat = Number(cat.latitude);
      const lng = Number(cat.longitude);

      if (isNaN(lat) || isNaN(lng)) return;

      const customIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      const popupContent = this.createPopup(cat);
      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        setTimeout(() => {
          const btn = document.getElementById(`btn-${cat.uu_id}`);
          if (btn) {
            btn.addEventListener('click', () => {
              this.router.navigate(['/cat', cat.uu_id]);
            });
          }
        });
      });
      marker.addTo(this.markersLayer);
    });
  }

  private createPopup(cat: Cat): string {
  return `
    <div class="popup-card">
      <img src="${cat.picture_url}" class="popup-img"/>
      <h3 class="popup-title">${cat.title}</h3>
      <p class="popup-desc">${cat.description?.slice(0, 70)}...</p>
      <button data-uu_id="${cat.uu_id}" class="popup-btn popup-trigger-btn">
        View details
      </button>
    </div>
  `;
}
}

