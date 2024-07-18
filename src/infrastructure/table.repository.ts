import { Logger } from "@nestjs/common";

import { TableModel } from "src/domain/model/table";
import { TableRepositoryInterface } from "../domain/ports/outbound/table.repository";

export class TableRepository implements TableRepositoryInterface {
    private readonly logger = new Logger(TableRepository.name);
    private table: TableModel = {
        total: 0,
        remain: 0
    };

    setup(total: number, remain: number): TableModel {
        this.logger.log('setup number of table');
        this.logger.debug('total table');
        this.logger.debug(total);

        this.logger.debug('remain table');
        this.logger.debug(remain);

        this.table = {
            total,
            remain
        }

        return this.table;
    }

    get(): TableModel {
        this.logger.log('get table info');
        return this.table;
    }
}