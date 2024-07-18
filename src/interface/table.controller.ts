import { Body, Controller, Logger, Post } from "@nestjs/common";

import { TableService } from "src/application/table.service";
import { Response } from "src/domain/model/response";
import { TableSetupDto } from "./dto/table.setup";

@Controller('v1/table')
export class TableController {
    private readonly logger = new Logger(TableController.name);
    constructor(
        private readonly tableService: TableService
    ) { }

    @Post()
    setup(@Body() body: TableSetupDto) {
        this.logger.log('request to setup table');

        const result = this.tableService.setup(body.table);
        return new Response().setData(result);
    }
}