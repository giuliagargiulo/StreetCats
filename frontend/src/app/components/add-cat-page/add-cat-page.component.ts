import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MapComponent } from '../map/map.component';
import { RouterLink, Router} from "@angular/router";
import { QuillModule } from 'ngx-quill';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CatService } from '../../services/cat.service';


@Component({
  selector: 'app-add-cat-page',
  imports: [NavbarComponent, FooterComponent, MapComponent, RouterLink, QuillModule, ReactiveFormsModule],
  templateUrl: './add-cat-page.component.html',
  styleUrl: './add-cat-page.component.scss'
})
export class AddCatPageComponent {
  modules = {
    toolbar: [
      ['bold', 'italic', { list: 'ordered' }, { list: 'bullet' }]
    ]
  };

  addCatForm;

  constructor(
    private fb: FormBuilder,
    private catService: CatService,
    private router: Router
  ) {
    this.addCatForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null as File | null, Validators.required],
      latitude: [null as number | null, Validators.required],
      longitude: [null as number | null, Validators.required]
    });
  }

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    this.selectedFile = input.files[0];
    this.addCatForm.patchValue({
      image: this.selectedFile
    });
    this.addCatForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {
    if (this.addCatForm.invalid) {
      alert("Please, fill all the requested fields.");
      return;
    }
    const formData = new FormData();

    formData.append('title', this.addCatForm.get('title')?.value || '');
    formData.append('description', this.addCatForm.get('description')?.value || '');
    formData.append('latitude', this.addCatForm.get('latitude')?.value?.toString() || '');
    formData.append('longitude', this.addCatForm.get('longitude')?.value?.toString() || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    // Passiamo formData invece di payload (che era in formato JSON)
    this.catService.createCat(formData)
      .subscribe({
        next: (cat) => {
          console.log('Cat Added:', cat);
          alert('New cat successfully added!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Add cat error:', err);
          alert('An error occurred during adding a new cat.');
        }
      });
  }

  onLocationSelected(location: { lat: number; lng: number }): void {
    this.addCatForm.patchValue({
      latitude: location.lat,
      longitude: location.lng
    });
    console.log(location);
  }
}
