# Dockerfile for server service

FROM node:20.14.0-alpine

# Install wget (if not already installed) to download wait-for-it.sh
RUN apk add --no-cache wget

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Download wait-for-it.sh script from GitHub
RUN wget -O /usr/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Set DATABASE_URL during build phase
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Generate Prisma client
RUN npx prisma generate

# Script to wait for MySQL and then apply migrations
CMD /usr/wait-for-it.sh mysql:3307 -- npx prisma db seed

EXPOSE 3000
