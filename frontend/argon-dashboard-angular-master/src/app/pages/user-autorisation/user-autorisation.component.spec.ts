import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAutorisationComponent } from './user-autorisation.component';

describe('UserAutorisationComponent', () => {
  let component: UserAutorisationComponent;
  let fixture: ComponentFixture<UserAutorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAutorisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
