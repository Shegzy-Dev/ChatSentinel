# Use Node.js LTS
FROM node:18-alpine

# Create app dir
WORKDIR /app

# Copy package files first (use Docker cache)
COPY package*.json ./

# Install deps
RUN npm install

# Copy rest of your files
COPY . .

# Expose no port (it’s headless)
# If you ever add a web UI, you’d EXPOSE 3000 or so

# Run your bot
CMD ["node", "index.js"]