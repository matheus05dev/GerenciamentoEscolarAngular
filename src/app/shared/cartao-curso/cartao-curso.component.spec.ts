import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoCursoComponent } from './cartao-curso.component';

describe('CartaoCursoComponent', () => {
  let component: CartaoCursoComponent;
  let fixture: ComponentFixture<CartaoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
