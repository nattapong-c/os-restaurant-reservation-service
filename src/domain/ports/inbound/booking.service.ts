import { BookingResponse, CancelResponse } from "src/domain/model/booking";

export interface BookingServiceInterface {
    reserve(customers: number): BookingResponse;
    cancel(bookingNumber: string): CancelResponse;
}