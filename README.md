# mewbot
[![](https://img.shields.io/badge/dynamic/json?color=%234279ea&label=Mew%20Online%20🤖&prefix=%E6%88%90%E5%91%98%20&query=%24.member_count&url=https%3A%2F%2Fapi.mew.fun%2Fapi%2Fv1%2Fnodes%2Fnot_a_robot&labelColor=30549f)](https://mew.fun/n/not_a_robot)
[![](https://img.shields.io/npm/v/mewbot.svg?maxAge=3600)](https://www.npmjs.com/package/mewbot)

mewbot是一个面向[Mew Online](https://mew.fun)的Node.js库，能让您更轻松地与Mew的API交互，搭建自己的bot。
核心功能：
- 简单易用且稳定的消息监听（WebSocket交互封装）
- bot所需API，包含消息、想法、评论、据点等相关的常用API

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


### 使用

```javascript
import { logger, LogLevel, MewClient } from "mewbot";

// 订阅据点ID: '不是机器人'
const subcriptionNodes = ['100554577263091712'];
// 监听话题/节点ID: '🍄'
const listenTopics = ['219353468583456768'];

// 创建MewClient并监听事件
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

## 常见问题
- [如何取得授权Token](./documents/FAQ.md#如何授权)
- [如何获取据点ID](./documents/FAQ.md#如何获取据点ID)
- [如何获取话题/节点ID](./documents/FAQ.md#如何获取话题节点ID)
- [有现成的bot可以用吗](./documents/FAQ.md#有现成的bot可以用吗)
- [更多...](./documents/FAQ.md)

## 文档
- [MewClient](/documents/Client.md)
- [事件](/documents/Events.md)

API使用示例可参考测试代码：

- 事件：[dispatch-test.ts](test/dispatch-test.ts)
- 消息：[message.test.ts](test/message.test.ts)
- 想法：[thought.test.ts](test/thought.test.ts)
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

- [message.ts](src/mew/model/message.ts)：事件中的数据类型
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
- 封装图片、长文、视频、链接类型的想法发送方法
- 补充据点管理相关API
