import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat } from '../models/cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = 'http://localhost:3000/api/cats';

  constructor(private http: HttpClient) {}

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.apiUrl);
  }

  getCatById(id: string): Observable<Cat> {
    return this.http.get<Cat>(`${this.apiUrl}/${id}`);
  }

  createCat(cat: FormData): Observable<Cat> {
    return this.http.post<Cat>(this.apiUrl, cat);
  }

  deleteCat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // getCommentsByCat(id:string): Observable<void> {
  //  return
  // }

}
