import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableResultComponent } from './database-table-result.component';

describe('DatabaseTableResultComponent', () => {
  let component: DatabaseTableResultComponent;
  let fixture: ComponentFixture<DatabaseTableResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
