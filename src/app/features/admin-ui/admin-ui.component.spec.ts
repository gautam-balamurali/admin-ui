import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUiComponent } from './admin-ui.component';
import { UsersService } from 'src/app/core/services/users-service/users.service';
import { UserDetailsModel } from 'src/app/models/user-details.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminUiComponent', () => {
  let component: AdminUiComponent;
  let fixture: ComponentFixture<AdminUiComponent>;
  let usersService: UsersService;
  let getUsersListServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminUiComponent],
      providers: [UsersService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUiComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    getUsersListServiceSpy = spyOn(usersService, 'getUsersListService');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsersList and set usersList correctly', () => {
    const mockUsers: UserDetailsModel[] = [
      { id: 1, name: 'John', email: 'john@example.com', role: 'member' },
      { id: 2, name: 'Jane', email: 'jane@example.com', role: 'member' },
    ];
    getUsersListServiceSpy.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(getUsersListServiceSpy).toHaveBeenCalled();
    expect(component.usersList).toEqual(mockUsers);
    expect(component.filteredUsersList).toEqual(mockUsers);
  });
});
