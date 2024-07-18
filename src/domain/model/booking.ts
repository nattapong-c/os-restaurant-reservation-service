export interface BookingResponse {
    booking_number: string;
    customers: number;
    booking_date: Date;
    tables: number;
    remain_tables?: number;
}

export interface BookingModel extends BookingResponse {
    id: string;
    cancel_date?: Date;
}