# Use Node.js LTS
FROM node:18-slim

# Install Chromium deps
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libgtk-3-0 \
    libxshmfence1 \
    libnspr4 \
    libappindicator3-1 \
    libayatana-appindicator1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

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