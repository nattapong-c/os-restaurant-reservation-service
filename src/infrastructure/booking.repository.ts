import { Logger } from "@nestjs/common";
import { v4 as uuid } from 'uuid';

import { BookingModel } from "src/domain/model/booking";
import { BookingRepositoryInterface } from "../domain/ports/outbound/booking.repository";

export class BookingRepository implements BookingRepositoryInterface {
    private readonly logger = new Logger(BookingRepository.name);
    private booking: BookingModel[] = [];

    getBookedTable(): number {
        this.logger.log('list active booking');
        let tables = 0;
        for (const item of this.booking) {
            if (!item.cancel_date) {
                tables += item.tables;
            }
        }

        this.logger.debug('booked tables');
        this.logger.debug(tables);

        return tables
    }

    private genBookingNumber = (): string => {
        const prefix = 'OS';
        if (!this.booking.length) {
            return `${prefix}0001`;
        }

        const latestBookingNo = this.booking[this.booking.length - 1].booking_number;
        const number = Number.parseInt(latestBookingNo.split(prefix)[1]);
        return prefix + String(number + 1).padStart(4, '0');
    }

    create(customers: number, tables: number): BookingModel {
        this.logger.log('create booking');
        const newBooking = {
            id: uuid(),
            customers,
            tables,
            booking_date: new Date(),
            booking_number: this.genBookingNumber()
        }
        this.booking.push(newBooking);
        return newBooking;
    }

    get(bookingNumber: string): BookingModel {
        this.logger.log(`get booking ${bookingNumber}`);
        const booking = this.booking.find(item => item.booking_number === bookingNumber);
        return booking;
    }

    cancel(bookingNumber: string): void {
        this.logger.log(`cancel booking ${bookingNumber}`);
        const booking = this.booking.find(item => item.booking_number === bookingNumber);
        if (booking) {
            booking.cancel_date = new Date();
        }
    }
}