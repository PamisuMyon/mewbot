# mewbot
[![](https://img.shields.io/badge/dynamic/json?color=%234279ea&label=Mew%20Online%20🤖&prefix=%E6%88%90%E5%91%98%20&query=%24.member_count&url=https%3A%2F%2Fapi.mew.fun%2Fapi%2Fv1%2Fnodes%2Fnot_a_robot&labelColor=30549f)](https://mew.fun/n/not_a_robot)
[![](https://img.shields.io/npm/v/mewbot.svg?maxAge=3600)](https://www.npmjs.com/package/mewbot)

mewbot是一个面向[Mew Online](https://mew.fun)的Node.js库，能让您更轻松地与Mew的API交互，搭建自己的bot。包含客户端实现**MewClient**与bot业务框架实现**MewBot**。

**MewClient**是Mew的客户端实现，特点：

- 💬简单易用的且稳定的消息监听（WebSocket API封装、消息解析、事件分发、断线重连）
- 🔌bot所需的HTTP API，覆盖范围包括据点、话题/节点、想法、评论、消息、情绪、媒体等等
- 📜API文档

**MewBot**(WIP)实现了基础bot业务，特点：

- 🏠灵活的部署配置，功能可单独拆分至具体话题/节点，并在不同的话题/节点可以有不同的表现
- 💡支持多种响应模式，@bot模式、回复模式、指令模式及混搭
- 🔗异步消息处理与易扩展的回复链
- 🧊防刷屏与指令冷却机制

您可以根据需求，选用MewClient来轻松快速地实现与Mew的交互、在此基础上开发您的bot框架；或选用MewBot来省去繁杂的基础业务实现工作，直接构建一个具有丰富功能的bot。

[🔗示例bot | nana bot(WIP) | MewBot(WIP)](https://github.com/PamisuMyon/mewbot-demo)

## 快速上手

### 安装
使用npm或yarn：

```sh-session
npm i mewbot
```

并确保您的工程使用ESM，例如：

**package.json**
```json
{
  ...
  "type": "module",
  ...
}
```

**tsconfig.json**
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ES2020",
        "moduleResolution": "Node",
        ...
    },
    ...
}
```

### 使用MewClient

**[getting-started.js](https://github.com/PamisuMyon/mewbot-demo/blob/main/src/starter/-2-getting-started.js)**

```javascript
import { logger, LogLevel, MewClient } from "mewbot";

// 订阅据点ID: '不是机器人'
const subcriptionNodes = ['100554577263091712'];
// 监听话题/节点ID: '🍄'
const listenTopics = ['219353468583456768'];

// 创建MewClient并监听'message_create'事件
const client = new MewClient();
client.on('message_create', async (data) => {
    console.log('接收到消息：');
    console.dir(data);
    // 如果监听话题中收到了含有🍅的消息，则回复🥕
    if (listenTopics.indexOf(data.topic_id) != -1) {
        if (data.content && data.content.indexOf('🍅') != -1)
            await client.sendTextMessage(data.topic_id, '🥕🥕🥕！');
    }
});

// 设置授权Token
client.setToken('你的Token');

// 开启连接
client.connect({ subcriptionNodes });

// 调整日志等级，打印所有日志（可选）
logger.logLevel = LogLevel.Verbose;
```

这样就实现了一个简单的bot，运行后在🍄节点发送🍅，bot将会回复🥕🥕🥕！

`message_create`事件在收到新消息时触发，可使用多个`client.on`来监听不同类型的事件，[所有事件类型](/documents/Events.md)。

关于授权Token、据点ID、话题/节点ID的获取请参照[常见问题](#常见问题)

部署在其他据点时，请确保您是目标据点的管理员，或已取得目标据点管理员的同意。

### 使用MewBot

WIP，将在稳定后迁移到本仓库，在这之前您可以通过克隆代码来使用：[mewbot-demo](https://github.com/PamisuMyon/mewbot-demo)

## 常见问题
- [如何取得授权Token](./documents/FAQ.md#如何授权)
- [如何获取据点ID](./documents/FAQ.md#如何获取据点ID)
- [如何获取话题/节点ID](./documents/FAQ.md#如何获取话题节点ID)
- [有现成的bot可以用吗](./documents/FAQ.md#有现成的bot可以用吗)
- [更多...](./documents/FAQ.md)

## 文档
- [MewClient](/documents/api/classes/MewClient.md)
- [事件](/documents/Events.md)
- [API Doc](/documents/api/README.md)

API使用示例可参考测试代码：

- 事件：[dispatch-test.ts](test/dispatch-test.ts)
- 消息：[message.test.ts](test/message.test.ts)
- 想法：[thought.test.ts](test/thought.test.ts)
- 据点：[node.test.ts](test/node.test.ts)
- 管理：[manage.test.ts](test/manage.test.ts)
- 杂项：[misc.test.ts](test/misc.test.ts)

## 开发
一些关于本仓库的开发说明。

### 补充Mew API
目前所有Mew相关的API均放在[mew-client.ts](src/mew/mew-client.ts)中，向其中补充API时，请注意以下几点：
- 所有HTTP请求方法返回值统一为`Promise<Result<T>>`，参考[Result](documents/api/interfaces/Result.md)、[request](documents/api/classes/MewClient.md#request)
- 完善文档注释，并使用`@category`为方法分类
- 编写单元测试并确保通过

### 单元测试
需要在test文件夹下创建**account.json**，格式：

```json
{
    "token": "你的Token",
    "username": "或者Mew ID",
    "password": "密码"
}
```
Token与账号密码二选一，推荐使用Token。

测试框架使用[mocha](https://mochajs.org/)，运行：

```sh-session
npm run test
```

本仓库中用作测试的媒体（图片、视频等）遵循CC0协议。

### 事件
仅包含通过WebSoceket下发的各类事件。使用[dispatch-test.ts](test/dispatch-test.ts)来测试，运行：

```sh-session
npm run test-dispatch
```

如果新增事件，需要修改如下文件：

- [dispatch.ts](src/mew/model/dispatch.ts)：事件中的数据类型
- [mew-client.ts](src/mew/mew-client.ts)：在类头部补充相关的事件定义，在`onDispatch`中补充对事件的分发。


### 日志
使用[logger.ts](src/commons/logger.ts)来统一输出日志。

### API文档

API文档位于`documents/api`下，使用[typedoc](http://typedoc.org/)自动生成：

```sh-session
npm run doc
```

其他文档需要手动更新。

## TODO
- 完善MewBot
- 封装图片、长文、视频、链接类型的想法发送方法
