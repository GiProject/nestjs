import { IsString } from 'class-validator';

export class BookDTO {
    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly authors: string;

    @IsString()
    readonly favorite: string;

    @IsString()
    readonly fileCover: string;

    @IsString()
    readonly fileBook: string;
}