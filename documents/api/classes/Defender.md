[mewbot](../README.md) / Defender

# Class: Defender

防御机制，用来避免短时间内被频繁刷屏，例如两个bot互相回复陷入死循环

## Table of contents

### Properties

- [\_spam](Defender.md#_spam)
- [\_storage](Defender.md#_storage)

### Constructors

- [constructor](Defender.md#constructor)

### Methods

- [record](Defender.md#record)
- [isBlocked](Defender.md#isblocked)
- [addToBlockList](Defender.md#addtoblocklist)

## Properties

### \_spam

• `Protected` **\_spam**: [`Spam`](Spam.md)

___

### \_storage

• `Protected` **\_storage**: [`IBotStorage`](../interfaces/IBotStorage.md)

## Constructors

### constructor

• **new Defender**(`storage`, `interval?`, `threshold?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `storage` | [`IBotStorage`](../interfaces/IBotStorage.md) | `undefined` | - |
| `interval` | `number` | `1000` | 连击生效间隔 |
| `threshold` | `number` | `10` | 防御连击阈值 |

## Methods

### record

▸ **record**(`user`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](../interfaces/User.md) |

#### Returns

`void`

___

### isBlocked

▸ **isBlocked**(`user_id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `user_id` | `string` |

#### Returns

`boolean`

___

### addToBlockList

▸ **addToBlockList**(`user`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](../interfaces/User.md) |

#### Returns

`Promise`<`void`\>
