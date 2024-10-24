FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .
# COPY public public

CMD ["bun", "src/index.ts"]

EXPOSE 3000
