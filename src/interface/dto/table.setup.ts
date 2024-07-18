import { IsPositive } from "class-validator";

export class TableSetupDto {
    @IsPositive()
    total_table: number;
}