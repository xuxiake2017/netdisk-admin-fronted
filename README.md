# Netdisk Admin

这个项目是 [x-netdisk](https://github.com/xuxiake2017/x-netdisk) 的后台管理页面

## 环境准备

安装依赖

```bash
pnpm install
```

### 开始项目

```bash
pnpm start
```

### 打包

```bash
pnpm build
```

### 使用 Docker

```bash
docker compose up -d --build
```

访问 <http://localhost:8888/admin/>。镜像采用两阶段构建：Node 构建静态文件，Nginx 仅托管管理端页面，不代理后端接口。

可通过 `WEB_PORT` 修改宿主机端口，例如：

```bash
WEB_PORT=8080 docker compose up -d --build
```
