import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { MapComponent } from "../map/map.component";
import { Cat } from '../../models/cat';
import { Comment } from '../../models/comment';
import { CatService } from '../../services/cat.service';
import { CommentService } from '../../services/comment.service';
import { TimeagoModule } from 'ngx-timeago';
import { TimeagoFormatter, TimeagoDefaultFormatter, TimeagoClock, TimeagoDefaultClock } from 'ngx-timeago';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private catService: CatService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {}


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
        if (err.status === 401) {
          alert('Devi effettuare il login per poter commentare.');
        } else {
          alert('Impossible to upload the comment.');
        }
      }
    });
  }
}
