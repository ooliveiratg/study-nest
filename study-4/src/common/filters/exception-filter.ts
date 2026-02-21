import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    //ctx = contexto
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    response.status(400).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      message:
        errorResponse !== '' ? errorResponse : 'Erro ao realizar essa operação',
      path: request.url,
    });
  }
}
