import { HttpException, HttpStatus, PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseUuid implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = value.match(/^[a-f0-9]{24}$/g);
        if (!isValid) {
            throw new HttpException(
                'not valid uiid',
                HttpStatus.BAD_REQUEST,
            );
        }
        return value;
    }
}
