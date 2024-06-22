#!/bin/sh

# Wait for MySQL to be ready
/usr/wait-for-it.sh mysql:3306 --strict --timeout=30 -- echo "MySQL is up"

# Run migrations
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Seed the database
npx prisma db seed --schema=./prisma/schema.prisma

# Start the application
exec "$@"
