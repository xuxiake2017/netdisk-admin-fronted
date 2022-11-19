FROM node:alpine as node
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn --registry https://registry.npmmirror.com \
  && yarn run build
FROM nginx:alpine as nginx
COPY --from=node /usr/src/app/dist /usr/share/nginx/html/dist
RUN mv /usr/share/nginx/html/dist /usr/share/nginx/html/admin
