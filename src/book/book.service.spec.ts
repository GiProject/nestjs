import {Test, TestingModule} from '@nestjs/testing';
import {BookService} from './book.service';
import {getModelToken} from '@nestjs/mongoose';
import {Book} from './book.model';
import {Model} from 'mongoose';
import {CreateBookDto} from "./interfaces/dto/create.book.dto";
import {plainToClass} from "class-transformer";

const bookStub = (): Book => {
    return <Book>{
        _id: '1',
        title: 'title',
        authors: 'author',
        description: 'description'
    }
}

describe('BooksService', () => {
    let service: BookService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                {
                    provide: getModelToken('Book'),
                    useValue: {
                        findById: jest.fn().mockResolvedValue(bookStub()),
                        find: jest.fn().mockResolvedValue([bookStub(), bookStub()]),
                        findByIdAndUpdate: jest.fn().mockResolvedValue(bookStub()),
                        findOneAndDelete: jest.fn().mockResolvedValue(bookStub()),
                        create: jest.fn().mockResolvedValue(bookStub()),
                    },
                },
            ],
        }).compile();

        service = module.get<BookService>(BookService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('method "findAll" should return books', async () => {
        expect(await service.findAll()).toEqual([bookStub(), bookStub()])
    });

    it('method "findBook" should return books', async () => {
        expect(await service.findBook(bookStub()._id)).toEqual(bookStub())
    });

    it('method "createBook" should return a Book', async () => {
        expect(await service.createBook(plainToClass(CreateBookDto, bookStub()))).toEqual(bookStub())
    });

    it('method "updateBook" should return a Book', async () => {
        expect(await service.updateBook(bookStub()._id, plainToClass(CreateBookDto, bookStub()))).toEqual(bookStub())
    });

    it('method "deleteBook" should return a Book', async () => {
        expect(await service.deleteBook(bookStub()._id)).toEqual(bookStub())
    });
});