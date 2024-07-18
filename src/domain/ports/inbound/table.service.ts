import { TableModel } from "src/domain/model/table";

export interface TableServiceInterface {
    setup(total: number): TableModel;
}