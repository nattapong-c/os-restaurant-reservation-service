import { Test, TestingModule } from "@nestjs/testing";

import { BookingRepositoryInterface } from "../domain/ports/outbound/booking.repository";
import { BookingRepository } from "./booking.repository";

describe('Booking Repository', () => {
    let bookingRepository: BookingRepositoryInterface;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: BookingRepositoryInterface,
                    useClass: BookingRepository
                }
            ]
        }).compile();

        bookingRepository = app.get<BookingRepositoryInterface>(BookingRepositoryInterface);
    });

    it('create', () => {
        const result = bookingRepository.create(3, 1);
        expect(result.customers).toBe(3);
        expect(result.tables).toBe(1);
        expect(result.booking_number).toBe('OS0001');
    });

    it('get total table booked', () => {
        const result = bookingRepository.getBookedTable();
        expect(result).toBe(1);
    });

    it('get booked detail', () => {
        const result = bookingRepository.get('OS0001');
        expect(result.customers).toBe(3);
        expect(result.tables).toBe(1);
        expect(result.booking_number).toBe('OS0001');
    });

    it('get booked not found', () => {
        const result = bookingRepository.get('OS0099');
        expect(result).toBeUndefined();
    });

    it('cancel booking', () => {
        bookingRepository.cancel('OS0001');
        const result = bookingRepository.get('OS0001');
        expect(result.cancel_date).not.toBeUndefined();
    });
});