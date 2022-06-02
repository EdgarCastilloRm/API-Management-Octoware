import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementMainComponent } from './user-management-main.component';

describe('UserManagementMainComponent', () => {
  let component: UserManagementMainComponent;
  let fixture: ComponentFixture<UserManagementMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
