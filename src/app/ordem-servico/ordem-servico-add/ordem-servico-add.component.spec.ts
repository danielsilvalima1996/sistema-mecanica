import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemServicoAddComponent } from './ordem-servico-add.component';

describe('OrdemServicoAddComponent', () => {
  let component: OrdemServicoAddComponent;
  let fixture: ComponentFixture<OrdemServicoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdemServicoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemServicoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
