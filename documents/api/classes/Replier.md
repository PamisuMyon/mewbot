[mewbot](../README.md) / Replier

# Class: Replier

回复器基类

## Hierarchy

- **`Replier`**

  ↳ [`MatryoshkaReplier`](MatryoshkaReplier.md)

## Table of contents

### Methods

- [pick01](Replier.md#pick01)
- [pick](Replier.md#pick)
- [pick01Fuzzy](Replier.md#pick01fuzzy)
- [test](Replier.md#test)
- [reply](Replier.md#reply)
- [init](Replier.md#init)
- [getConfig](Replier.md#getconfig)
- [checkAvailable](Replier.md#checkavailable)
- [checkSpam](Replier.md#checkspam)
- [recordSpam](Replier.md#recordspam)

### Constructors

- [constructor](Replier.md#constructor)

### Properties

- [type](Replier.md#type)
- [\_spams](Replier.md#_spams)
- [\_directAlwaysAvailable](Replier.md#_directalwaysavailable)

## Methods

### pick01

▸ `Static` **pick01**(`repliers`, `msg`, `params`): `Promise`<`undefined` \| [`TestInfo`](../interfaces/TestInfo.md)\>

回复器挑选函数，挑选置信度为1且优先级最高的回复器

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `repliers` | [`Replier`](Replier.md)[] | 回复器集合 |
| `msg` | [`Message`](../interfaces/Message.md) | 消息 |
| `params` | [`TestParams`](../interfaces/TestParams.md) | 测试参数 |

#### Returns

`Promise`<`undefined` \| [`TestInfo`](../interfaces/TestInfo.md)\>

___

### pick

▸ `Static` **pick**(`repliers`, `msg`, `params`): `Promise`<`undefined` \| [`TestInfo`](../interfaces/TestInfo.md)\>

回复器挑选函数，挑选置信度最高且优先级最高的回复器

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `repliers` | [`Replier`](Replier.md)[] | 回复器集合 |
| `msg` | [`Message`](../interfaces/Message.md) | 消息 |
| `params` | [`TestParams`](../interfaces/TestParams.md) | 测试参数 |

#### Returns

`Promise`<`undefined` \| [`TestInfo`](../interfaces/TestInfo.md)\>

___

### pick01Fuzzy

▸ `Static` **pick01Fuzzy**(`repliers`, `msg`, `params`): `Promise`<`undefined` \| [`TestInfo`](../interfaces/TestInfo.md)\>

回复器挑选函数，挑选置信度为1且优先级最高的回复器，如果没有1，则从最高置信度的回复器中随机选取一个

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `repliers` | [`Replier`](Replier.md)[] | 回复器集合 |
| `msg` | [`Message`](../interfaces/Message.md) | 消息 |
| `params` | [`TestParams`](../interfaces/TestParams.md) | 测试参数 |

#### Returns

`Promise`<`undefined` \| [`TestInfo`](../interfaces/TestInfo.md)\>

___

### test

▸ `Abstract` **test**(`msg`, `options`): `Promise`<[`TestInfo`](../interfaces/TestInfo.md)\>

回复器测试，此方法中对消息进行预处理，返回相应的置信度与预处理数据，参照[TestInfo](../interfaces/TestInfo.md)

bot收到一条消息后，将依次调用回复器的`test`方法，根据挑选函数选取最合适的回复器，执行其`reply`方法。

默认的挑选函数[pick01](Replier.md#pick01)优先选择置信度为`1`的回复器。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | [`Message`](../interfaces/Message.md) | 消息 |
| `options` | [`TestParams`](../interfaces/TestParams.md) | 测试参数 |

#### Returns

`Promise`<[`TestInfo`](../interfaces/TestInfo.md)\>

___

### reply

▸ `Abstract` **reply**(`bot`, `msg`, `test`): `Promise`<[`ReplyResult`](../interfaces/ReplyResult.md)\>

回复消息，此方法中对消息进行回复。当回复器通过测试被选中时，此方法将被调用。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bot` | [`IBot`](../interfaces/IBot.md) | bot |
| `msg` | [`Message`](../interfaces/Message.md) | 待回复的消息 |
| `test` | [`TestInfo`](../interfaces/TestInfo.md) | - |

#### Returns

`Promise`<[`ReplyResult`](../interfaces/ReplyResult.md)\>

___

### init

▸ **init**(`bot`): `Promise`<`void`\>

初始化，在bot启动及配置刷新时被调用

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bot` | [`IBot`](../interfaces/IBot.md) | bot |

#### Returns

`Promise`<`void`\>

___

### getConfig

▸ `Protected` **getConfig**(`bot`, `topic_id`): `undefined` \| [`ReplierConfig`](../interfaces/ReplierConfig.md)

获取当前话题的回复器配置

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bot` | [`IBot`](../interfaces/IBot.md) | bot |
| `topic_id` | `string` | 话题id |

#### Returns

`undefined` \| [`ReplierConfig`](../interfaces/ReplierConfig.md)

___

### checkAvailable

▸ `Protected` **checkAvailable**(`bot`, `msg`, `shouldReply?`): `Promise`<`boolean`\>

判断回复器在话题（节点）中是否可用，不可用时，默认回复不可用提示

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bot` | [`IBot`](../interfaces/IBot.md) | `undefined` | bot |
| `msg` | [`Message`](../interfaces/Message.md) | `undefined` | 待回复消息 |
| `shouldReply` | `boolean` | `true` | 不可用时，是否直接回复功能不可用提示，默认为`true` |

#### Returns

`Promise`<`boolean`\>

___

### checkSpam

▸ `Protected` **checkSpam**(`topic_id`, `targetId`): [`CheckResult`](../interfaces/CheckResult.md)

冷却检测

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题id |
| `targetId` | `string` | 目标id，可以是话题id、用户id |

#### Returns

[`CheckResult`](../interfaces/CheckResult.md)

___

### recordSpam

▸ `Protected` **recordSpam**(`topic_id`, `targetId`): `void`

记录冷却

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题id |
| `targetId` | `string` | 目标id，可以是话题id、用户id |

#### Returns

`void`

## Constructors

### constructor

• **new Replier**()

## Properties

### type

• `Abstract` **type**: `string`

类型

___

### \_spams

• `Protected` **\_spams**: `Object` = `{}`

指令冷却检测

#### Index signature

▪ [topicId: `string`]: [`Spam`](Spam.md)

___

### \_directAlwaysAvailable

• `Protected` **\_directAlwaysAvailable**: `boolean` = `true`

回复器在私聊中总是可用，默认为`true`，即[checkAvailable](Replier.md#checkavailable)方法在私聊中将总是返回`true`
