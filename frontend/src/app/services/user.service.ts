// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/user';

  constructor(private http: HttpClient) {}

  // GET /user/by-id/{uu_id}
  getUserById(uu_id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/by-id/${uu_id}`);
  }

  // GET /user/by-username/{username}
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/by-username/${username}`);
  }
}
