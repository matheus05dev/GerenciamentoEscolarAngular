import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoAddComponent } from './cabecalho-add.component';

describe('CabecalhoAddComponent', () => {
  let component: CabecalhoAddComponent;
  let fixture: ComponentFixture<CabecalhoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabecalhoAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabecalhoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
