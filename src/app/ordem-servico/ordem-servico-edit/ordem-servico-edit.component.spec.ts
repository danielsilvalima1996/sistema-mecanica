import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemServicoEditComponent } from './ordem-servico-edit.component';

describe('OrdemServicoEditComponent', () => {
  let component: OrdemServicoEditComponent;
  let fixture: ComponentFixture<OrdemServicoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdemServicoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemServicoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
