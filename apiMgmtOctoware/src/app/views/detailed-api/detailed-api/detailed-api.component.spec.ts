import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedApiComponent } from './detailed-api.component';

describe('DetailedApiComponent', () => {
  let component: DetailedApiComponent;
  let fixture: ComponentFixture<DetailedApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
