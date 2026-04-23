import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatPageComponent } from './add-cat-page.component';

describe('AddCatPageComponent', () => {
  let component: AddCatPageComponent;
  let fixture: ComponentFixture<AddCatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCatPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
