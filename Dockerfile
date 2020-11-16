### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /ticket-ui
COPY . .
RUN npm install
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /ticket-ui/dist/ticket-ui/ /usr/share/nginx/html