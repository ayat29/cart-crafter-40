# ---- Build stage ----
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first (better caching)
COPY package*.json ./

RUN npm install

# Copy the rest of the code
COPY . .

# Build React app
RUN npm run build


# ---- Serve stage ----
FROM node:18-alpine

WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the static server
CMD ["npx", "serve", "dist"]
