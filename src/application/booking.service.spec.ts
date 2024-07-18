import { Test, TestingModule } from '@nestjs/testing';

import { TableRepository } from '../infrastructure/table.repository';
import { TableRepositoryInterface } from '../domain/ports/outbound/table.repository';
import { BookingRepositoryInterface } from '../domain/ports/outbound/booking.repository';
import { BookingRepository } from '../infrastructure/booking.repository';
import { BookingService } from './booking.service';
import { TableModel } from 'src/domain/model/table';
import { BookingModel } from 'src/domain/model/booking';

describe('Table Service', () => {
    let bookingService: BookingService;
    let bookingRepository: BookingRepositoryInterface;
    let tableRepository: TableRepositoryInterface;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                BookingService,
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

        bookingService = app.get<BookingService>(BookingService);
        bookingRepository = app.get<BookingRepositoryInterface>(BookingRepositoryInterface);
        tableRepository = app.get<TableRepositoryInterface>(TableRepositoryInterface);
    });

    describe('Reserve Table Service', () => {
        it('should throw error table not enough', () => {
            const CUSTOMER = 6;
            const TABLE: TableModel = { total: 4, remain: 0 };
            jest.spyOn(tableRepository, 'get').mockImplementation(() => TABLE);

            try {
                bookingService.reserve(CUSTOMER);
            } catch (error) {
                expect(error.message).toBe('table not enough');
            }
        });

        it('2 customers reserve success, should return booking info', () => {
            const CUSTOMER = 2;
            const TABLE: TableModel = { total: 4, remain: 4 };
            jest.spyOn(tableRepository, 'get').mockImplementation(() => TABLE);

            const booking = bookingService.reserve(CUSTOMER);
            expect(booking.customers).toBe(2);
            expect(booking.tables).toBe(1);
            expect(booking.remain_tables).toBe(3);
            expect(booking.booking_number).toBe('OS0001');
        });

        it('4 customers reserve success, should return booking info', () => {
            const CUSTOMER = 4;
            const TABLE: TableModel = { total: 4, remain: 4 };
            jest.spyOn(tableRepository, 'get').mockImplementation(() => TABLE);

            const booking = bookingService.reserve(CUSTOMER);
            expect(booking.customers).toBe(4);
            expect(booking.tables).toBe(1);
            expect(booking.remain_tables).toBe(3);
            expect(booking.booking_number).toBe('OS0002');
        });

        it('6 customers reserve success, should return booking info', () => {
            const CUSTOMER = 6;
            const TABLE: TableModel = { total: 4, remain: 4 };
            jest.spyOn(tableRepository, 'get').mockImplementation(() => TABLE);

            const booking = bookingService.reserve(CUSTOMER);
            expect(booking.customers).toBe(6);
            expect(booking.tables).toBe(2);
            expect(booking.remain_tables).toBe(2);
            expect(booking.booking_number).toBe('OS0003');
        });
    });

    describe('Cancel Table Service', () => {
        it('should throw error booking not found', () => {
            const TABLE: TableModel = { total: 4, remain: 3 };
            jest.spyOn(tableRepository, 'get').mockImplementation(() => TABLE);
            jest.spyOn(bookingRepository, 'get').mockImplementation(() => undefined);

            try {
                bookingService.cancel('OS0002');
            } catch (error) {
                expect(error.message).toBe('booking not found');
            }
        });
        it('cancel success, should return table info', () => {
            const TABLE: TableModel = { total: 4, remain: 2 };
            const BOOKING: BookingModel = {
                "id": "278eb461-7e85-4cc2-8839-a3dd792a7915",
                "customers": 5,
                "tables": 2,
                "booking_date": new Date(),
                "booking_number": "OS0001"
            };

            jest.spyOn(tableRepository, 'get').mockImplementation(() => TABLE);
            jest.spyOn(bookingRepository, 'get').mockImplementation(() => BOOKING);

            const result = bookingService.cancel("OS0001");
            expect(result.freed_tables).toBe(2);
            expect(result.remain_tables).toBe(4);
        });
    });
})