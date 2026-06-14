import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { MapComponent } from "../map/map.component";
import { Cat } from '../../models/cat';
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';
import { TimeagoModule } from 'ngx-timeago';
import { TimeagoFormatter, TimeagoDefaultFormatter, TimeagoClock, TimeagoDefaultClock } from 'ngx-timeago';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CatService } from '../../services/cat.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cat-details-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, MapComponent, TimeagoModule, CommonModule, NgFor, NgIf, DatePipe, ReactiveFormsModule],
  templateUrl: './cat-details-page.component.html',
  styleUrl: './cat-details-page.component.scss',
  providers: [
    { provide: TimeagoFormatter, useClass: TimeagoDefaultFormatter },
    { provide: TimeagoClock, useClass: TimeagoDefaultClock }
  ]
})
export class CatDetailsPageComponent implements OnInit {

  cat: Cat | null = null;
  comments: Comment[] = [];
  commentForm!: FormGroup;
  cat_uu_id!: string;
  currentUser$!: Observable<any>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catService: CatService,
    private authService: AuthService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.cat_uu_id = this.route.snapshot.paramMap.get('uu_id') || '';
    if (this.cat_uu_id) {
      this.loadCatDetails();
      this.loadComments();
    }

    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(2)]]
    });
  }



  loadCatDetails() {
    this.catService.getCatById(this.cat_uu_id).subscribe({
      next: (data) => this.cat = data,
      error: (err) => console.error('Error during loading cat:', err)
    });
  }

  loadComments() {
    this.commentService.getCommentsByCat(this.cat_uu_id).subscribe({
      next: (data) => this.comments = data,
      error: (err) => console.error('Error during loading commnts:', err)
    });
  }

  onSubmit() {
    if (this.commentForm.invalid) return;

    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.sendComment();
        } else {
          this.handleUnauthorized();
        }
      },
      error: (err) => {
        this.handleUnauthorized();
      }
    });
  }

  private sendComment() {
    const payload = {
      cat_uu_id: this.cat_uu_id,
      content: this.commentForm.value.text
    };

    this.commentService.addComment(payload).subscribe({
      next: (newComment) => {
        this.comments.push(newComment);
        this.commentForm.reset();
      },
      error: (err) => {
        console.error('Error during sending comment:', err);
        alert('An error occurred during adding a new comment, please retry later.');
      }
    });
  }

  private handleUnauthorized() {
    alert('You have to login to leave a comment.');
    this.router.navigate(['/login']);
  }
}
