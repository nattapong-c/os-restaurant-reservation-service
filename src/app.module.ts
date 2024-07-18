import { Module } from '@nestjs/common';

import { TableService } from './application/table.service';
import { TableRepositoryInterface } from './domain/ports/outbound/table.repository';
import { TableRepository } from './infrastructure/table.repository';
import { TableController } from './interface/table.controller';
import { BookingRepositoryInterface } from './domain/ports/outbound/booking.repository';
import { BookingRepository } from './infrastructure/booking.repository';
import { BookingController } from './interface/booking.controller';
import { BookingService } from './application/booking.service';

@Module({
  imports: [],
  controllers: [TableController, BookingController],
  providers: [
    TableService,
    BookingService,
    {
      provide: TableRepositoryInterface,
      useClass: TableRepository
    },
    {
      provide: BookingRepositoryInterface,
      useClass: BookingRepository
    }
  ],
})
export class AppModule { }
