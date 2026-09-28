/**
 * 插件组合包 - 入口文件
 * hello-plugin/
 * ├── package.json       # 【插件的“身份证”与入口声明】核心作用是通过自定义字段 dsh.bundle（或 cordis.bundle）向 Harness 框架声明“我是一个插件包”
 * ├── cordis.patch.yml   # 【插件的“配置补丁层”】负责定义该插件运行所需的具体环境参数（如监听端口、API 密钥、数据库表名等）
 * └── index.js           # 【插件的“逻辑实现体”】负责编写具体的业务逻辑
 */
export const name = 'hello-plugin'

export function apply() {
  console.log('[hello-plugin] plugin loaded!')
}
