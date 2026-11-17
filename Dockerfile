# syntax=docker/dockerfile:1
#
# One image for every version of the docs.
#   - The current version builds from this checkout (SOURCE=local, the default).
#   - An older version builds from its release tag (SOURCE=tag, REF=v1.1.1):
#     the tag is cloned here, so it needs no Dockerfile of its own.
# Same steps as the old Nixpacks plan: install with dev deps, build, prune.

ARG NODE_VERSION=22.23.4
ARG SOURCE=local

# --- Where the code comes from ------------------------------------------------

FROM node:${NODE_VERSION}-alpine AS source-local
WORKDIR /app
COPY . .

FROM node:${NODE_VERSION}-alpine AS source-tag
ARG REPO=https://github.com/AloneDay-91/LumenUI.git
ARG REF
RUN apk add --no-cache git \
  && test -n "$REF" || (echo "Set REF to a release tag, like v1.1.1" && exit 1) \
  && git clone --depth 1 --branch "$REF" "$REPO" /app \
  && rm -rf /app/.git

FROM source-${SOURCE} AS source

# --- Build --------------------------------------------------------------------

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# Read at build time by the version menu: "1.1=https://…,1.0=https://…".
ARG NEXT_PUBLIC_DOCS_ARCHIVES=""
ENV NEXT_PUBLIC_DOCS_ARCHIVES=$NEXT_PUBLIC_DOCS_ARCHIVES
COPY --from=source /app ./
# The husky prepare script has no git here; `|| true` in package.json covers it.
RUN npm ci --include=dev \
  && npm run build \
  && npm prune --omit=dev

# --- Run ----------------------------------------------------------------------

# The whole app stays in the image: llms.txt and /md read page sources at request time.
FROM node:${NODE_VERSION}-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  HOSTNAME=0.0.0.0 \
  PORT=3000
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 3000
CMD ["npm", "run", "start"]
