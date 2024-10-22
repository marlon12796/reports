
ARG NODE_VERSION=22.3.0
ARG PNPM_VERSION=9.12.0

FROM node:${NODE_VERSION}-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app


FROM base as build

WORKDIR /usr/src/app
ARG IS_PRODUCTION=false
COPY package*.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
COPY . .
RUN pnpm drizzle-kit generate \
    && if [ "${IS_PRODUCTION}" = "true" ]; then \
    pnpm run build && pnpm drizzle-kit migrate; \
    fi


FROM deps as prod-deps
COPY --chown=node:node --from=build . .
RUN pnpm prune --prod

# .............................
# DEVELOPMENT 
#.................................
FROM base AS final-dev
WORKDIR /usr/src/app
COPY --from=build /usr/src/app ./

EXPOSE ${PORT}
CMD ["pnpm", "start:dev"]

# .............................
# PRODUCTION
#.................................
FROM base AS final-prod

WORKDIR /usr/src/app
ENV NODE_ENV=production
USER node

COPY --from=prod-deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=prod-deps --chown=node:node /usr/src/app/package.json ./
COPY --from=build --chown=node:node /usr/src/app/dist ./dist
COPY --from=build --chown=node:node /usr/src/app/drizzle ./drizzle

# Switch to root user to perform cleanup
USER root
RUN apk del --purge libc6-compat \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/* \
    && rm -rf /usr/src/app/.pnpm-store \
    && if [ -d "/pnpm/store/v3/files" ]; then pnpm store prune; fi

EXPOSE ${PORT}
# Switch back to node user
USER node
CMD ["pnpm", "start:prod"]
