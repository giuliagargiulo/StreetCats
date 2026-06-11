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
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cat-details-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, MapComponent, TimeagoModule, CommonModule, NgFor, NgIf, DatePipe, ReactiveFormsModule],
  templateUrl: './cat-details-page.component.html',
  styleUrl: './cat-details-page.component.scss'
})
export class CatDetailsPageComponent implements OnInit {

  cat: Cat | null = null;
  comments: Comment[] = [];
  commentForm!: FormGroup;
  cat_uuid!: string;

  constructor(
    private route: ActivatedRoute,
    private catService: CatService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cat_uuid = this.route.snapshot.paramMap.get('uuid') || '';

    if (this.cat_uuid) {
      this.loadCatDetails();
      this.loadComments();
    }

    // 2. Inizializza il form reattivo per i commenti
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  loadCatDetails() {
    this.catService.getCatById(this.cat_uuid).subscribe({
      next: (data) => this.cat = data,
      error: (err) => console.error('Errore nel caricamento del gatto:', err)
    });
  }

  loadComments() {
    // Passiamo l'uuid al servizio per prendere SOLO i commenti di questo gatto
    this.commentService.getCommentsByCat(this.cat_uuid).subscribe({
      next: (data) => this.comments = data,
      error: (err) => console.error('Errore nel caricamento dei commenti:', err)
    });
  }

  onSubmit() {
    if (this.commentForm.invalid) return;

    const payload = {
      cat_uuid: this.cat_uuid,
      text: this.commentForm.value.text,
      // L'autore andrebbe preso dal tuo AuthService globale (utente loggato)
      author: 'Anonymous User'
    };

    this.commentService.addComment(payload).subscribe({
      next: (newComment) => {
        // Aggiunge il commento alla lista in tempo reale senza ricaricare la pagina
        this.comments.push(newComment);
        this.commentForm.reset();
      },
      error: (err) => {
        console.error('Errore invio commento:', err);
        alert('Impossibile inviare il commento al momento.');
      }
    });
  }
}
