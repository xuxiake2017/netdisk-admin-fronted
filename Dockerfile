# 构建阶段
FROM node:20-alpine AS build
WORKDIR /app

RUN npm install -g pnpm@10.32.1

COPY . .
RUN HUSKY=0 pnpm install --frozen-lockfile
RUN pnpm build

# 运行阶段
FROM nginx:1.27-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/admin

EXPOSE 80
