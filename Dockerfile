# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

RUN npm install -g npm@7.24.1

# Install dependencies
RUN npm install

# Install TypeScript
RUN npm install -g typescript

# Copy the rest of the application code to /app
COPY . .

# Build the TypeScript app
RUN npm run build

# Expose port 3000
EXPOSE 3000
 
# Start the app
CMD ["npm", "start"]
