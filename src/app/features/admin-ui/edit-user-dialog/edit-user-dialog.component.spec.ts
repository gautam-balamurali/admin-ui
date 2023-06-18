import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDialogComponent } from './edit-user-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('EditUserDialogComponent', () => {
  let component: EditUserDialogComponent;
  let fixture: ComponentFixture<EditUserDialogComponent>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<EditUserDialogComponent>>;

  beforeEach(async () => {
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [EditUserDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Edit User',
            content: {
              name: 'John Doe',
              email: 'john@example.com',
              role: 'member',
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserDialogComponent);
    component = fixture.componentInstance;
    component.dialogContent = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      role: new FormControl(),
    });
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the dialog title and content from the injected data', () => {
    expect(component.dialogTitle).toBe('Edit User');
    expect(component.dialogContent.get('name')?.value).toBe(null);
    expect(component.dialogContent.get('email')?.value).toBe(null);
    expect(component.dialogContent.get('role')?.value).toBe(null);
  });

  it('should close the dialog without passing any value when onClose is called', () => {
    component.onClose();
    expect(mockMatDialogRef.close).toHaveBeenCalled();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close the dialog with the form value when onSave is called', () => {
    const updatedFormValue = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'member',
    };

    // Set the form value
    component.dialogContent.patchValue(updatedFormValue);

    component.onSave();
    expect(mockMatDialogRef.close).toHaveBeenCalled();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(updatedFormValue);
  });
});
