# 个人网站上线说明

## 先处理密钥

你已经在聊天里贴过密钥，建议到供应商控制台重新生成一个新 key，并撤销旧 key。

不要把真实 key 写进 `ai-guide.html`、`script.js`、`server.js` 或任何会被浏览器下载的文件。上线时只放在部署平台的环境变量里。

## 本地测试

1. 复制 `.env.example` 为 `.env.local`。
2. 在 `.env.local` 填入服务端环境变量：

```env
GUIDE_API_KEY=你的导览助手服务端密钥
NIAN_API_KEY=你的念念服务端密钥
AI_BASE_URL=https://api.deepseek.com
AI_MODEL=deepseek-chat
```

3. 启动站点：

```bash
npm start
```

4. 打开：

```text
http://127.0.0.1:8787/
http://127.0.0.1:8787/ai-guide.html
```

## 部署平台设置

这个站点需要 Node 服务，因为 `/api/chat` 会在服务端安全转发 AI 请求。不要只按静态站点部署。

四个项目页已经放在主站仓库的 `projects/` 目录下，`server.js` 使用线上可部署的相对路径：

```text
/project/islesoul/  -> projects/islesoul/
/project/garden/    -> projects/garden/
/project/guanxia/   -> projects/guanxia/
/project/ai-video/  -> projects/ai-video/
```

部署配置：

```text
Build command: 留空
Start command: npm start
Port: 使用平台自动注入的 PORT
```

环境变量：

```env
GUIDE_API_KEY=你的导览助手服务端密钥
NIAN_API_KEY=你的念念服务端密钥
AI_BASE_URL=https://api.deepseek.com
AI_MODEL=deepseek-chat
GUIDE_TEMPERATURE=0.68
GUIDE_MAX_TOKENS=520
NIAN_TEMPERATURE=0.85
NIAN_MAX_TOKENS=180
```

## 上线前检查

- 用 `http://127.0.0.1:8787/api/status` 确认 `hasGuideKey` 是 `true`。
- 用 `AI GUIDE` 发一条问题，确认状态变成“AI 在线”。
- 用 `/project/islesoul/`、`/project/garden/`、`/project/guanxia/`、`/project/ai-video/` 检查所有项目页都能打开。
- 上传 GitHub 前确认没有 `.env.local`，也没有单个超过 100MB 的文件。
