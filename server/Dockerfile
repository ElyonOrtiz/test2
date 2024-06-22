# Dockerfile for server service

FROM node:20.14.0-alpine

# Install wget (if not already installed) to download wait-for-it.sh
RUN apk add --no-cache wget

WORKDIR /app

COPY package.json package-lock.json .env ./

RUN npm install

COPY . .

# Download wait-for-it.sh script from GitHub
RUN wget -O /usr/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Set environment variables
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET
ARG FRONT_END
ENV FRONT_END=$FRONT_END
ARG SECRET_KEY
ENV SECRET_KEY=$SECRET_KEY

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/schema.prisma  # Especifica explicitamente o schema

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "dev"]
