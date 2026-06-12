import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8000/comment';
  constructor(private http: HttpClient) {}

  getCommentsByCat(cat_id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/by-cat/${cat_id}`);
  }

  addComment(comment: any): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/new-comment`, comment);
  }
}
