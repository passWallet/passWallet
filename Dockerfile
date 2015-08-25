FROM node:0.10-onbuild

RUN npm install -g npm
RUN npm install -g gulp bower
RUN gulp build

CMD node server.js

EXPOSE 5000
