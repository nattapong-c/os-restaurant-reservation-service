import { Inject, Injectable, Logger } from "@nestjs/common";

import { TableModel } from "src/domain/model/table";
import { TableServiceInterface } from "../domain/ports/inbound/table.service";
import { TableRepositoryInterface } from "../domain/ports/outbound/table.repository";
import { BookingRepositoryInterface } from "../domain/ports/outbound/booking.repository";

@Injectable()
export class TableService implements TableServiceInterface {
    private readonly logger = new Logger(TableService.name);

    constructor(
        @Inject(TableRepositoryInterface)
        private readonly tableRepository: TableRepositoryInterface,
        @Inject(BookingRepositoryInterface)
        private readonly bookingRepository: BookingRepositoryInterface
    ) { }

    setup(total: number): TableModel {
        this.logger.log('setup table');
        this.logger.debug('total');
        this.logger.debug(total);

        const bookedTable = this.bookingRepository.getBookedTable();

        return this.tableRepository.setup(total, total - bookedTable);
    }
}