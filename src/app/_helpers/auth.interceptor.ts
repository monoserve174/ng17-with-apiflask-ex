import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let accessToken = localStorage.getItem('accessToken') || '';
  if (!accessToken) {
    return next(req);
  }

  req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`) });
  return next(req);
};
