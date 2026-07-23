# 航价智采 AirPrice Intelligence

AI 驱动的机票价格趋势研判与采购决策展示网站。该项目面向企业差旅、票务采购和航线收益管理场景，以可交互的产品原型展示航价走势、模型研判、风险提示与采购建议。

## 在线演示

https://airprice-intelligence-cn.vjtfvhioo256799.chatgpt.site

## 主要内容

- 中文 / English 全站语言切换
- 3 条航线与 99 个唯一航班号切换
- 历史价格和预测趋势可视化
- LSTM、SARIMA、CatBoost 多模型说明
- 采购时机、节省空间和风险等级展示
- 企业合作方案与联系入口
- 桌面端和移动端响应式页面

> 当前版本是客户展示用的高保真产品原型。航班清单和历史观测整理自 `data.xlsx`；网站中的未来预期曲线用于展示产品交互，正式结果仍由现有 Python 预测程序计算。页面内容不构成购票或投资承诺。

## 技术栈

- React 19
- Next.js 16
- vinext / Vite
- TypeScript
- CSS 与 Canvas 图表
- Cloudflare Workers 兼容构建

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 代码结构

```text
app/                 网站页面、布局与样式
public/              分享预览图片等静态资源
build/               Sites 构建适配
worker/              Cloudflare Worker 入口
.openai/hosting.json Sites 托管项目配置
vite.config.ts       Vite / vinext 配置
package.json         依赖与运行命令
```

`db/`、`drizzle/` 和 `examples/d1/` 保留了后续接入持久化数据时需要的基础结构，当前展示页面不依赖数据库。

## 数据与模型说明

本仓库只包含客户展示网站源码和从 `data.xlsx` 提取的精简航班目录，不包含原始 Excel 数据、Word 技术文档或桌面版 Python 预测程序。网站中的模型指标与示例结果来自项目材料的整理，并在页面中以演示口径呈现。

## 手动上传 GitHub

1. 在 GitHub 新建一个空仓库，例如 `airprice-intelligence`。
2. 解压本源码包。
3. 在仓库页面选择 **Add file → Upload files**。
4. 上传解压后的全部文件和文件夹，然后提交。

注意：GitHub 网页上传时需要一并上传以点开头的 `.openai` 文件夹；不要上传本地生成的 `node_modules`、`dist`、`.vinext` 或 `.wrangler` 文件夹。
