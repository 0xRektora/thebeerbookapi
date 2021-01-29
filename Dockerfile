FROM node:14

WORKDIR /usr/src/app
COPY . ./
RUN CI=true
RUN npm install
RUN npm run build

EXPOSE 4000

CMD [ "node", "./dist/app.js" ]