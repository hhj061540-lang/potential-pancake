FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5900

RUN apk add --no-cache wget

RUN wget -O /app/server.js \
    https://raw.githubusercontent.com/hhj061540-lang/potential-pancake/refs/heads/main/server.js

RUN npm install express

EXPOSE 5900

CMD ["node", "server.js"]
