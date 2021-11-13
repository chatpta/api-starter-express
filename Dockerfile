FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# RUN npm install
# For production install from package-lock.json
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "./bin/www" ]
