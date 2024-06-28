FROM node:20-alpine as base


# Stage Server
FROM base as backend-builder
RUN corepack enable
WORKDIR /services
# COPY --from=builder /app/node_modules ./node_modules
COPY ./services .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile 
EXPOSE 3000
# RUN  npm install 
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --production --frozen-lockfile
CMD ["pnpm", "dev"]

# CMD ["npm","run", "dev"]

# Stage Server
FROM base as frontend-builder
RUN corepack enable
# ENV VITE_DOCKER='Hola Docker'
WORKDIR /web
# COPY --from=builder /app/node_modules ./node_modules
COPY ./web .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
# RUN  npm install
EXPOSE 5173
CMD ["pnpm", "dev"]
# CMD ["npm","run", "dev"]