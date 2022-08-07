# 常见问题

## 如何授权
官方暂未提供token获取方式，也没有bot专用的token，目前有两种方式取得授权：

### 使用Fiddler、Charles等工具手动抓取
已登录状态下，做一些需要授权的操作（例如发送一条消息），找到相应记录，在Authentication处获取Token：
![token](https://s2.loli.net/2022/08/03/GeoVTkn2Cg91hw6.jpg)

代码中通过`setToken`方法设置（不需要"Bearer "部分）:
```javascript
client.setToken('你的Token');
```

暂不清楚该token的有效期与相应的刷新接口，从实际使用来看有效期非常长。

### 使用v1登录接口（不推荐）
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

## 如何获取据点ID
网页端进入据点，地址栏后为据点英文或数字ID：

![英文ID](https://s2.loli.net/2022/08/03/SV3xuU7p6qgjcPo.jpg)

**消息订阅必须使用据点的数字ID**，点击右侧据点封面，地址栏将会显示数字ID:

![点击右侧据点封面](https://s2.loli.net/2022/08/03/4NL2nJGH7bU6YDl.jpg)

![数字ID](https://s2.loli.net/2022/08/03/pwUD4Rn7cgFPWBj.jpg)

## 如何获取话题/节点ID
通过`MewClient.getNodeInfo`方法获取：

**[get-node-and-topic-info.js](https://github.com/PamisuMyon/mewbot-demo/blob/main/src/starter/-3-get-node-and-topic-info.js)**

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

## 有现成的bot可以用吗

请查看示例仓库[mewbot-demo](https://github.com/PamisuMyon/mewbot-demo)，包含一个完整的示例bot实现，配置部署后即可使用，也可以在其基础上扩展。现有功能：
- 🎲掷骰子
- 🐱来点猫猫
- 🐶来点狗狗
- 🔍查询各类信息
- 💪给猫猫加油

## 没有我要用的Mew API怎么办

目前没有做到百分百覆盖Mew的API，如果没有您需要的API，请提Issue或到[不是机器人](https://mew.fun/n/not_a_robot)据点中反馈。

您也可以手动抓取到API格式后，使用封装好的[MewClient.request](documents/api/classes/MewClient.md#request)发起请求，该方法会帮您处理好Mew API的授权、请求头、请求格式、响应格式等等。参考示例：[给猫猫加油](https://github.com/PamisuMyon/mewbot-demo/blob/main/src/bot/repliers/kudos-replier.ts)
