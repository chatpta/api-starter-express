FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# RUN npm install
# For production install from package-lock.json
RUN npm install

# Bundle app source
COPY . .

# Set node env
ENV NODE_ENV=production
ENV SECRET_PATH=/usr/src/app/secrets


EXPOSE 40000
CMD [ "node", "./bin/www" ]
