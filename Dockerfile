FROM node:20.15-alpine
WORKDIR /service

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]