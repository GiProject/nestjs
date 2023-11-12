import { Body, Controller, Get, Post, Param, Delete, Put, UseInterceptors, UseFilters } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDocument } from './book.model'
import { CreateBookDto } from './interfaces/dto/create.book.dto';
import { BookResponseInterceptor } from "./inspectors/error.interceptor";
import { ParseUuid } from "./pipes/parse-uuid";
import { ValidationPipe } from "./pipes/validation";
import { HttpExceptionFilter } from "../filters/exception";

@Controller('api/books')
export class BooksController {
    constructor(private readonly bookService : BookService) {}

    @UseInterceptors(BookResponseInterceptor)
    @Post()
    create(@Body() data : CreateBookDto) : Promise<BookDocument> {
        return this.bookService.createBook(data);
    }

    @Get()
    async findAll(): Promise<BookDocument[]> {
        return this.bookService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseUuid(), ValidationPipe) id: string) : Promise<BookDocument> {
        return this.bookService.findBook(id);
    }

    @UseFilters(HttpExceptionFilter)
    @Delete(':id')
    deleteOne(@Param('id', new ParseUuid(), ValidationPipe) id: string) : Promise<BookDocument> {
        return this.bookService.deleteBook(id);
    }

    @Put(':id')
    updateOne(@Param('id', new ParseUuid(), ValidationPipe) id: string, @Body() data: CreateBookDto): Promise<BookDocument> {
        return this.bookService.updateBook(id, data);
    }
}