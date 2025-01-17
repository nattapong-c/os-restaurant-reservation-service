<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

or

```bash
$ yarn install --frozen-lockfile
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running the app with Docker

Build image

```
  docker build -t restaurant-service:latest .
```

Run image

```
  docker run --name restaurant-service -p 3000:3000 -d restaurant-service:latest
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Environment Variables

- `PORT` custom service port (default: 3000)

## Packages in project

- class-transformer - transform body request object to class
- class-validator - validate body request
- uuid - generate UUID

## Folder Structure

In this project, It is base on haxagonal architecture design

```
  src
    ├── application               # Service files contain business logic
    ├── domain
          ├── model               # Model files, type, enum used in services
          ├── ports
                ├── inbound       # Interface files for services
                ├── outbound      # Interface files for repository
    ├── infrastructure            # Repository files for database or third-party api
    ├── interface                 # Controller files
          ├── dto                 # DTO files (request body and validation)
    ├── test                      # e2e test files
  └── README.md
```

## API Reference

#### Setup Table

```http
  POST /api/v1/table
```

JSON body

| Key     | Type     | Description                    |
| :------ | :------- | :----------------------------- |
| `table` | `number` | **Required**. Number of tables |

#### Reserve Table

```http
  POST /api/v1/booking
```

JSON body

| Key        | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `customer` | `number` | **Required**. Number of customers |

#### Cancel Booking

```http
  DELETE /api/v1/booking/{booking_number}
```

Param

| Key              | Type     | Description                               |
| :--------------- | :------- | :---------------------------------------- |
| `booking_number` | `string` | **Required**. Booking number (Ex. OS0001) |

JSON body

| Key        | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `customer` | `number` | **Required**. Number of customers |

#### Get Booking Info

```http
  GET /api/v1/booking/{booking_number}
```

Param

| Key              | Type     | Description                               |
| :--------------- | :------- | :---------------------------------------- |
| `booking_number` | `string` | **Required**. Booking number (Ex. OS0001) |
