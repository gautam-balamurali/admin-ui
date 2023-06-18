import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { GlobalConfig } from 'src/app/config/app-config';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users list', () => {
    const mockUsers = [
      { id: 1, name: 'John', email: 'john@example.com', role: 'member' },
      { id: 2, name: 'Jane', email: 'jane@example.com', role: 'member' },
    ];

    service.getUsersListService().subscribe((users: any[]) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(GlobalConfig.apiEndpoint);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
