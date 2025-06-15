# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/admin-server/package*.json ./apps/admin-server/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build admin-server

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start:prod", "admin-server"] 