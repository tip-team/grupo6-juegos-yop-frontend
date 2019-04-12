import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { ProductCardComponent } from './product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      imports: [ MatCardModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.producto = {id: 1, nombre: 'Sube y baja', precio: 5500.0, imagen: 'https://bit.ly/2TA2Dsa'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Button with name comprar must exists.', () => {
    expect(fixture.debugElement.query(By.css('button')).nativeElement.textContent).toEqual('COMPRAR');
  });

});
