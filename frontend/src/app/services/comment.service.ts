import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:3000/api/comments';
  constructor(private http: HttpClient) {}

  getCommentsByCat(cat_id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>('/api/comments'); // FORSE DA MODIFICARE
  }

  addComment(comment: FormData):Observable<Comment>{
    return this.http.post<Comment>(this.apiUrl, comment) // DA MODIFICARE
  }
}
