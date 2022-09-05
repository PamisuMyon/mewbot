[mewbot](../README.md) / FileStorage

# Class: FileStorage

文件存储实现

## Implements

- [`IBotStorage`](../interfaces/IBotStorage.md)

## Table of contents

### Constructors

- [constructor](FileStorage.md#constructor)

### Properties

- [\_accountPath](FileStorage.md#_accountpath)
- [\_configPath](FileStorage.md#_configpath)
- [\_blockListPath](FileStorage.md#_blocklistpath)
- [\_config](FileStorage.md#_config)
- [\_blockList](FileStorage.md#_blocklist)

### Accessors

- [config](FileStorage.md#config)
- [blockList](FileStorage.md#blocklist)

### Methods

- [init](FileStorage.md#init)
- [getAccount](FileStorage.md#getaccount)
- [refreshConfig](FileStorage.md#refreshconfig)
- [refreshBlockList](FileStorage.md#refreshblocklist)
- [updateBlockList](FileStorage.md#updateblocklist)

## Constructors

### constructor

• **new FileStorage**()

## Properties

### \_accountPath

• `Protected` **\_accountPath**: `string` = `'./storage/account.json'`

___

### \_configPath

• `Protected` **\_configPath**: `string` = `'./storage/config.json'`

___

### \_blockListPath

• `Protected` **\_blockListPath**: `string` = `'./storage/block-list.json'`

___

### \_config

• `Protected` **\_config**: `Required`<[`BotConfig`](../interfaces/BotConfig.md)\>

___

### \_blockList

• `Protected` **\_blockList**: `Partial`<[`User`](../interfaces/User.md)\>[]

## Accessors

### config

• `get` **config**(): `Required`<[`BotConfig`](../interfaces/BotConfig.md)\>

获取bot配置

#### Returns

`Required`<[`BotConfig`](../interfaces/BotConfig.md)\>

#### Implementation of

IBotStorage.config

___

### blockList

• `get` **blockList**(): `Partial`<[`User`](../interfaces/User.md)\>[]

获取屏蔽列表

#### Returns

`Partial`<[`User`](../interfaces/User.md)\>[]

#### Implementation of

IBotStorage.blockList

## Methods

### init

▸ **init**(): `Promise`<`void`\>

初始化，在[launch](../interfaces/IBot.md#launch)时调用

#### Returns

`Promise`<`void`\>

#### Implementation of

[IBotStorage](../interfaces/IBotStorage.md).[init](../interfaces/IBotStorage.md#init)

___

### getAccount

▸ **getAccount**(): `Promise`<`undefined` \| [`Account`](../interfaces/Account.md)\>

获取账号信息

#### Returns

`Promise`<`undefined` \| [`Account`](../interfaces/Account.md)\>

#### Implementation of

[IBotStorage](../interfaces/IBotStorage.md).[getAccount](../interfaces/IBotStorage.md#getaccount)

___

### refreshConfig

▸ **refreshConfig**(): `Promise`<`Required`<[`BotConfig`](../interfaces/BotConfig.md)\>\>

刷新bot配置

#### Returns

`Promise`<`Required`<[`BotConfig`](../interfaces/BotConfig.md)\>\>

#### Implementation of

[IBotStorage](../interfaces/IBotStorage.md).[refreshConfig](../interfaces/IBotStorage.md#refreshconfig)

___

### refreshBlockList

▸ **refreshBlockList**(): `Promise`<`Partial`<[`User`](../interfaces/User.md)\>[]\>

刷新屏蔽列表

#### Returns

`Promise`<`Partial`<[`User`](../interfaces/User.md)\>[]\>

#### Implementation of

[IBotStorage](../interfaces/IBotStorage.md).[refreshBlockList](../interfaces/IBotStorage.md#refreshblocklist)

___

### updateBlockList

▸ **updateBlockList**(`blockList`): `Promise`<`void`\>

更新屏蔽列表

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockList` | `Partial`<[`User`](../interfaces/User.md)\>[] | 新的屏蔽列表 |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IBotStorage](../interfaces/IBotStorage.md).[updateBlockList](../interfaces/IBotStorage.md#updateblocklist)
