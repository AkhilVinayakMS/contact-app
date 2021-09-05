FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
# COPY package-lock.json ./
RUN npm cache clean --force

RUN npm install 

# add app
COPY . ./

# start app
CMD ["npm", "start"]