# GitHub Pages 部署指南

## 🚀 自动部署设置

### 1. 仓库设置
1. 将项目推送到GitHub仓库
2. 进入仓库的 **Settings** → **Pages**
3. 在 **Source** 中选择 **GitHub Actions**

### 2. 工作流配置
项目已包含 `.github/workflows/deploy.yml` 文件，会自动：
- 在推送到 `main` 分支时触发部署
- 安装依赖并构建Vue项目
- 将构建结果部署到GitHub Pages

### 3. 访问地址
部署成功后，可通过以下地址访问：
```
https://[你的用户名].github.io/homework4/
```

## 🔧 本地测试部署版本

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 📝 重要配置说明

### Vite配置 (vite.config.js)
- `base`: 设置为仓库名，确保资源路径正确
- `host: '0.0.0.0'`: 允许网络访问
- `outDir: 'dist'`: 构建输出目录

### 路由配置
如果使用Vue Router的history模式，GitHub Pages可能需要额外配置。当前项目使用hash模式，无需额外设置。

## 🛠️ 故障排除

### 常见问题
1. **404错误**: 检查base路径是否正确设置
2. **资源加载失败**: 确认assets路径配置
3. **路由问题**: 考虑使用hash模式路由

### 调试步骤
1. 检查GitHub Actions构建日志
2. 验证dist目录内容
3. 测试本地preview版本

## 🔄 手动部署（备选方案）

如果自动部署失败，可以手动部署：

```bash
# 1. 构建项目
npm run build

# 2. 进入构建目录
cd dist

# 3. 初始化git仓库
git init
git add -A
git commit -m 'deploy'

# 4. 推送到gh-pages分支
git push -f git@github.com:[用户名]/homework4.git main:gh-pages
```

## 📊 部署状态监控

- 在仓库的 **Actions** 标签页查看部署状态
- 绿色✅表示部署成功
- 红色❌表示部署失败，点击查看详细日志

## 🌐 自定义域名（可选）

如果有自定义域名：
1. 在仓库根目录创建 `public/CNAME` 文件
2. 文件内容为你的域名，如：`example.com`
3. 在域名DNS设置中添加CNAME记录指向GitHub Pages

---

*部署完成后，你的众智科学知识可视化平台就可以在线访问了！* 