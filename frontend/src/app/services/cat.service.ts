import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat } from '../models/cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = 'http://localhost:8000/cat';

  constructor(private http: HttpClient) {}

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${this.apiUrl}/all`);
  }

  getCatById(uu_id: string): Observable<Cat> {
    return this.http.get<Cat>(`${this.apiUrl}/by-id/${uu_id}`);
  }

  createCat(cat: FormData): Observable<Cat> {
    return this.http.post<Cat>(`${this.apiUrl}/new-cat`, cat);
  }

  // deleteCat(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
