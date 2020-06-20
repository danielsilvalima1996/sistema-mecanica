import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculosEditComponent } from './veiculos-edit.component';

describe('VeiculosEditComponent', () => {
  let component: VeiculosEditComponent;
  let fixture: ComponentFixture<VeiculosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
