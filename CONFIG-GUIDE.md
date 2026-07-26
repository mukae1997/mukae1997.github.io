# 配置指南 / Configuration Guide

## 个人信息配置 / Personal Information Configuration

现在你可以通过编辑CSV文件来轻松修改个人网站信息，无需直接修改代码！

### 配置文件位置
📄 `src/data/personal-info.csv`

### CSV文件格式说明

CSV文件包含三列：
- `field`: 字段名（不要修改）
- `value_en`: 英文内容（可以修改）
- `value_cn`: 中文内容（可以修改）

### 可配置的字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `name` | 姓名 | XU CHUYAN / 徐楚燕 |
| `role_1` | 职位1 | Creative Technologist |
| `role_2` | 职位2 | Game Developer |
| `role_3` | 职位3 | Interactive Artist |
| `bio` | 个人简介 | Specializing in... |
| `stat_years_value` | 年份统计数值 | 5+ |
| `stat_years_label` | 年份统计标签 | Years |
| `stat_publications_value` | 论文数值 | 3 |
| `stat_publications_label` | 论文标签 | Publications |
| `stat_exhibitions_value` | 展览数值 | 6+ |
| `stat_exhibitions_label` | 展览标签 | Exhibitions |
| `stat_projects_value` | 项目数值 | 10+ |
| `stat_projects_label` | 项目标签 | Projects |

### 修改步骤

1. **打开CSV文件**
   ```
   src/data/personal-info.csv
   ```

2. **编辑内容**
   - 只修改 `value_en` 和 `value_cn` 列的内容
   - 不要修改 `field` 列的名称
   - 如果内容包含逗号，请用双引号包裹，例如：`"Hello, World"`

3. **保存文件**
   - 保存后，重启开发服务器或重新构建项目

4. **查看效果**
   - 刷新浏览器页面即可看到更新

### 注意事项

⚠️ **重要提示：**
- 保持CSV文件格式正确，每行必须有三个字段
- 不要删除任何行，只修改内容
- 如果内容包含逗号、引号或换行符，请用双引号包裹
- 修改后需要重启开发服务器才能看到变化

### 示例：修改姓名

修改前：
```csv
name,XU CHUYAN,徐楚燕
```

修改后：
```csv
name,ZHANG SAN,张三
```

### 示例：修改简介

修改前：
```csv
bio,"Specializing in AI-driven experiences, Unity development, and real-time visual effects",专注于 AI 驱动体验、Unity 开发和实时视觉效果
```

修改后：
```csv
bio,"Full-stack developer with passion for web technologies, machine learning, and creative coding",全栈开发者，热爱网络技术、机器学习和创意编程
```

---

## 项目配置 / Projects Configuration

### 配置文件位置
📄 `src/data/projects.csv`

### CSV文件格式说明

项目CSV包含以下字段：

| 字段 | 说明 | 示例 |
|------|------|------|
| `Project Name` | 项目名称（必填） | 1001 Nights |
| `Slug` | URL标识符 | 1001-nights |
| `Display` | 是否在页面上显示 | true / false |
| `Featured` | 是否为精选项目 | true / false |
| `Artist/Collaborator` | 艺术家/合作者 | Ada Eden |
| `Category` | 项目类别 | AI-native Game |
| `Cover` | 封面图片文件名 | cover.png |
| `End Date` | 结束日期 | 2023年12月 |
| `Exhibition` | 展览信息 | Gamescom |
| `Publication` | 出版物/论文 | SIGGRAPH Asia 2023 |
| `Start Date` | 开始日期 | 2023年8月1日 |
| `年份` | 年份（用于排序）| 2023 |
| `所属工作经历` | 所属工作 | Freelance |
| `技术栈` | 使用的技术（逗号分隔）| "Unity, LLM" |
| `核心角色` | 你的角色 | Technical Lead |

### 🌟 Display 和 Featured 字段说明

这两个字段共同控制项目的显示方式：

#### `Display` 字段：
- **`true`**：项目会显示在网站上
- **`false`**：项目完全不显示（隐藏）

#### `Featured` 字段（仅当 Display=true 时生效）：
- **`true`**：显示为精选项目（Featured Projects）
  - 在页面顶部以卡片形式展示
  - 有图片、年份标签、完整信息
  - 适合有好的封面图片的重要项目

- **`false`**：显示为其他项目（Other Projects）
  - 在页面底部以列表形式展示
  - 只显示项目名称、年份、角色和技术栈
  - 适合没有合适图片或次要的项目

#### 组合示例：

| Display | Featured | 结果 |
|---------|----------|------|
| `true` | `true` | 精选项目（卡片显示） |
| `true` | `false` | 其他项目（列表显示） |
| `false` | （任意） | 不显示 |

### 修改步骤

1. **打开项目CSV文件**
   ```
   src/data/projects.csv
   ```

2. **编辑现有项目或添加新项目**
   - 修改现有行来更新项目信息
   - 在文件末尾添加新行来添加新项目
   - 确保所有字段都用逗号分隔
   - 如果字段包含逗号，用双引号包裹，例如：`"Unity, three.js"`

3. **保存文件**
   - 保存后，重启开发服务器或重新构建项目

4. **添加项目图片（可选）**
   - 在 `public/images/projects/` 下创建项目文件夹
   - 文件夹名称应该是项目名的小写字母和连字符版本
   - 例如：`1001-nights/cover.png`

### 示例：添加新项目

在CSV文件末尾添加：

```csv
My New Project,John Doe,Web App,cover.jpg,,,2023年12月,2026年1月,2026,Freelance · Developer,"React, Node.js",Full Stack Developer
```

### 注意事项

⚠️ **重要提示：**
- `年份` 字段用于排序，项目会按年份从新到旧显示
- 技术栈如果有多个，用逗号分隔并用双引号包裹：`"Unity, Notch, three.js"`
- 不要删除表头行（第一行）
- CSV格式错误会导致构建失败，请小心编辑

### 项目图片组织

```
public/images/projects/
├── 1001-nights/
│   └── cover.png
├── ai-nushu/
│   └── cover.png
├── hyborg-agency/
│   └── cover.png
└── your-project-name/
    └── cover.png
```

---

## 扩展功能

如果需要添加更多字段，可以：
1. 在CSV文件中添加新列
2. 在 `src/pages/index.astro` 或 `src/pages/projects/index.astro` 中相应位置使用新字段

### 技术细节

- CSV解析在Astro的服务器端执行（构建时）
- 数据会被注入到HTML中，同时用于生成3D笔记本的纹理
- 项目页面自动从CSV生成，无需手动编写HTML
- 支持中英文切换（如果你实现了语言切换功能）

---

有问题？查看源代码中的注释或参考 Astro 文档。
