import { IsPositive } from "class-validator";

export class BookingReserveDto {
    @IsPositive()
    customer: number;
}