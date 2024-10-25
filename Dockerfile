FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .
# COPY public public

ARG DATABASE_URL
ARG ALLOW_KEY

ENV DATABASE_URL=$DATABASE_URL
RUN bunx prisma db pull
RUN bunx prisma generate

CMD ["bun", "src/index.ts"]

EXPOSE 3000
