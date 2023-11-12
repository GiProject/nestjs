import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, tap } from 'rxjs/operators';
import * as rxjs from 'rxjs';

@Injectable()
export class BookResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): rxjs.Observable<any> {
        return next.handle().pipe(
            map((data) => ({
                status: 'success',
                data: data,
            })),
            tap((data) => console.log(data)),
            catchError((err) => {
                console.log(err);
                return rxjs.of({
                    status: 'fail',
                    data: {message: err.message},
                });
            }),
        );
    }
}