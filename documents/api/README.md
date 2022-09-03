mewbot

# mewbot

## Table of contents

### Interfaces

- [BotConfig](interfaces/BotConfig.md)
- [TopicsConfig](interfaces/TopicsConfig.md)
- [TopicConfig](interfaces/TopicConfig.md)
- [ReplierConfig](interfaces/ReplierConfig.md)
- [Account](interfaces/Account.md)
- [IBot](interfaces/IBot.md)
- [InitOptions](interfaces/InitOptions.md)
- [ServerImageInfo](interfaces/ServerImageInfo.md)
- [IServerImageDao](interfaces/IServerImageDao.md)
- [TestInfo](interfaces/TestInfo.md)
- [ReplyResult](interfaces/ReplyResult.md)
- [TestParams](interfaces/TestParams.md)
- [MatryoshkaTestInfo](interfaces/MatryoshkaTestInfo.md)
- [CheckResult](interfaces/CheckResult.md)
- [IBotStorage](interfaces/IBotStorage.md)
- [ConnectOptions](interfaces/ConnectOptions.md)
- [Result](interfaces/Result.md)
- [CommonObjects](interfaces/CommonObjects.md)
- [ObjectEntries](interfaces/ObjectEntries.md)
- [ErrorBody](interfaces/ErrorBody.md)
- [Stamps](interfaces/Stamps.md)
- [Stamp](interfaces/Stamp.md)
- [Reaction](interfaces/Reaction.md)
- [Dispatch](interfaces/Dispatch.md)
- [UserTyping](interfaces/UserTyping.md)
- [Media](interfaces/Media.md)
- [Engagement](interfaces/Engagement.md)
- [Message](interfaces/Message.md)
- [STSToken](interfaces/STSToken.md)
- [MediaImageInfo](interfaces/MediaImageInfo.md)
- [Direct](interfaces/Direct.md)
- [OutgoingMessage](interfaces/OutgoingMessage.md)
- [Node](interfaces/Node.md)
- [Mod](interfaces/Mod.md)
- [Role](interfaces/Role.md)
- [Joinquestion](interfaces/Joinquestion.md)
- [Topic](interfaces/Topic.md)
- [Member](interfaces/Member.md)
- [OutgoingNode](interfaces/OutgoingNode.md)
- [OutgoingTopic](interfaces/OutgoingTopic.md)
- [Thought](interfaces/Thought.md)
- [OutgoingThought](interfaces/OutgoingThought.md)
- [Post](interfaces/Post.md)
- [Content](interfaces/Content.md)
- [Embed](interfaces/Embed.md)
- [Comment](interfaces/Comment.md)
- [OutgoingComment](interfaces/OutgoingComment.md)
- [Auth](interfaces/Auth.md)
- [User](interfaces/User.md)
- [OutgoingMe](interfaces/OutgoingMe.md)

### Enumerations

- [MesageReplyMode](enums/MesageReplyMode.md)
- [LogLevel](enums/LogLevel.md)
- [AuthMode](enums/AuthMode.md)
- [ConnectStatus](enums/ConnectStatus.md)
- [DispatchEvent](enums/DispatchEvent.md)
- [PermissionFlag](enums/PermissionFlag.md)

### Variables

