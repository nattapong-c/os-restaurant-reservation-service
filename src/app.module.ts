import { Module } from '@nestjs/common';

import { TableService } from './application/table.service';
import { TableRepositoryInterface } from './domain/ports/outbound/table.repository';
import { TableRepository } from './infrastructure/table.repository';
import { TableController } from './interface/table.controller';
import { BookingRepositoryInterface } from './domain/ports/outbound/booking.repository';
import { BookingRepository } from './infrastructure/booking.repository';

@Module({
  imports: [],
  controllers: [TableController],
  providers: [
    TableService,
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
