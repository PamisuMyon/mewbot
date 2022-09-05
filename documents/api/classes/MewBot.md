[mewbot](../README.md) / MewBot

# Class: MewBot

## 启动流程

- 初始化存储，参照 [init](../interfaces/IBotStorage.md#init)，默认不做任何操作
- 使用存储中读取到的授权信息进行授权
- 获取bot自身信息
- 从存储中读取bot配置，初始化回复器、屏蔽列表、防御机制等
- 连接到WebSocket服务，开启消息处理

## 消息处理

- 收到消息时，将其存入消息队列
- 从消息队列中取出消息，进行处理 [processMessages](MewBot.md#processmessages)
- 判断消息是否触发bot
- 挑选最合适的回复器，参照：[ReplierPickFunction](../README.md#replierpickfunction)、[pick01](Replier.md#pick01)、[test](Replier.md#test)  
- 执行回复器的[reply](Replier.md#reply)方法
- 回复器的reply方法中，调用 [reply](../interfaces/IBot.md#reply)、[replyText](../interfaces/IBot.md#replytext)、[replyImage](../interfaces/IBot.md#replyimage)、[replyStamp](../interfaces/IBot.md#replystamp)、[replyThought](../interfaces/IBot.md#replythought) 等方法进行回复

## 存储
[storage](MewBot.md#storage)用于处理bot所需的存储业务，参照[IBotStorage](../interfaces/IBotStorage.md)，默认的实现为[FileStorage](FileStorage.md)，你可以通过[InitOptions](../interfaces/InitOptions.md)来指定自己的存储实现。

默认使用文件形式实现，如果重写，需要处理的数据：
- 账号授权信息的获取
- bot配置的获取与刷新
- 屏蔽列表的获取与更新

MongoDB重写示例：[MongoStorage](https://github.com/PamisuMyon/nanabot/blob/main/src/storage.ts)

## Implements

- [`IBot`](../interfaces/IBot.md)

## Table of contents

### Properties

- [\_client](MewBot.md#_client)
- [\_storage](MewBot.md#_storage)
- [\_me](MewBot.md#_me)
- [\_names](MewBot.md#_names)
- [\_atRegex](MewBot.md#_atregex)
- [\_defender](MewBot.md#_defender)
- [\_msgQueue](MewBot.md#_msgqueue)
- [\_repliers](MewBot.md#_repliers)
- [\_pickFunc](MewBot.md#_pickfunc)

### Accessors

- [client](MewBot.md#client)
- [storage](MewBot.md#storage)
- [config](MewBot.md#config)

### Constructors

- [constructor](MewBot.md#constructor)

### Methods

- [launch](MewBot.md#launch)
- [refresh](MewBot.md#refresh)
- [initNames](MewBot.md#initnames)
- [initRepliers](MewBot.md#initrepliers)
- [processMessages](MewBot.md#processmessages)
- [doProcessMessage](MewBot.md#doprocessmessage)
- [isReplyMe](MewBot.md#isreplyme)
- [onReplierPreTest](MewBot.md#onreplierpretest)
- [onReplierPostReply](MewBot.md#onreplierpostreply)
- [getReplyTitle](MewBot.md#getreplytitle)
- [getReplyMessageId](MewBot.md#getreplymessageid)
- [reply](MewBot.md#reply)
- [replyText](MewBot.md#replytext)
- [replyStamp](MewBot.md#replystamp)
- [replyThought](MewBot.md#replythought)
- [replyImage](MewBot.md#replyimage)
- [replyImageWithCache](MewBot.md#replyimagewithcache)
- [sendImageWithCache](MewBot.md#sendimagewithcache)
- [handleImageWithCache](MewBot.md#handleimagewithcache)

## Properties

### \_client

• `Protected` **\_client**: [`MewClient`](MewClient.md)

___

### \_storage

• `Protected` **\_storage**: [`IBotStorage`](../interfaces/IBotStorage.md)

存储

___

### \_me

• `Protected` **\_me**: [`User`](../interfaces/User.md)

自身信息

___

### \_names

• `Protected` **\_names**: `string`[]

Mew ID、昵称、别名集合

___

### \_atRegex

• `Protected` **\_atRegex**: ``null`` \| `RegExp` = `null`

识别@

___

### \_defender

• `Protected` **\_defender**: [`Defender`](Defender.md)

防御机制

___

### \_msgQueue

• `Protected` **\_msgQueue**: [`Message`](../interfaces/Message.md)[]

消息队列，接收到的消息将存入该队列，按处理间隔逐个处理

___

### \_repliers

• `Protected` **\_repliers**: [`Replier`](Replier.md)[]

回复器集合

___

### \_pickFunc

• `Protected` **\_pickFunc**: [`ReplierPickFunction`](../README.md#replierpickfunction)

回复器挑选函数，内置实现参照 [pick01](Replier.md#pick01)（默认）, [pick](Replier.md#pick)

## Accessors

### client

• `get` **client**(): [`MewClient`](MewClient.md)

MewClient

#### Returns

[`MewClient`](MewClient.md)

#### Implementation of

IBot.client

___

### storage

• `get` **storage**(): [`IBotStorage`](../interfaces/IBotStorage.md)

存储

#### Returns

[`IBotStorage`](../interfaces/IBotStorage.md)

#### Implementation of

IBot.storage

___

### config

• `get` **config**(): `Required`<[`BotConfig`](../interfaces/BotConfig.md)\>

当前配置项

#### Returns

`Required`<[`BotConfig`](../interfaces/BotConfig.md)\>

#### Implementation of

IBot.config

## Constructors

### constructor

• **new MewBot**(`options?`)

初始化

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`InitOptions`](../interfaces/InitOptions.md) | 选项 |

## Methods

### launch

▸ **launch**(): `Promise`<`void`\>

启动

#### Returns

`Promise`<`void`\>

#### Implementation of

[IBot](../interfaces/IBot.md).[launch](../interfaces/IBot.md#launch)

___

### refresh

▸ **refresh**(): `Promise`<`void`\>

刷新，将会刷新配置项，重新初始化防御机制，重新初始化所有回复器

利用此方法可在bot运行时动态变更配置

#### Returns

`Promise`<`void`\>

#### Implementation of

[IBot](../interfaces/IBot.md).[refresh](../interfaces/IBot.md#refresh)

___

### initNames

▸ `Protected` **initNames**(): `void`

初始化名称，用于识别@ 消息

#### Returns

`void`

___

### initRepliers

▸ `Protected` **initRepliers**(): `Promise`<`void`\>

初始化所有回复器

#### Returns

`Promise`<`void`\>

___

### processMessages

▸ `Protected` **processMessages**(): `void`

处理消息队列

#### Returns

`void`

___

### doProcessMessage

▸ `Protected` **doProcessMessage**(`msg`): `Promise`<`void`\>

处理单条消息

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | [`Message`](../interfaces/Message.md) |

#### Returns

`Promise`<`void`\>

___

### isReplyMe

▸ `Protected` **isReplyMe**(`msg`): `boolean`

判断是否是回复我的消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | [`Message`](../interfaces/Message.md) | 消息 |

#### Returns

`boolean`

___

### onReplierPreTest

▸ `Protected` **onReplierPreTest**(`msg`): `Promise`<`void`\>

对消息进行回复器测试前调用

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | [`Message`](../interfaces/Message.md) | 消息 |

#### Returns

`Promise`<`void`\>

___

### onReplierPostReply

▸ `Protected` **onReplierPostReply**(`msg`, `result`): `Promise`<`void`\>

回复器成功回复消息后调用

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | [`Message`](../interfaces/Message.md) | 消息 |
| `result` | [`ReplyResult`](../interfaces/ReplyResult.md) | 回复结果 |

#### Returns

`Promise`<`void`\>

___

### getReplyTitle

▸ `Protected` **getReplyTitle**(`to`): `string`

生成 @对方 文本

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](../interfaces/Message.md) | 要回复的消息 |

#### Returns

`string`

___

### getReplyMessageId

▸ `Protected` **getReplyMessageId**(`to`, `messageReplyMode?`): `undefined` \| `string`

根据当前回复模式，获取要回复的消息id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](../interfaces/Message.md) | 待回复的消息 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式 |

#### Returns

`undefined` \| `string`

___

### reply

▸ **reply**(`to`, `message`, `messageReplyMode?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

回复，所有replyXXX方法将会处理回复模式、添加@对方 等等

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](../interfaces/Message.md) | 待回复消息 |
| `message` | [`OutgoingMessage`](../interfaces/OutgoingMessage.md) | 消息 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式，默认使用配置值 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

#### Implementation of

[IBot](../interfaces/IBot.md).[reply](../interfaces/IBot.md#reply)

___

### replyText

▸ **replyText**(`to`, `content`, `messageReplyMode?`, `addReplyTitle?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

回复文本

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`Message`](../interfaces/Message.md) | `undefined` | 待回复消息 |
| `content` | `string` | `undefined` | - |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | `undefined` | 回复模式，默认使用配置值 |
| `addReplyTitle` | `boolean` | `true` | 是否加上@对方 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

#### Implementation of

[IBot](../interfaces/IBot.md).[replyText](../interfaces/IBot.md#replytext)

___

### replyStamp

▸ **replyStamp**(`to`, `stampId`, `messageReplyMode?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

回复表情

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](../interfaces/Message.md) | 待回复消息 |
| `stampId` | `string` | 表情 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式，默认使用配置值 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

#### Implementation of

[IBot](../interfaces/IBot.md).[replyStamp](../interfaces/IBot.md#replystamp)

___

### replyThought

▸ **replyThought**(`to`, `thoughtId`, `messageReplyMode?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

转发想法

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](../interfaces/Message.md) | 待回复消息 |
| `thoughtId` | `string` | 想法 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式，默认使用配置值 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

#### Implementation of

[IBot](../interfaces/IBot.md).[replyThought](../interfaces/IBot.md#replythought)

___

### replyImage

▸ **replyImage**(`to`, `imageFile`, `messageReplyMode?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

回复图片

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](../interfaces/Message.md) | 待回复消息 |
| `imageFile` | `string` | 图片文件路径 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式，默认使用配置值 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

#### Implementation of

[IBot](../interfaces/IBot.md).[replyImage](../interfaces/IBot.md#replyimage)

___

### replyImageWithCache

▸ **replyImageWithCache**(`to`, `imageFile`, `dao`, `messageReplyMode?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

回复图片，利用以存储的服务端图片信息，可在发送已发过的图片时，直接使用服务端图片ID，而无需重复上传图片

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](../interfaces/Message.md) | 待回复消息 |
| `imageFile` | `string` | 图片文件路径 |
| `dao` | [`IServerImageDao`](../interfaces/IServerImageDao.md) | 服务端图片信息存储实现，没有默认实现，请按自己的口味实现一个。MongoDB示例：[server-image.ts](https://github.com/PamisuMyon/nanabot/blob/main/src/models/server-image.ts) |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) |  |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

#### Implementation of

[IBot](../interfaces/IBot.md).[replyImageWithCache](../interfaces/IBot.md#replyimagewithcache)

___

### sendImageWithCache

▸ **sendImageWithCache**(`topic_id`, `imageFile`, `dao`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

上面那个方法的直接发送版，无需指定回复哪条消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点ID，私聊ID |
| `imageFile` | `string` | 图片文件路径 |
| `dao` | [`IServerImageDao`](../interfaces/IServerImageDao.md) | 服务端图片信息存储实现 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

#### Implementation of

[IBot](../interfaces/IBot.md).[sendImageWithCache](../interfaces/IBot.md#sendimagewithcache)

___

### handleImageWithCache

▸ `Protected` **handleImageWithCache**(`imageFile`, `dao`): `Promise`<[`Result`](../interfaces/Result.md)<[`MediaImageInfo`](../interfaces/MediaImageInfo.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `imageFile` | `string` |
| `dao` | [`IServerImageDao`](../interfaces/IServerImageDao.md) |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`MediaImageInfo`](../interfaces/MediaImageInfo.md)\>\>
