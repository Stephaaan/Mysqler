import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasesSelectorComponent } from './databases-selector.component';

describe('DatabasesSelectorComponent', () => {
  let component: DatabasesSelectorComponent;
  let fixture: ComponentFixture<DatabasesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabasesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabasesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
