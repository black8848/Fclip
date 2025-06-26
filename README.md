# Fclip - 简易在线剪切板

Fclip 是一个简单的在线剪切板应用，允许用户保存文本内容，生成 4 位随机访问码，并通过该访问码在其他设备上查看内容。

## 功能特点

- 创建文本剪切板并自动生成 4 位随机访问码
- 通过访问码查看剪切板内容
- 浏览所有现有的剪切板
- 自动 30 天过期机制
- 响应式设计，适应各种设备

## 技术栈

- Next.js 15
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite 数据库 (开发环境)

## 本地开发

1. 克隆仓库

```bash
git clone https://github.com/your-username/fclip.git
cd fclip
```

2. 安装依赖

```bash
npm install
```

3. 设置数据库

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. 启动开发服务器

```bash
npm run dev
```

5. 在浏览器中访问 http://localhost:3000

## 部署到 Vercel

1. 将项目推送到 GitHub 仓库

2. 在 Vercel 上创建新项目，并连接到 GitHub 仓库

3. 部署完成后，您的应用将可以在 Vercel 分配的域名上访问

## 生产环境配置

对于生产环境，您可能需要使用更稳定的数据库服务，例如：

1. 修改`prisma/schema.prisma`以使用 PostgreSQL 等数据库
2. 在 Vercel 项目设置中添加数据库连接 URL 作为环境变量

## 许可证

MIT
