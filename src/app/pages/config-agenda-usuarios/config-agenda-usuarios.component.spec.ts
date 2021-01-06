import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAgendaUsuariosComponent } from './config-agenda-usuarios.component';

describe('ConfigAgendaUsuariosComponent', () => {
  let component: ConfigAgendaUsuariosComponent;
  let fixture: ComponentFixture<ConfigAgendaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigAgendaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAgendaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
