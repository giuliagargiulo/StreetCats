import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8000/api';
  //private baseUrl = 'http://backend:8000/api'; per Docker (da usare per la consegna)
  constructor(private http: HttpClient) {}

  //get qualcosa del backend
}
