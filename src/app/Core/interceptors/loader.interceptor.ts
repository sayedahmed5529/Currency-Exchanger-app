import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private count = 0;
  constructor(private loader: LoaderService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.count === 0) {
      this.loader.show();
    }
    this.count++;
    return next.handle(request).pipe(finalize(() => {
      this.count--;
      if (this.count === 0) {
        this.loader.hide();
      }
    }));
  }
}
