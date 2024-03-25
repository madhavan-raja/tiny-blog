FROM node:18-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app

RUN npm install

COPY . .

CMD ["npm", "run", "start"]

EXPOSE 8080