import { TableModel } from "src/domain/model/table"

export interface TableRepositoryInterface {
    setup(total: number, remain: number): TableModel;
    get(): TableModel;
}

export const TableRepositoryInterface = Symbol('TableRepositoryInterface')