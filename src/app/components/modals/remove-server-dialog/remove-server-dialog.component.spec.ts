import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveServerDialogComponent } from './remove-server-dialog.component';

describe('RemoveServerDialogComponent', () => {
  let component: RemoveServerDialogComponent;
  let fixture: ComponentFixture<RemoveServerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveServerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveServerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
