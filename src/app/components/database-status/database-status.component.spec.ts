import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseStatusComponent } from './database-status.component';

describe('DatabaseStatusComponent', () => {
  let component: DatabaseStatusComponent;
  let fixture: ComponentFixture<DatabaseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
