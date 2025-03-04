FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Environment variable
ENV NODE_ENV=production

# Build
RUN npm run build

# Open port
EXPOSE 8000

# Run in production mode
CMD ["npm", "run", "start"]