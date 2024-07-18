import { BookingModel } from "src/domain/model/booking";

export interface BookingRepositoryInterface {
    getBookedTable(): number;
}

export const BookingRepositoryInterface = Symbol('BookingRepositoryInterface')