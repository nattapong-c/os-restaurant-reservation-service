import { Body, Controller, Delete, Get, Logger, Param, Post } from "@nestjs/common";

import { BookingService } from "../application/booking.service";
import { BookingReserveDto } from "./dto/booking.reserve";
import { Response } from "../domain/model/response";

@Controller('v1/booking')
export class BookingController {
    private readonly logger = new Logger(BookingController.name);

    constructor(
        private readonly bookingService: BookingService
    ) { }

    @Post()
    reserve(@Body() body: BookingReserveDto) {
        this.logger.log('request to reserve table');
        const result = this.bookingService.reserve(body.customer);

        return new Response().setData(result);
    }

    @Delete(':booking_number')
    cancel(@Param('booking_number') bookingNumber: string) {
        this.logger.log('request to cancel booking');
        const result = this.bookingService.cancel(bookingNumber);

        return new Response().setData(result)
    }

    @Get(':booking_number')
    get(@Param('booking_number') bookingNumber: string) {
        this.logger.log('request to get booking info');
        const result = this.bookingService.get(bookingNumber);

        return new Response().setData(result);
    }
}