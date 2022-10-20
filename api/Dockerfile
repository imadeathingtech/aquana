FROM node:lts 
WORKDIR /usr/src/app
COPY /api/package*.json /usr/src/app/
RUN npm install
COPY /api /usr/src/app
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
