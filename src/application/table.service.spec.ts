import { Test, TestingModule } from '@nestjs/testing';

import { TableService } from './table.service';
import { TableRepository } from '../infrastructure/table.repository';
import { TableRepositoryInterface } from '../domain/ports/outbound/table.repository';
import { BookingRepositoryInterface } from '../domain/ports/outbound/booking.repository';
import { BookingRepository } from '../infrastructure/booking.repository';

describe('Table Service', () => {
    let tableService: TableService;
    let bookingRepository: BookingRepositoryInterface;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                TableService,
                {
                    provide: TableRepositoryInterface,
                    useClass: TableRepository
                },
                {
                    provide: BookingRepositoryInterface,
                    useClass: BookingRepository
                }
            ],
        }).compile();

        tableService = app.get<TableService>(TableService);
        bookingRepository = app.get<BookingRepositoryInterface>(BookingRepositoryInterface);
    });

    describe('Setup Table Service', () => {
        const TOTAL_TABLE = 4;

        it('no booking remain, should return total table equal remain table', () => {
            const result = tableService.setup(TOTAL_TABLE);
            expect(result).toEqual({ total: 4, remain: 4 })
        });

        it('remain 2 active booking, should return remain table to 2', () => {
            jest.spyOn(bookingRepository, 'getBookedTable').mockImplementation(() => 2);
            const result = tableService.setup(TOTAL_TABLE);
            expect(result).toEqual({ total: 4, remain: 2 })
        });
    });
})