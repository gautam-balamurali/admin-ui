import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserDialogComponent } from './delete-user-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DeleteUserDialogComponent', () => {
  let component: DeleteUserDialogComponent;
  let fixture: ComponentFixture<DeleteUserDialogComponent>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<DeleteUserDialogComponent>>;

  beforeEach(async () => {
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [DeleteUserDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Confirmation', content: 'Are you sure you want to delete the user?' } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the dialog title and content from the injected data', () => {
    expect(component.dialogTitle).toBe('Confirmation');
    expect(component.dialogContent).toBe('Are you sure you want to delete the user?');
  });

  it('should close the dialog with false when onClose is called', () => {
    component.onClose();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close the dialog with true when onProceed is called', () => {
    component.onProceed();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(true);
  });
});
