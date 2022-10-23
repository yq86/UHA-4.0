FROM node:16.13.0

WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN npm audit fix

COPY . .


EXPOSE 4200
