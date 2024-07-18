import { Logger } from "@nestjs/common";

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

}