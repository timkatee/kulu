# alpine chosen due to small size - based on growth and requirements others can
# be used - Kulu is currently tested on nodejs 14
FROM node:14.5
# create working directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .

EXPOSE 4000

CMD ["npm","start"]
