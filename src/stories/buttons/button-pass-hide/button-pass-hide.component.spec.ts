import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPassHideComponent } from './button-pass-hide.component';

describe('ButtonEditSaveComponent', () => {
  let component: ButtonPassHideComponent;
  let fixture: ComponentFixture<ButtonPassHideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonPassHideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPassHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
