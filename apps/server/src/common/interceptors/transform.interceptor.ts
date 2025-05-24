import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
  Injectable,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private readonly classType: Type<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return plainToInstance(this.classType, data, {
            excludeExtraneousValues: true,
          });
        }

        if (data?.data && Array.isArray(data.data)) {
          return {
            ...data,
            data: plainToInstance(this.classType, data.data, {
              excludeExtraneousValues: true,
            }),
          };
        }

        return plainToInstance(this.classType, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
