FROM node:18

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 3000