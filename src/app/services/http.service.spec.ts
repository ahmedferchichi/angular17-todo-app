import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new task', () => {
    const mockTask = 'New Task';
    const mockResponse = { id: 1, title: mockTask };

    service.addTask(mockTask).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: mockTask });
    req.flush(mockResponse);
  });

  it('should get all tasks', () => {
    const mockTasks = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' }
    ];

    service.getAllTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${baseUrl}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should update a task', () => {
    const mockTask = { id: 1, title: 'Updated Task' };

    service.updateTask(mockTask).subscribe(response => {
      expect(response).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${baseUrl}/tasks/${mockTask.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockTask);
    req.flush(mockTask);
  });
});
