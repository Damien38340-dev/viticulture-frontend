# Use a base image for Node.js to build Angular
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy Angular project files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use Nginx to serve the built files
FROM nginx:alpine

# Copy built files to Nginx's HTML folder
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80
