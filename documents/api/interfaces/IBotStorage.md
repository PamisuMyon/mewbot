[mewbot](../README.md) / IBotStorage

# Interface: IBotStorage

存储接口

## Implemented by

- [`FileStorage`](../classes/FileStorage.md)

## Table of contents

### Methods

- [init](IBotStorage.md#init)
- [getAccount](IBotStorage.md#getaccount)
- [refreshConfig](IBotStorage.md#refreshconfig)
- [refreshBlockList](IBotStorage.md#refreshblocklist)
- [updateBlockList](IBotStorage.md#updateblocklist)

### Accessors

- [config](IBotStorage.md#config)
- [blockList](IBotStorage.md#blocklist)

## Methods

### init

▸ **init**(): `Promise`<`void`\>

初始化，在[launch](IBot.md#launch)时调用

#### Returns

`Promise`<`void`\>

___

### getAccount

▸ **getAccount**(): `Promise`<`undefined` \| [`Account`](Account.md)\>

#### Returns

`Promise`<`undefined` \| [`Account`](Account.md)\>

___

### refreshConfig

▸ **refreshConfig**(): `Promise`<`Required`<[`BotConfig`](BotConfig.md)\>\>

#### Returns

`Promise`<`Required`<[`BotConfig`](BotConfig.md)\>\>

___

### refreshBlockList

▸ **refreshBlockList**(): `Promise`<`Partial`<[`User`](User.md)\>[]\>

#### Returns

`Promise`<`Partial`<[`User`](User.md)\>[]\>

___

### updateBlockList

▸ **updateBlockList**(`blockList`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockList` | `Partial`<[`User`](User.md)\>[] |

#### Returns

`Promise`<`void`\>

## Accessors

### config

• `get` **config**(): `Required`<[`BotConfig`](BotConfig.md)\>

#### Returns

`Required`<[`BotConfig`](BotConfig.md)\>

___

### blockList

• `get` **blockList**(): `Partial`<[`User`](User.md)\>[]

#### Returns

`Partial`<[`User`](User.md)\>[]
