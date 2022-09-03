[mewbot](../README.md) / IBot

# Interface: IBot

Bot接口，用来定义Bot需要对外提供的接口

## Implemented by

- [`MewBot`](../classes/MewBot.md)

## Table of contents

### Accessors

- [client](IBot.md#client)
- [storage](IBot.md#storage)
- [config](IBot.md#config)

### Methods

- [launch](IBot.md#launch)
- [refresh](IBot.md#refresh)
- [reply](IBot.md#reply)
- [replyText](IBot.md#replytext)
- [replyStamp](IBot.md#replystamp)
- [replyThought](IBot.md#replythought)
- [replyImage](IBot.md#replyimage)
- [replyImageWithCache](IBot.md#replyimagewithcache)
- [sendImageWithCache](IBot.md#sendimagewithcache)

## Accessors

### client

• `get` **client**(): [`MewClient`](../classes/MewClient.md)

MewClient

#### Returns

[`MewClient`](../classes/MewClient.md)

___

### storage

• `get` **storage**(): [`IBotStorage`](IBotStorage.md)

存储

#### Returns

[`IBotStorage`](IBotStorage.md)

___

### config

• `get` **config**(): `Required`<[`BotConfig`](BotConfig.md)\>

配置

#### Returns

`Required`<[`BotConfig`](BotConfig.md)\>

## Methods

### launch

▸ **launch**(): `Promise`<`void`\>

启动

#### Returns

`Promise`<`void`\>

___

### refresh

▸ **refresh**(): `Promise`<`void`\>

刷新，应刷新配置与所有回复器等

#### Returns

`Promise`<`void`\>

___

### reply

▸ **reply**(`to`, `message`, `messageReplyMode?`): `Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

回复

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](Message.md) | 待回复消息 |
| `message` | [`OutgoingMessage`](OutgoingMessage.md) | 消息 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式，默认使用配置值 |

#### Returns

`Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

___

### replyText

▸ **replyText**(`to`, `reply`, `messageReplyMode?`, `addReplyTitle?`): `Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

回复文本

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](Message.md) | 待回复消息 |
| `reply` | `string` | 文本 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式，默认使用配置值 |
| `addReplyTitle?` | `boolean` | 是否加上@对方 |

#### Returns

`Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

___

### replyStamp

▸ **replyStamp**(`to`, `stampId`, `messageReplyMode?`): `Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

回复表情

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](Message.md) | 待回复消息 |
| `stampId` | `string` | 表情 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式，默认使用配置值 |

#### Returns

`Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

___

### replyThought

▸ **replyThought**(`to`, `thoughtId`, `messageReplyMode?`): `Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

转发想法

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](Message.md) | 待回复消息 |
| `thoughtId` | `string` | 想法 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式，默认使用配置值 |

#### Returns

`Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

___

### replyImage

▸ **replyImage**(`to`, `imageFile`, `messageReplyMode?`): `Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

回复图片

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`Message`](Message.md) | 待回复消息 |
| `imageFile` | `string` | 图片文件路径 |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) | 回复模式，默认使用配置值 |

#### Returns

`Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

___

### replyImageWithCache

▸ **replyImageWithCache**(`to`, `imageFile`, `dao`, `messageReplyMode?`): `Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | [`Message`](Message.md) |
| `imageFile` | `string` |
| `dao` | [`IServerImageDao`](IServerImageDao.md) |
| `messageReplyMode?` | [`MesageReplyMode`](../enums/MesageReplyMode.md) |

#### Returns

`Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

___

### sendImageWithCache

▸ **sendImageWithCache**(`topic_id`, `imageFile`, `dao`): `Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic_id` | `string` |
| `imageFile` | `string` |
| `dao` | [`IServerImageDao`](IServerImageDao.md) |

#### Returns

`Promise`<[`Result`](Result.md)<[`Message`](Message.md)\>\>
