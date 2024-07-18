import { Test, TestingModule } from "@nestjs/testing";

import { TableRepositoryInterface } from "../domain/ports/outbound/table.repository";
import { TableRepository } from "./table.repository";

describe('Table Repository', () => {
    let tableRepository: TableRepositoryInterface;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: TableRepositoryInterface,
                    useClass: TableRepository
                }
            ]
        }).compile();

        tableRepository = app.get<TableRepositoryInterface>(TableRepositoryInterface);
    });

    it('setup table', () => {
        tableRepository.setup(10, 10);
        const result = tableRepository.get();
        expect(result.total).toBe(10);
        expect(result.remain).toBe(10);
    });

    it('update table remain', () => {
        tableRepository.update(5);
        const result = tableRepository.get();
        expect(result.total).toBe(10);
        expect(result.remain).toBe(5);
    });

});