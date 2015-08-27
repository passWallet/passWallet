FROM node:0.10-onbuild

# No idea why but need this line for docker to create a proper build
RUN npm install -g npm
RUN npm install -g gulp bower gulp-imagemin
RUN npm install
RUN gulp prod

CMD node server.js

EXPOSE 5000
