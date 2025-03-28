import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilComponent } from './soil.component';

describe('SoilComponent', () => {
  let component: SoilComponent;
  let fixture: ComponentFixture<SoilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
