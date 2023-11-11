import { Module } from '@nestjs/common';
import { BooksController } from '../controllers/book.controller';
import { BooksService } from '../services/book/book.service';

@Module({
    imports: [],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BookModule {}