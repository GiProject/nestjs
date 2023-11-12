import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { BookService } from './book.service';
import { Book, BookSchema } from './book.model'

@Module({
    imports: [MongooseModule.forFeature([{ name:Book.name, schema:BookSchema }])],
    controllers: [BooksController],
    providers: [BookService],
    exports: [BookService]
})
export class BookModule {}