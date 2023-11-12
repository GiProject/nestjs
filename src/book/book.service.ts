import {Injectable} from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {Connection, Model} from 'mongoose';


import {CreateBookDto} from './interfaces/dto/create.book.dto';
import {Book, BookDocument} from './book.model';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<BookDocument>,
        @InjectConnection() private connection: Connection,
    ) {
    }

    public async createBook(data: CreateBookDto): Promise<BookDocument> {
        const book = new this.BookModel(data);
        return await book.save();
    }

    public async findAll(): Promise<BookDocument[]> {
        return this.BookModel.find();
    }

    public async findBook(id: string): Promise<BookDocument> {
        return this.BookModel.findById(id);
    }

    public async updateBook(id: string, data: any): Promise<BookDocument> {
        return this.BookModel.findByIdAndUpdate(id, data);
    }

    public async deleteBook(id: string): Promise<BookDocument> {
        return this.BookModel.findOneAndDelete({_id: id});
    }
}