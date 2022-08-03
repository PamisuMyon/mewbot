## 关于
mewbot是一个面向[Mew Online](https://mew.fun)的Node.js库，能让您更轻松地与Mew的API交互，搭建自己的bot。
核心功能：
- 简单易用且稳定的消息监听（对Websocket交互封装）
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

// 订阅据点: '不是机器人'
const subcriptionNodes = ['100554577263091712'];
// 监听话题/节点: '🍄'
const listenTopics = ['219353468583456768'];

// 创建MewClient并监听事件
const client = new MewClient();
client.on('message_create', data => {
    console.log('接收到消息：');
    console.dir(data);
    if (data.topic_id in listenTopics) {
        client.sendTextMessage(data.topic_id, '喵喵喵！');
    }
});

// 设置授权token
client.setToken('你的token');
// 开启连接
client.connect({ subcriptionNodes });

// 调整日志等级，打印所有日志（可选）
logger.logLevel = LogLevel.Verbose;
```

更多使用示例与完整的bot实现，请查看示例仓库：

## 文档

