# Use Node.js LTS version
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/admin-client/package*.json ./apps/admin-client/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build admin-client

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/apps/admin-client/.next ./.next
COPY --from=builder /app/apps/admin-client/public ./public
COPY --from=builder /app/apps/admin-client/package*.json ./
COPY --from=builder /app/apps/admin-client/next.config.js ./

# Install production dependencies only
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"] 