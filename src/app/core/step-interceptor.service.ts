import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class StepInterceptor implements HttpInterceptor {
  intercept(req, next) {
    return next.handle(req).pipe(map(event => this.handleResponse(req, event)));
  }

  handleResponse(req, event) {
    if (event instanceof HttpResponse && req.url.includes('tic-tac-toe')) {
      return event.clone({
        body: event.body.recommendation
      });
    }

    return event;
  }
}
