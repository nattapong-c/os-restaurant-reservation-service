import { HttpException, HttpStatus, Inject, Logger } from "@nestjs/common";

import { BookingModel, BookingResponse, CancelResponse } from "../domain/model/booking";
import { BookingServiceInterface } from "../domain/ports/inbound/booking.service";
import { BookingRepositoryInterface } from "../domain/ports/outbound/booking.repository";
import { TableRepositoryInterface } from "../domain/ports/outbound/table.repository";

export class BookingService implements BookingServiceInterface {
    private readonly logger = new Logger(BookingService.name);
    private readonly TABLE_SEAT = 4;

    constructor(
        @Inject(BookingRepositoryInterface)
        private readonly bookingRepository: BookingRepositoryInterface,
        @Inject(TableRepositoryInterface)
        private readonly tableRepository: TableRepositoryInterface
    ) { }

    reserve(customers: number): BookingResponse {
        this.logger.log('reserve table')
        const usedTable = Math.ceil(customers / this.TABLE_SEAT);

        this.logger.debug('booked table');
        this.logger.debug(usedTable);

        let remainTable = this.tableRepository.get().remain;
        if (remainTable < usedTable) {
            this.logger.warn(`table remain ${remainTable} not enough`);
            throw new HttpException('table not enough', HttpStatus.BAD_REQUEST);
        }
        remainTable -= usedTable;
        this.tableRepository.update(remainTable);
        const booking = this.bookingRepository.create(customers, usedTable);

        return {
            ...booking,
            remain_tables: remainTable
        };
    }

    cancel(bookingNumber: string): CancelResponse {
        this.logger.log(`cancel booking number ${bookingNumber}`);
        const booking = this.bookingRepository.get(bookingNumber);
        if (!booking) {
            this.logger.warn(`booking ${bookingNumber} not found`);
            throw new HttpException('booking not found', HttpStatus.NOT_FOUND);
        }

        if (booking.cancel_date) {
            this.logger.warn(`booking ${bookingNumber} canceled already`);
            throw new HttpException('booking cancel already', HttpStatus.BAD_REQUEST);
        }

        let remainTable = this.tableRepository.get().remain;
        remainTable += booking.tables;
        this.bookingRepository.cancel(bookingNumber);
        this.tableRepository.update(remainTable);

        return {
            freed_tables: booking.tables,
            remain_tables: remainTable
        }
    }

    get(bookingNumber: string): BookingModel {
        const booking = this.bookingRepository.get(bookingNumber);
        if (!booking) {
            this.logger.warn(`booking ${bookingNumber} not found`);
            throw new HttpException('booking not found', HttpStatus.NOT_FOUND);
        }

        return {
            ...booking,
            remain_tables: this.tableRepository.get().remain
        }
    }
}