import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';

describe('BooksService', (): void => {
    let service: BookService;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BookService],
        }).compile();

        service = module.get<BookService>(BookService);
    });

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });
});