FROM node:16.13.0

WORKDIR /app

COPY package*.json /app/

RUN npm install -g nodemon

RUN npm install

RUN npm audit fix

COPY . .


EXPOSE 9090
