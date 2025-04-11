import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoAlunoComponent } from './cartao-aluno.component';

describe('CartaoAlunoComponent', () => {
  let component: CartaoAlunoComponent;
  let fixture: ComponentFixture<CartaoAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
