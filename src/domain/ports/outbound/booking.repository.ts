import { BookingModel } from "src/domain/model/booking";

export interface BookingRepositoryInterface {
    getBookedTable(): number;
    create(customers: number, tables: number): BookingModel;
    get(bookingNumber: string): BookingModel;
    cancel(bookingNumber: string): void;
}

export const BookingRepositoryInterface = Symbol('BookingRepositoryInterface')