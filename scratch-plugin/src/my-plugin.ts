/**
 * 通过 --patch overlay 加载本地插件
 */
import { Service, type Context } from '@deepseek-ai/cordis'

/**
 * ----------------------------
 * 一、问候工具
 * ----------------------------
 */
// import { defineTool } from '@deepseek-ai/dsh-tools'

// export const name = 'greet-tool'
// export const inject = ['tools']

// export function apply(ctx: Context) {
//   ctx.tools.register(defineTool({
//     name: 'greet',
//     description: 'Greet someone by name.',
//     parameters: {
//       name: { type: 'string', required: true, description: 'The name to greet' },
//     },
//     output: {
//       schema: { type: 'string' },
//       render: (_args, value) => [{ type: 'text', text: value }],
//     },
//     async execute(args) {
//       return `Hello, ${args.name}!`
//     },
//   }))
// }


/**
 * ----------------------------
 * 二、定义 Config 类型
 * 在插件中导出一个 Config 类型和同名的 Schemastery schema；默认值直接写在 schema 中
 * ----------------------------
 */
// import Schema from '@deepseek-ai/schemastery'

// export const name = 'my-plugin'

// export interface Config {
//   greeting: string
//   maxRetries: number
//   verbose?: boolean
// }

// export const Config: Schema<Config> = Schema.object({
//   greeting: Schema.string().default('Hello'),
//   maxRetries: Schema.number().default(3),
//   verbose: Schema.boolean().default(false),
// })

// export function apply(ctx: Context, config: Config) {
//   console.log(config.greeting)  // User value or schema default.
// }

/**
 * ----------------------------
 * 三、Schema 校验
 * 对于需要严格校验的场景，使用 Schemastery 定义 schema
 * ----------------------------
 */
// import Schema from '@deepseek-ai/schemastery'

// export const name = 'validated-plugin'

// export interface Config {
//   apiKey: string
//   timeout: number
//   mode: 'fast' | 'accurate'
// }

// export const Config = Schema.object({
//   apiKey: Schema.string().required(),
//   timeout: Schema.number().default(30000),
//   mode: Schema.union(['fast', 'accurate']).default('fast'),
// })

// export function apply(ctx: Context, config: Config) {
//   // config is validated and type-safe.
// }

/**
 * ----------------------------
 * 四、提供服务
 * 使用 Service 基类
 * ----------------------------
 */
// declare module '@deepseek-ai/cordis' {
//   interface Context {
//     metrics: MetricsService
//   }
// }
// export default class MetricsService extends Service {
//   static inject = ['llm']  // A service may depend on other services.

//   constructor(ctx: Context) {
//     super(ctx, 'metrics')  // 'metrics' is the service name.
//   }

//   // Public service method.
//   record(event: string, value: number) { /* ... */ }
// }
// 消费方使用上面的服务：
// export const inject = ['metrics']

// export function apply(ctx: Context) {
//   ctx.metrics.record('tool_call', 1)
// }

/**
 * ----------------------------
 * 五、事件系统 - 示例：日志插件
 * 这个插件记录工具调用和工具结果
 * ----------------------------
 */
import '@deepseek-ai/dsh-tools'

export const name = 'tool-logger'

export function apply(ctx: Context) {
  // 通过监听 tools/result 事件，回调处理
  ctx.on('tools/result', (exec, result) => {
    // 记录工具调用
    console.log(`[tool] ${exec.name}(${JSON.stringify(exec.arguments)})`)
    const text = result.content
      .map(block => block.type === 'text' ? block.text : '')
      .join('')
    // 记录工具结果
    console.log(`[tool result] ${text.slice(0, 100)}`)
  })
}
