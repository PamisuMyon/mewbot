# mewbot

mewbot是一个面向[Mew Online](https://mew.fun)的Node.js库，能让您更轻松地与Mew的API交互，搭建自己的bot。
核心功能：
- 简单易用且稳定的消息监听（WebSocket交互封装）
- bot所需API，如发送各类消息、想法、评论等等。

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

### 如何授权
官方暂未提供token获取方式，也没有bot专用的token，目前有两种方式取得授权：

#### 使用Fiddler、Charles等工具手动抓取
已登录状态下，做一些需要授权的操作（例如发送一条消息），找到相应记录，在Authentication处获取Token：
![token](https://s2.loli.net/2022/08/03/GeoVTkn2Cg91hw6.jpg)

代码中通过`setToken`方法设置（不需要"Bearer "部分）:
```javascript
client.setToken('你的Token');
```

暂不清楚该token的有效期与相应的刷新接口，从实际使用来看有效期非常长。

#### 使用v1登录接口（不推荐）
```javascript
const auth = await this._client.login('账号', '密码');
if (auth.data) {
    logger.debug('Logged in.');
} else {
    logger.error('Login failed.');
    return;
}
```
登录成功后将自动设置授权信息，无需再次调用`setToken`。

官方已不再使用v1登录API，无法确保其长期可用。MewClient中暂时没有做v2登录接口的实现。

### 如何获取据点ID
网页端进入据点，地址栏后为据点英文或数字ID：

![英文ID](https://s2.loli.net/2022/08/03/SV3xuU7p6qgjcPo.jpg)

**消息订阅必须使用据点的数字ID**，点击右侧据点封面，地址栏将会显示数字ID:

![点击右侧据点封面](https://s2.loli.net/2022/08/03/4NL2nJGH7bU6YDl.jpg)

![数字ID](https://s2.loli.net/2022/08/03/pwUD4Rn7cgFPWBj.jpg)

### 如何获取话题/节点ID
通过`MewClient.getNodeInfo`方法获取：

```javascript
import { logger, LogLevel, MewClient } from "mewbot";

(async () => {
    const client = new MewClient();
    const result = await client.getNodeInfo('not_a_robot');
    if (result.data) {
        console.dir(result.data);
        for (const topic of result.data.topics) {
            console.log(`${topic.name} : ${topic.id}`);
        }
    } else {
        console.log('获取据点信息失败')
    }
})();
// 调整日志等级，打印所有日志（可选）
logger.logLevel = LogLevel.Verbose;
```

授权不是必要的，仅在获取私密据点中的话题信息时，需要用户已加入该据点，并设置授权。

或者在[不是机器人](https://mew.fun/n/not_a_robot)据点的`🍄`节点中，通过指令`@bot 据点信息 [据点英文ID或数字ID]`来获取：

![据点信息](https://s2.loli.net/2022/08/03/dH4UcxoZLn5elCv.png)

### 有没有现成的bot可以用

请查看示例仓库[mewbot-demo](https://github.com/PamisuMyon/mewbot-demo)，包含一个完整的示例bot实现，配置部署后即可使用，也可以在其基础上扩展。现有功能：
- 掷骰子
- 来点猫猫
- 来点狗狗
- 查询各类信息

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
