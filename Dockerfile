FROM nginx AS base
WORKDIR /usr/share/nginx/html
EXPOSE 80

#FROM npm AS build
#WORKDIR /build
#COPY . .
#RUN npm install
#ARG MODE=production
#RUN npm run generate

FROM base AS final
COPY dist .
