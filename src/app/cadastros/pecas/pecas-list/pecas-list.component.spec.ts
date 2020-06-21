import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PecasListComponent } from './pecas-list.component';

describe('PecasListComponent', () => {
  let component: PecasListComponent;
  let fixture: ComponentFixture<PecasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PecasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PecasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
