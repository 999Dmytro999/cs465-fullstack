import { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_STORAGE_KEY } from './authentication';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const isProtectedTripRequest = request.url.startsWith('http://localhost:3000/api/trips') &&
    ['POST', 'PUT', 'DELETE'].includes(request.method);
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!isProtectedTripRequest || !token) {
    return next(request);
  }

  return next(request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};
