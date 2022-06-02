import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAPIComponent } from './new-api.component';

describe('NewAPIComponent', () => {
  let component: NewAPIComponent;
  let fixture: ComponentFixture<NewAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAPIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
