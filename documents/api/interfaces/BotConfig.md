[mewbot](../README.md) / BotConfig

# Interface: BotConfig

bot配置项，默认配置参考 [defaultConfig](../README.md#defaultconfig)

大部分配置支持在bot运行时动态刷新，参考[IBotStorage](IBotStorage.md) [FileStorage](../classes/FileStorage.md)

## Table of contents

### Properties

- [alias](BotConfig.md#alias)
- [triggers](BotConfig.md#triggers)
- [replySelf](BotConfig.md#replyself)
- [replyDM](BotConfig.md#replydm)
- [messageReplyMode](BotConfig.md#messagereplymode)
- [messageProcessInterval](BotConfig.md#messageprocessinterval)
- [nodes](BotConfig.md#nodes)
- [topics](BotConfig.md#topics)
- [hints](BotConfig.md#hints)
- [defender](BotConfig.md#defender)

## Properties

### alias

• `Optional` **alias**: `string`[]

bot别名，在判断@bot时与bot的账号、用户名等效

___

### triggers

• **triggers**: `Object`

群聊中触发bot的方式

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `boolean` | at模式，@MEWID |
| `name` | `boolean` | at模式，@昵称 |
| `alias` | `boolean` | at模式，@别名 |
| `mention` | `boolean` | at模式，预留未来可能会有的官方@功能 |
| `reply` | `boolean` | 回复模式，回复bot的消息将触发bot |
| `command` | `boolean` | 识别指令模式    该模式开启时，只要有匹配的回复器即可触发，具体匹配逻辑由回复器自定义。可实现传统的指令模式bot，也可用于识别特定内容并执行相关操作。 |

___

### replySelf

• `Optional` **replySelf**: `boolean`

是否回复群聊中来自自己的消息，可用于只有一个账号时的调试（回复自身消息时不触发）

为`true`时，可能会被自身发出的回复消息触发死循环，关闭BotConfig.triggers.name与BotConfig.triggers.command可避免大部分情况

___

### replyDM

• `Optional` **replyDM**: `boolean`

是否回复私聊消息

___

### messageReplyMode

• `Optional` **messageReplyMode**: [`MesageReplyMode`](../enums/MesageReplyMode.md)

回复功能模式

___

### messageProcessInterval

• `Optional` **messageProcessInterval**: `number`

消息处理间隔（毫喵）

___

### nodes

• **nodes**: `string`[]

订阅据点，将会收到来自这些据点的消息

___

### topics

• **topics**: [`TopicsConfig`](TopicsConfig.md)

话题（节点）功能静态配置

群聊中仅回复已配置话题中的消息，同时通过此配置实现话题中的功能定制

___

### hints

• `Optional` **hints**: `Object`

提示文本

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `replierUnavailable` | `string`[] | 回复器在此话题/节点不可用 |
| `fallback` | `string`[] | 缺省回答 |

___

### defender

• `Optional` **defender**: `Object`

防御机制，用来避免短时间内被频繁刷屏，例如两个bot互相回复陷入死循环

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | ``1500`` | 连击生效间隔 |
| `threshold` | ``10`` | 防御连击阈值，达到此阈值时将对方加入屏蔽列表 |
