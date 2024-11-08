import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  let authGuard: AuthGuard;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        AuthGuard,
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');

    const canActivate = authGuard.canActivate({} as any, {} as any);
    expect(canActivate).toBe(true);
  });

  it('should deny access if not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('false');

    const canActivate = authGuard.canActivate({} as any, {} as any);
    expect(canActivate).toBe(false);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
