FROM node:14-slim

WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 9002

CMD ["npm", "start"]