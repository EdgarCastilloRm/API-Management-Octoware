import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMethodComponent } from './delete-method.component';

describe('DeleteMethodComponent', () => {
  let component: DeleteMethodComponent;
  let fixture: ComponentFixture<DeleteMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
