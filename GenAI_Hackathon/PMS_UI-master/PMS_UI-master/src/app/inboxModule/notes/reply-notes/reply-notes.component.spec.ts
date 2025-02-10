import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyNotesComponent } from './reply-notes.component';

describe('ReplyNotesComponent', () => {
  let component: ReplyNotesComponent;
  let fixture: ComponentFixture<ReplyNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
