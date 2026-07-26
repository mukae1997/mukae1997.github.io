# 📚 项目显示配置指南

## 🎯 快速开始

在 `src/data/projects.csv` 文件中，找到 `Display` 列：

```csv
Project Name,Slug,Display,...
1001 Nights,1001-nights,true,...    ← 显示
某展厅,exhibition,false,...          ← 隐藏
```

### 显示项目
将 `Display` 列改为 `true`

### 隐藏项目  
将 `Display` 列改为 `false`

## 📊 当前配置状态

### ✅ 显示中的项目（10个）

| 序号 | 项目名称 | Slug | 年份 |
|-----|---------|------|------|
| 1 | XiXi | xixi | 2025 |
| 2 | Steam VR Diving | vr-diving | 2025 |
| 3 | 1001 Nights | 1001-nights | 2023 |
| 4 | AI Nüshu | ai-nushu | 2023 |
| 5 | Hyborg Agency | hyborg-agency | 2023 |
| 6 | 寻仙记 | journey-immortals | 2022 |
| 7 | 南苑秋风 | autumn-wind-nanyuan | 2021 |
| 8 | 舞影随形 | dance-shadows | 2021 |
| 9 | 人间、空间、时间和人 | humans-space-time | 2021 |
| 10 | 西河剑器 | swords-west-river | 2019 |

### 📦 隐藏中的项目（15个）

所有 Display=false 的项目都不会显示在网站上。

## 🛠️ 常见操作示例

### 1️⃣ 添加新项目到网站

1. 打开 `src/data/projects.csv`
2. 找到要显示的项目
3. 将 `Display` 列改为 `true`
4. 保存文件
5. 刷新网站即可看到

**示例：**
```csv
# 修改前
VJ,vj-project,false,...

# 修改后
VJ,vj-project,true,...   ← 现在会显示
```

### 2️⃣ 从网站移除项目

1. 打开 `src/data/projects.csv`
2. 找到要隐藏的项目
3. 将 `Display` 列改为 `false`
4. 保存文件

### 3️⃣ 批量修改

使用Excel或文本编辑器打开CSV文件，批量修改Display列。

## 📂 文件位置

```
src/data/
├── projects.csv                      ← 主配置文件（修改这里）
├── PROJECTS_README.md                ← 详细说明文档
└── projects-display-config.json      ← JSON配置（备用，目前不使用）
```

## ⚙️ 技术说明

代码在 `src/pages/projects/index.astro` 中会自动过滤：
- 只显示 `Display` 列为 `true` 的项目
- 按年份降序排序

## 💡 提示

- Display列接受的值：`true`, `TRUE`, `1` （都表示显示）
- 其他任何值都会隐藏项目
- 修改后需要刷新页面才能看到效果
- 建议定期备份CSV文件

## 🆘 问题排查

**问题：修改后没有生效**
- 检查是否保存了CSV文件
- 确认Display列的值是 `true` 而不是 `True` 或 `TRUE`（推荐用小写）
- 刷新浏览器并清除缓存

**问题：项目显示但没有图片**
- 检查 `Slug` 列是否填写
- 确认 `/public/images/projects/{slug}/cover.png` 文件是否存在
- 查看浏览器控制台是否有图片加载错误

## 📞 需要帮助？

查看 `src/data/PROJECTS_README.md` 获取更详细的配置说明。
