import {Body, Controller, Get, Param, ParseUUIDPipe, Post} from '@nestjs/common';
import { BooksService } from '../services/book/book.service';
import { BookInterface } from '../models/interfaces/book.interface';
import {BookDTO} from "../services/book/dto/book.dto";

@Controller('api/books')
export class BooksController {
    constructor(private readonly BookService: BooksService) {}

    @Post()
    async create(@Body() bookDTO: BookDTO) {
        this.BookService.create(bookDTO);
    }

    @Get()
    async findAll(): Promise<BookInterface[]> {
        return this.BookService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): BookInterface {
        return this.BookService.findByID(id);
    }
}