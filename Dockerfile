FROM node:alpine3.18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 4000

# Start the application
CMD [ "npm", "run", "dev" ]