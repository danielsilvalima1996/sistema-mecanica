import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaoObraListComponent } from './mao-obra-list.component';

describe('MaoObraListComponent', () => {
  let component: MaoObraListComponent;
  let fixture: ComponentFixture<MaoObraListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaoObraListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaoObraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
