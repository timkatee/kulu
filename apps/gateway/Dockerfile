FROM node:18.12.1-bullseye-slim AS builder
# Set working directory
WORKDIR /app
RUN npm install turbo -g
COPY . .
RUN turbo prune --scope=@uefora/gateway  --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18.12.1-bullseye-slim AS installer
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/full/ .
RUN npm install pnpm -g
#RUN npm install @prisma/client -g
RUN pnpm install

# Build the project
#COPY --from=builder /app/out/full/ .
#RUN pnpm --filter=@uefora/gateway run prisma:dbpull
#RUN pnpm --filter=@uefora/gateway run prisma:generate
RUN pnpm --filter=@uefora/gateway run build


FROM node:18.12.1-bullseye-slim AS runner
WORKDIR /app

COPY --from=installer /app/ .
RUN npm install pnpm -g
RUN pnpm install --frozen-lockfile --prod

EXPOSE 4000
EXPOSE 3000

CMD [ "node", "./apps/gateway/dist/src/main.js"]