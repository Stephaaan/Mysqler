import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseOneLineResultComponent } from './database-one-line-result.component';

describe('DatabaseOneLineResultComponent', () => {
  let component: DatabaseOneLineResultComponent;
  let fixture: ComponentFixture<DatabaseOneLineResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseOneLineResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseOneLineResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
