import { HttpInterceptorFn } from '@angular/common/http';

// When a new HTTP request is sent, this interceptor attach the token to the request
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }
  return next(req);
};
