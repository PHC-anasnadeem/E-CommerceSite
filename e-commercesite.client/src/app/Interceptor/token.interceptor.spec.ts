import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenInterceptor } from './token.interceptor';

describe('tokenInterceptor', () => {
  let interceptor: (req: HttpRequest<any>, next: HttpHandler) => Observable<HttpEvent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    interceptor = (req, next) =>
      TestBed.runInInjectionContext(() => tokenInterceptor (req, next));
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
