# HTTPS 自签名证书部署文档

## 背景

后端服务部署在 `https://106.15.7.132:8443`，使用自签名 HTTPS 证书。前端需要适配开发环境和生产环境。

## 开发环境

### 配置文件

`vite.config.js` 中配置 Vite 代理，将 `/dev-api` 转发到后端 HTTPS 地址，并设置 `secure: false` 跳过自签名证书校验：

```js
const baseUrl = 'https://106.15.7.132:8443'

server: {
  port: 3000,
  host: true,
  open: true,
  proxy: {
    '/dev-api': {
      target: baseUrl,
      changeOrigin: true,
      secure: false,  // 关键：忽略自签名证书
      rewrite: (p) => p.replace(/^\/dev-api/, '')
    }
  }
}
```

### 启动

```bash
npm run dev
```

浏览器访问 `http://localhost:3000`，API 请求由 Vite 代理转发到后端 HTTPS。

## 生产环境

### 架构

前端不直接请求后端 HTTPS 地址，而是通过 Nginx 反向代理，避免浏览器证书信任问题：

```
浏览器 ——HTTPS——> Nginx(自签名证书) ——HTTPS——> 后端服务
  |                    |
  |--- 静态文件 -------|--- /prod-api 代理转发
```

### 前端配置

`.env.production` 使用相对路径：

```
VITE_APP_BASE_API = '/prod-api'
```

### 构建

```bash
npm run build:prod
```

将 `dist` 目录内容上传到服务器 `/www/wwwroot/106.15.7.132_3000/dist`。

### Nginx 配置（宝塔面板）

在宝塔面板中站点配置文件如下：

```nginx
server
{
    listen 3000;
    listen 7443 ssl http2;
    server_name 106.15.7.132_3000;
    index index.html;
    root /www/wwwroot/106.15.7.132_3000/dist;

    location / {
        try_files $uri /index.html;
    }

    # API 反向代理
    location /prod-api/ {
        proxy_pass https://127.0.0.1:8443/;
        proxy_ssl_verify off;  # Nginx 到后端忽略自签名证书
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SSL 证书配置（与后端共用同一套自签名证书）
    ssl_certificate     /www/server/panel/vhost/cert/106.15.7.132_3000/fullchain.pem;
    ssl_certificate_key /www/server/panel/vhost/cert/106.15.7.132_3000/privkey.pem;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497 https://$host$request_uri;

    # 静态资源缓存
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
        expires 30d;
    }
    location ~ .*\.(js|css)?$ {
        expires 12h;
    }
}
```

### 访问方式

| 协议 | 地址 | 说明 |
|------|------|------|
| HTTP | `http://106.15.7.132:3000` | 明文传输，无需证书信任 |
| HTTPS | `https://106.15.7.132:7443` | 加密传输，首次访问需在浏览器中信任证书 |

HTTPS 方式首次访问时浏览器会提示证书不受信任，点击"高级" → "继续访问"即可。

## 关键配置说明

| 配置项 | 位置 | 作用 |
|--------|------|------|
| `secure: false` | vite.config.js | 开发环境 Vite 代理忽略自签名证书 |
| `proxy_ssl_verify off` | Nginx 配置 | Nginx 到后端的代理忽略自签名证书 |
| `VITE_APP_BASE_API = '/prod-api'` | .env.production | 生产环境用相对路径，由 Nginx 代理 |

## 安全性说明

- 自签名证书的 TLS 加密强度与 CA 证书一致，数据传输是加密的
- 浏览器不信任自签名证书是因为无法验证身份，不影响加密本身
- 移动端 App 通过内置证书（SSL Pinning）做校验，安全性更高
