FROM node:alpine

WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm install pm2 -g
RUN npm run build


WORKDIR /usr/src/app/dist
EXPOSE 4000

CMD ["pm2", "start", "app.js"]
RUN tail -f /dev/null