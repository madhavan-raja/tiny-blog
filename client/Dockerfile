FROM node:18-alpine

ENV NODE_ENV development

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 3000