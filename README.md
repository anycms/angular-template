# Angular 项目模板
> 项目使用 Angular 18 ,但是并没有完全去使用 `signal` 和 `standalone` 特性

- [ ] 约定项目目录结构
- [x] UnoCSS 集成
- [x] Proxy-Config 约定


## 约定项目目录结构
- TODO

## UnoCSS 集成
### 安装依赖
```bash
# unocss 支持
pnpm i --save-dev unocss @unocss/cli

# 预设
pnpm i --save-dev @unocss/preset-uno @unocss/preset-attributify
```

### 配置
- 创建 unocss.config.js
> 项目根目录添加 `unocss.config.js` 文件
```js
import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  cli: {
    entry: {
      patterns: [
        'src/**/*.html',
      ],
      outFile: 'src/uno.css'
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
  ],
})
```
- 配置 src/uno.css
> 根据 `unocss.config.js` , unocss 会创建 `src/uno.css` 文件

> 在 `angular.json` 中 引入 `uno.css` 
```json
# 主要在 build->option->styles 节点中添加 uno.css 如:
"styles": [
    "src/styles.scss",
    "src/uno.css"
],
```

> 也可以在 `src/styles.scss` 中导入`uno.css`

```css
@import url("uno.css");
```
### 集成工作流
> unocss 使用 `unocss --watch` 命令监听文件修改并且更新 uno.css , 本模板使用 npm-run-all 来并行运行 `ng s` 和 `unocss --watch`

- 安装 npm-run-all
```bash
pnpm i --save-dev npm-run-all
```
- 配置 npm script
> `package.json ` 修改 `scripts` 节点

```json
# ...省略前文

"scripts": {
    "ng-s": "ng serve --hmr",
    "unocss": "unocss --watch",
    "dev": "run-p ng-s unocss"
},
# ...省略后文

```
- 在项目中执行 `pnpm run start`


## Proxy-Config 约定
> 某些时候，需要连接远程服务器进行开发调试，通常情况下，由于是跨域问题，需要使用 proxy 解决跨域问题。

> angular 在开发模式下，使用 proxy 配置解决这个问题，具体文档：[Angular Proxy](https://angular.dev/tools/cli/serve#proxying-to-a-backend-server)
### 配置约定
- proxy.conf 文件根据不同的后端 `proxy-xx.conf` 存放在 /proxy 目录下
- 增加 `environment.proxy.ts` 文件存放代理配置常量, 通常, 远程的环境配置和 `environment.ts` 相同, 按需增加
- 在 `angular.json` 增加 `proxy` 的配置，因为开发模式大概率不会和 `production` 相同, 之后可以使用 `ng s -c proxy` 启动
- 在 `package.json` 增加调用 `proxy` 的启动配置
如：
```json
    "proxy-demo": "run-p unocss 'ng s -c proxy --proxy-config ./proxy/proxy-demo.json'"
```