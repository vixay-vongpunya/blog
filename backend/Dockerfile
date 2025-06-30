FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 4000
# using dev mode run

CMD ["./start.sh"]

# for prod, and run build first
# CMD ["node", "dist/index.js"]