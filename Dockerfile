# Step 1: Use an official Node.js image as the base for building the app
FROM node:16-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production using Vite
RUN npm run build

# Step 2: Use Nginx to serve the built React app
FROM nginx:alpine

# Copy the build output from the build stage to the Nginx server's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to access the app in the container
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
