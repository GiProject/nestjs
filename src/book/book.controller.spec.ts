import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';

describe('BooksController', (): void => {
    let controller: BooksController;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BooksController],
        }).compile();

        controller = module.get<BooksController>(BooksController);
    });

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });
});