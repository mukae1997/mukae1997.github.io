# 快速开始 / Quick Start

## ✅ 完成的功能

你的网站现在支持从CSV文件读取配置，不再需要在HTML代码中手动编写内容！

### 📝 两个主要的CSV配置文件

1. **个人信息** - `src/data/personal-info.csv`
   - 姓名、职位、简介、统计数据等

2. **项目列表** - `src/data/projects.csv`  
   - 25个项目的完整信息
   - 自动生成项目卡片

---

## 🚀 如何修改内容

### 方法1：修改个人信息

1. 打开 `src/data/personal-info.csv`
2. 编辑 `value_en` 和 `value_cn` 列
3. 保存文件
4. 刷新浏览器

**示例：修改姓名**
```csv
name,ZHANG SAN,张三
```

---

### 方法2：修改项目

1. 打开 `src/data/projects.csv`
2. 编辑任意项目行或添加新项目
3. 保存文件
4. 重启开发服务器（`npm run dev`）

**示例：添加新项目**
```csv
My Project,Collaborator,Category,cover.jpg,,,开始日期,2026,Company,"Unity, C#",Developer
```

---

## 📂 项目结构

```
src/
├── data/
│   ├── personal-info.csv    ← 个人信息配置
│   └── projects.csv          ← 项目列表配置
├── pages/
│   ├── index.astro           ← 首页（使用 personal-info.csv）
│   └── projects/
│       └── index.astro       ← 项目页（使用 projects.csv）
└── ...

public/
└── images/
    └── projects/
        ├── 1001-nights/
        │   └── cover.png
        ├── ai-nushu/
        │   └── cover.png
        └── ...
```

---

## 🎨 添加项目图片

1. 在 `public/images/projects/` 创建项目文件夹
2. 文件夹名称使用小写字母和连字符
3. 添加 `cover.png` 或 `cover.jpg`

**示例：**
```
public/images/projects/
└── my-new-project/
    └── cover.png
```

**然后在CSV中引用：**
```csv
My New Project,...,cover.png,...
```

---

## 🔧 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## ⚠️ 注意事项

1. **CSV格式**
   - 不要删除表头（第一行）
   - 包含逗号的字段要用双引号包裹：`"Unity, three.js"`
   - 保持正确的列数

2. **项目排序**
   - 项目按 `年份` 字段降序排列（新的在前）

3. **修改后**
   - 个人信息修改后刷新即可
   - 项目信息修改后需要重启服务器

---

## 📖 详细文档

查看 `CONFIG-GUIDE.md` 了解更多配置选项和技术细节。

---

## 🎉 开始使用

```bash
cd f:\workspace\2026-02-person-website
npm run dev
```

然后访问：
- 首页：http://localhost:4323/
- 项目页：http://localhost:4323/projects/

祝使用愉快！🚀
