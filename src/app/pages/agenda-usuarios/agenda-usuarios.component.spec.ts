import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaUsuariosComponent } from './agenda-usuarios.component';

describe('AgendaUsuariosComponent', () => {
  let component: AgendaUsuariosComponent;
  let fixture: ComponentFixture<AgendaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
