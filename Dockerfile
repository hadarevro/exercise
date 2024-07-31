FROM node:14-alpine

WORKDIR /app

COPY ./api/package*.json ./

RUN npm install

COPY ./api .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]