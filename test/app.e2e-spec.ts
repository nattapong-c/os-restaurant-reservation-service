import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  });

  const TOTAL_TABLE = 5;

  it('POST v1/table, not send request body', async () => {
    const result = await request(app.getHttpServer())
      .post('/v1/table')

    const error = JSON.parse(result.error['text'])
    expect(error.message[0]).toBe('table must be a positive number');
    expect(result.status).toBe(400);
  });

  it('POST v1/table, missing table body', async () => {
    const result = await request(app.getHttpServer())
      .post('/v1/table')
      .send({
        other: 'test'
      })

    const error = JSON.parse(result.error['text'])
    expect(error.message[0]).toBe('table must be a positive number');
    expect(result.status).toBe(400);
  });

  it('POST v1/table, setup success', async () => {
    const result = await request(app.getHttpServer())
      .post('/v1/table')
      .send({
        table: TOTAL_TABLE
      });

    expect(result.body.data.total).toBe(5);
    expect(result.body.data.remain).toBe(5);
  });

  it('POST v1/booking, missing customer body', async () => {
    const result = await request(app.getHttpServer())
      .post('/v1/booking')

    const error = JSON.parse(result.error['text'])
    expect(error.message[0]).toBe('customer must be a positive number');
    expect(result.status).toBe(400);
  });

  it('POST v1/booking, reserve 1 table success', async () => {
    const result = await request(app.getHttpServer())
      .post('/v1/booking')
      .send({
        customer: 3
      });

    expect(result.body.data.customers).toBe(3);
    expect(result.body.data.tables).toBe(1);
    expect(result.body.data.remain_tables).toBe(4);
    expect(result.body.data.booking_number).toBe('OS0001');
  });

  it('POST v1/booking, reserve 1 table success', async () => {
    const result = await request(app.getHttpServer())
      .post('/v1/booking')
      .send({
        customer: 2
      });

    expect(result.body.data.customers).toBe(2);
    expect(result.body.data.tables).toBe(1);
    expect(result.body.data.remain_tables).toBe(3);
    expect(result.body.data.booking_number).toBe('OS0002');
  });

  it('POST v1/booking, reserve 3 tables success', async () => {
    const result = await request(app.getHttpServer())
      .post('/v1/booking')
      .send({
        customer: 11
      });

    expect(result.body.data.customers).toBe(11);
    expect(result.body.data.tables).toBe(3);
    expect(result.body.data.remain_tables).toBe(0);
    expect(result.body.data.booking_number).toBe('OS0003');
  });

  it('POST v1/booking, reserve 1 table full', async () => {
    const result = await request(app.getHttpServer())
      .post('/v1/booking')
      .send({
        customer: 1
      });

    const error = JSON.parse(result.error['text'])
    expect(error.message).toBe('table not enough');
    expect(result.status).toBe(400);
  });

  it('GET v1/booking/{booking_number}, get booking info not found', async () => {
    const result = await request(app.getHttpServer())
      .get('/v1/booking/OS0099');
    const error = JSON.parse(result.error['text'])
    expect(error.message).toBe('booking not found');
    expect(result.status).toBe(404);
  });

  it('GET v1/booking/{booking_number}, get booking info success', async () => {
    const result = await request(app.getHttpServer())
      .get('/v1/booking/OS0002');
    expect(result.body.data.customers).toBe(2);
    expect(result.body.data.remain_tables).toBe(0);
    expect(result.body.data.booking_number).toBe('OS0002');
  });

  it('DELETE v1/booking/{booking_number}, cancel booking not found', async () => {
    const result = await request(app.getHttpServer())
      .delete('/v1/booking/OS0099');
    const error = JSON.parse(result.error['text'])
    expect(error.message).toBe('booking not found');
    expect(result.status).toBe(404);
  })

  it('DELETE v1/booking/{booking_number}, cancel booking OS0002 success', async () => {
    const result = await request(app.getHttpServer())
      .delete('/v1/booking/OS0002');
    expect(result.body.data.freed_tables).toBe(1);
    expect(result.body.data.remain_tables).toBe(1);
  });

  it('DELETE v1/booking/{booking_number}, cancel booking OS0003 success', async () => {
    const result = await request(app.getHttpServer())
      .delete('/v1/booking/OS0003');
    expect(result.body.data.freed_tables).toBe(3);
    expect(result.body.data.remain_tables).toBe(4);
  });

  it('DELETE v1/booking/{booking_number}, cancel booking already', async () => {
    const result = await request(app.getHttpServer())
      .delete('/v1/booking/OS0002');
    const error = JSON.parse(result.error['text'])
    expect(error.message).toBe('booking cancel already');
    expect(result.status).toBe(400);
  })
});
