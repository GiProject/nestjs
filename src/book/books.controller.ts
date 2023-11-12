import { Body, Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDocument } from './book.model'
import { CreateBookDto } from './interfaces/dto/create.book.dto';


@Controller('api/books')
export class BooksController {
    constructor(private readonly bookService : BookService) {}

    @Post()
    create(@Body() data : CreateBookDto) : Promise<BookDocument> {
        return this.bookService.createBook(data);
    }

    @Get()
    async findAll(): Promise<BookDocument[]> {
        return this.bookService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) : Promise<BookDocument> {
        return this.bookService.findBook(id);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) : Promise<BookDocument> {
        return this.bookService.deleteBook(id);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() data: CreateBookDto): Promise<BookDocument> {
        return this.bookService.updateBook(id, data);
    }
}