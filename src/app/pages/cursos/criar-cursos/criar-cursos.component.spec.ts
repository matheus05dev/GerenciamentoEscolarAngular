import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCursosComponent } from './criar-cursos.component';

describe('CriarCursosComponent', () => {
  let component: CriarCursosComponent;
  let fixture: ComponentFixture<CriarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
