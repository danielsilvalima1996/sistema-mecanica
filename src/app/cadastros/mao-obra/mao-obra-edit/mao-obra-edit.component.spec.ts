import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaoObraEditComponent } from './mao-obra-edit.component';

describe('MaoObraEditComponent', () => {
  let component: MaoObraEditComponent;
  let fixture: ComponentFixture<MaoObraEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaoObraEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaoObraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
