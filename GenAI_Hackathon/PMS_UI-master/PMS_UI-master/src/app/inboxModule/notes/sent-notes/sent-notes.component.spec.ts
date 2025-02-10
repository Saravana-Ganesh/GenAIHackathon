import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentNotesComponent } from './sent-notes.component';

describe('SentNotesComponent', () => {
  let component: SentNotesComponent;
  let fixture: ComponentFixture<SentNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
