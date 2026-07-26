# 🎨 使用自定义笔记本模型

## 📂 第一步：放置你的模型文件

把你的 GLB 模型文件放到这个文件夹：
```
public/models/notebook.glb
```

或者使用其他文件名，比如：
```
public/models/my-notebook.glb
```

---

## ⚙️ 第二步：修改配置

打开文件：`src/pages/index.astro`

找到这两行（在 `<script>` 标签开头）：

```typescript
const USE_CUSTOM_MODEL = true;  // 👈 设置为 true 使用自定义模型
const MODEL_PATH = '/models/notebook.glb'; // 👈 改成你的文件名
```

### 配置说明：

- `USE_CUSTOM_MODEL = true` - 使用自定义 GLB 模型
- `USE_CUSTOM_MODEL = false` - 使用代码生成的笔记本
- `MODEL_PATH` - 你的模型文件名（必须以 `/models/` 开头）

---

## 🎨 第三步：调整模型大小

如果模型太大或太小，找到这行：

```typescript
const scale = 6 / maxSize; // 👈 调整这个数字
```

- **数字越大** = 模型越大
- **数字越小** = 模型越小
- 建议范围：3 到 10

---

## 🚀 第四步：查看效果

1. 确保开发服务器正在运行：
   ```bash
   npm run dev
   ```

2. 打开浏览器：http://localhost:4321

3. 你应该看到：
   - 加载指示器（旋转动画）
   - 然后你的笔记本模型出现
   - 可以拖拽旋转、滚轮缩放

---

## 📝 推荐的 GLB 格式

### 从 Blender 导出 GLB：

1. 打开你的笔记本模型
2. `File` → `Export` → `glTF 2.0 (.glb)`
3. 设置：
   - Format: **GLB**
   - Include: ✅ Selected Objects (或 Visible Objects)
   - Transform: ✅ +Y Up
   - Geometry: ✅ Apply Modifiers
   - Compression: ✅ 可以启用压缩
4. Export

### 文件大小建议：
- 尽量保持在 **5MB 以下**
- 如果太大，可以：
  - 减少多边形数量
  - 压缩纹理
  - 使用 Draco 压缩

---

## 🐛 常见问题

### 1. 模型加载失败
❌ 浏览器控制台显示错误

✅ 检查：
- 文件确实在 `public/models/` 文件夹中
- 文件名在代码中正确（包括 `.glb` 扩展名）
- 文件名大小写匹配
- 文件是有效的 GLB 格式

### 2. 模型太大或太小
调整 `scale` 数值：
```typescript
const scale = 8 / maxSize; // 试试 4, 6, 8, 10
```

### 3. 模型位置不对
模型会自动居中，但如果还是不对：
```typescript
notebook.position.set(0, 0, 0); // 手动调整 x, y, z
```

### 4. 模型方向不对
调整初始旋转：
```typescript
notebook.rotation.set(-0.3, 0.15, 0.02); // 调整这些角度
```

### 5. 模型是黑色的
检查光照或材质：
```typescript
// 增加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
```

---

## 💡 快速测试

### 方法1：使用你的模型
```typescript
const USE_CUSTOM_MODEL = true;
const MODEL_PATH = '/models/notebook.glb';
```

### 方法2：切换回代码生成的笔记本
```typescript
const USE_CUSTOM_MODEL = false;
```

---

## 🎯 示例文件结构

```
public/
  └── models/
      ├── notebook.glb          ← 你的模型放这里
      ├── my-notebook.glb       ← 或这里
      └── README.md             ← 本文件
```

---

需要帮助？查看控制台日志：
- ✅ "Custom notebook model loaded successfully!" = 成功
- ❌ "Error loading model" = 失败（会自动使用备用笔记本）

祝你好运！🚀
