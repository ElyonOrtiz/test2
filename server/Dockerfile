FROM node:20.14.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npx prisma generate

RUN npx prisma migrate dev

RUN npx prisma db seed

CMD ["npm", "run", "dev"]