# Use Node.js LTS
FROM node:18

# Create app dir
WORKDIR /app

# Copy package files first (use Docker cache)
COPY package*.json ./

# Install deps
RUN npm install --production

# Copy rest of your files
COPY . .

# EXPOSE 3000

# Run your bot
CMD ["npm", "start"]