import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectPasswordDialogComponent } from './connect-password-dialog.component';

describe('ConnectPasswordDialogComponent', () => {
  let component: ConnectPasswordDialogComponent;
  let fixture: ComponentFixture<ConnectPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectPasswordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
