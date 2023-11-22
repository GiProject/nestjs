import {BooksController} from "./books.controller";
import {BookService} from "./book.service";
import {Book} from './book.model'
import {Test, TestingModule} from "@nestjs/testing";
import {CreateBookDto} from "./interfaces/dto/create.book.dto";
import {plainToClass} from "class-transformer";

const bookStub = (): Book => {
    return <Book>{
        _id: '1',
        title: 'title',
        authors: 'author',
        description: 'description',
        favorite: 'yes',
        fileCover: '',
    }
}

describe('BooksController', () => {
    let booksController: BooksController,
        bookService: BookService;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BooksController],
            providers: [
                {
                    provide: BookService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([bookStub()]),
                        findBook: jest.fn().mockResolvedValue(bookStub()),
                        createBook: jest.fn().mockResolvedValue(bookStub()),
                        deleteBook: jest.fn().mockResolvedValue(bookStub()),
                        updateBook: jest.fn().mockResolvedValue(bookStub()),
                    }
                }
            ]
        }).compile();

        booksController = module.get<BooksController>(BooksController);
        bookService = module.get<BookService>(BookService);
    });

    it('should return all books', async () => {
        expect(await booksController.findAll()).toEqual([bookStub()]);
    });

    it('should return one book', async () => {
        expect(await booksController.findOne('1')).toEqual(bookStub());
    });

    it('should create book', async () => {
        expect(await booksController.create(plainToClass(CreateBookDto, bookStub()))).toEqual(bookStub());
    });

    it('should update book', async () => {
        let book = await booksController.create(new CreateBookDto());
        expect(await booksController.updateOne(book._id, plainToClass(CreateBookDto, bookStub()))).toEqual(bookStub());
    });

    it('should delete book', async () => {
        let book = await booksController.create(new CreateBookDto());
        expect(await booksController.deleteOne(book._id)).toEqual(bookStub());
    });
});