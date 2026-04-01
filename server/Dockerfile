# Base image
FROM node:lts-alpine AS base

WORKDIR /server

COPY package*.json .

# Build stage
FROM base AS development

RUN npm ci && npm cache clean --force

COPY . .

# Production stage
FROM base AS production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 appuser

ENV NODE_ENV=production

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

RUN chown -R appuser:nodejs /server
USER appuser
