import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PecasEditComponent } from './pecas-edit.component';

describe('PecasEditComponent', () => {
  let component: PecasEditComponent;
  let fixture: ComponentFixture<PecasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PecasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PecasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
