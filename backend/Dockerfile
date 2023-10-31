# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy your app source code into the container
COPY . .

# # Copy the static files from the front/build directory
# COPY /front/build /front/build

# Expose the port that your application will run on
EXPOSE 3000

# Define the command to run your application
CMD [ "node", "app.js" ]