- [defaultConfig](README.md#defaultconfig)
- [NoConfidence](README.md#noconfidence)
- [HalfConfidence](README.md#halfconfidence)
- [FullConfidence](README.md#fullconfidence)
- [Replied](README.md#replied)
- [ReplyFailed](README.md#replyfailed)
- [logger](README.md#logger)
- [ApiHost](README.md#apihost)
- [WsHost](README.md#wshost)
- [Constants](README.md#constants)

### Classes

- [Defender](classes/Defender.md)
- [MewBot](classes/MewBot.md)
- [Replier](classes/Replier.md)
- [MatryoshkaReplier](classes/MatryoshkaReplier.md)
- [Spam](classes/Spam.md)
- [FileStorage](classes/FileStorage.md)
- [FileUtil](classes/FileUtil.md)
- [Logger](classes/Logger.md)
- [NetUtil](classes/NetUtil.md)
- [Util](classes/Util.md)
- [MewClient](classes/MewClient.md)
- [WsHandler](classes/WsHandler.md)

### Type Aliases

- [ReplierPickFunction](README.md#replierpickfunction)
- [NodeMemberActivityChange](README.md#nodememberactivitychange)
- [Thoughts](README.md#thoughts)
- [Comments](README.md#comments)

### Functions

- [setLogger](README.md#setlogger)
- [getHeaders](README.md#getheaders)
- [getWsHeaders](README.md#getwsheaders)
- [initConnectOptions](README.md#initconnectoptions)
- [refine](README.md#refine)

## Variables

### defaultConfig

• `Const` **defaultConfig**: `Required`<[`BotConfig`](interfaces/BotConfig.md)\>

默认配置

___

### NoConfidence

• `Const` **NoConfidence**: [`TestInfo`](interfaces/TestInfo.md)

___

### HalfConfidence

• `Const` **HalfConfidence**: [`TestInfo`](interfaces/TestInfo.md)

___

### FullConfidence

• `Const` **FullConfidence**: [`TestInfo`](interfaces/TestInfo.md)

___

### Replied

• `Const` **Replied**: [`ReplyResult`](interfaces/ReplyResult.md)

___

### ReplyFailed

• `Const` **ReplyFailed**: [`ReplyResult`](interfaces/ReplyResult.md)

___

### logger

• **logger**: [`Logger`](classes/Logger.md)

___

### ApiHost

• `Const` **ApiHost**: ``"https://api.mew.fun"``

___

### WsHost

• `Const` **WsHost**: ``"wss://gateway.mew.fun/socket.io/?EIO=4&transport=websocket"``

___

### Constants

• `Const` **Constants**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `MaxMessageContentLength` | `number` |

## Type Aliases

### ReplierPickFunction

Ƭ **ReplierPickFunction**: (`repliers`: [`Replier`](classes/Replier.md)[], `msg`: [`Message`](interfaces/Message.md), `params`: [`TestParams`](interfaces/TestParams.md)) => `Promise`<[`TestInfo`](interfaces/TestInfo.md) \| `undefined`\>

#### Type declaration

▸ (`repliers`, `msg`, `params`): `Promise`<[`TestInfo`](interfaces/TestInfo.md) \| `undefined`\>

回复器挑选函数，用于挑选当前最匹配的回复器

##### Parameters

| Name | Type |
| :------ | :------ |
| `repliers` | [`Replier`](classes/Replier.md)[] |
| `msg` | [`Message`](interfaces/Message.md) |
| `params` | [`TestParams`](interfaces/TestParams.md) |

##### Returns

`Promise`<[`TestInfo`](interfaces/TestInfo.md) \| `undefined`\>

___

### NodeMemberActivityChange

Ƭ **NodeMemberActivityChange**: [`ObjectEntries`](interfaces/ObjectEntries.md)<[`User`](interfaces/User.md)\> & { `memeber_info`: `Record`<`string`, `Partial`<[`Member`](interfaces/Member.md)\>\>  }

___

### Thoughts

Ƭ **Thoughts**: [`ObjectEntries`](interfaces/ObjectEntries.md)<[`Thought`](interfaces/Thought.md)\> & { `memeber_info`: `Record`<`string`, `Partial`<[`Member`](interfaces/Member.md)\>\>  }

___

### Comments

Ƭ **Comments**: [`ObjectEntries`](interfaces/ObjectEntries.md)<[`Comment`](interfaces/Comment.md)\>

## Functions

### setLogger

▸ **setLogger**(`l`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | [`Logger`](classes/Logger.md) |

#### Returns

`void`

___

### getHeaders

▸ **getHeaders**(): `Record`<`string`, `any`\>

#### Returns

`Record`<`string`, `any`\>

___

### getWsHeaders

▸ **getWsHeaders**(): `Record`<`string`, `any`\>

#### Returns

`Record`<`string`, `any`\>

___

### initConnectOptions

▸ **initConnectOptions**(`options?`): [`ConnectOptions`](interfaces/ConnectOptions.md)

初始化MewClient连接选项（内部自动调用）

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`ConnectOptions`](interfaces/ConnectOptions.md)\> |

#### Returns

[`ConnectOptions`](interfaces/ConnectOptions.md)

___

### refine

▸ **refine**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Message`](interfaces/Message.md) |

#### Returns

`void`
