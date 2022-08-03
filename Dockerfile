FROM node

WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install --silent --force

# bundle app source
COPY . .

# run app
CMD ["npm", "start"]