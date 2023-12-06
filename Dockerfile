FROM node:18

ARG port=8080

WORKDIR /usr/flightsAPI

COPY package.json ./

RUN rm -rf node_modules && npm install && npm cache clean --force

COPY . .

ENV PORT=$port

EXPOSE $port

CMD ["npm", "start"]