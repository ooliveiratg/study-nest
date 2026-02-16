/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// Interceptor é uma ferramenta para modificar ou observar o fluxo da requisição e da resposta sem sujar o controller.

import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const method = request.method;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
    const url = request.url;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const now = Date.now();
    return next.handle().pipe();
  }
}
