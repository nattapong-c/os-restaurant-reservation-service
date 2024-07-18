import { IsPositive } from "class-validator";

export class TableSetupDto {
    @IsPositive()
    table: number;
}