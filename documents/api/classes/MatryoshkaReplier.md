[mewbot](../README.md) / MatryoshkaReplier

# Class: MatryoshkaReplier

套娃回复器

## Hierarchy

- [`Replier`](Replier.md)

  ↳ **`MatryoshkaReplier`**

## Table of contents

### Properties

- [\_spams](MatryoshkaReplier.md#_spams)
- [type](MatryoshkaReplier.md#type)
- [\_children](MatryoshkaReplier.md#_children)
- [\_pickFunc](MatryoshkaReplier.md#_pickfunc)

### Methods

- [getConfig](MatryoshkaReplier.md#getconfig)
- [checkAvailable](MatryoshkaReplier.md#checkavailable)
- [checkSpam](MatryoshkaReplier.md#checkspam)
- [pick01](MatryoshkaReplier.md#pick01)
- [pick](MatryoshkaReplier.md#pick)
- [pick01Fuzzy](MatryoshkaReplier.md#pick01fuzzy)
- [recordSpam](MatryoshkaReplier.md#recordspam)
- [init](MatryoshkaReplier.md#init)
- [test](MatryoshkaReplier.md#test)
- [reply](MatryoshkaReplier.md#reply)
- [getCooldownHint](MatryoshkaReplier.md#getcooldownhint)

### Constructors

- [constructor](MatryoshkaReplier.md#constructor)

## Properties

### \_spams

• `Protected` **\_spams**: `Object` = `{}`

#### Index signature

▪ [topicId: `string`]: [`Spam`](Spam.md)

#### Inherited from

[Replier](Replier.md).[_spams](Replier.md#_spams)

___

### type

• `Abstract` **type**: `string`

#### Overrides

[Replier](Replier.md).[type](Replier.md#type)

___

### \_children

• `Protected` **\_children**: [`Replier`](Replier.md)[]

___

### \_pickFunc

• `Protected` **\_pickFunc**: (`repliers`: [`Replier`](Replier.md)[], `msg`: [`Message`](../interfaces/Message.md), `params`: [`TestParams`](../interfaces/TestParams.md)) => `Promise`<`undefined` \| [`TestInfo`](../interfaces/TestInfo.md)\> = `Replier.pick`

#### Type declaration

▸ (`repliers`, `msg`, `params`): `Promise`<`undefined` \| [`TestInfo`](../interfaces/TestInfo.md)\>

回复器挑选函数，挑选置信度最高且优先级最高的回复器

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `repliers` | [`Replier`](Replier.md)[] | 回复器集合 |
| `msg` | [`Message`](../interfaces/Message.md) | 消息 |
| `params` | [`TestParams`](../interfaces/TestParams.md) | 测试参数 |

##### Returns

`Promise`<`undefined` \| [`TestInfo`](../interfaces/TestInfo.md)\>

## Methods

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

#### Inherited from

[Replier](Replier.md).[getConfig](Replier.md#getconfig)

___

### checkAvailable

▸ `Protected` **checkAvailable**(`bot`, `msg`, `shouldReply?`): `Promise`<`boolean`\>

判断回复器在话题（节点）中是否可用

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bot` | [`IBot`](../interfaces/IBot.md) | `undefined` | bot |
| `msg` | [`Message`](../interfaces/Message.md) | `undefined` | 待回复消息 |
| `shouldReply` | `boolean` | `true` | 不可用时，是否直接回复功能不可用提示 |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Replier](Replier.md).[checkAvailable](Replier.md#checkavailable)

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

#### Inherited from

[Replier](Replier.md).[checkSpam](Replier.md#checkspam)

___

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

#### Inherited from

[Replier](Replier.md).[pick01](Replier.md#pick01)

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

#### Inherited from

[Replier](Replier.md).[pick](Replier.md#pick)

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

#### Inherited from

[Replier](Replier.md).[pick01Fuzzy](Replier.md#pick01fuzzy)

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

#### Inherited from

[Replier](Replier.md).[recordSpam](Replier.md#recordspam)

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

#### Overrides

[Replier](Replier.md).[init](Replier.md#init)

___

### test

▸ **test**(`msg`, `options`): `Promise`<[`TestInfo`](../interfaces/TestInfo.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | [`Message`](../interfaces/Message.md) |
| `options` | [`TestParams`](../interfaces/TestParams.md) |

#### Returns

`Promise`<[`TestInfo`](../interfaces/TestInfo.md)\>

#### Overrides

[Replier](Replier.md).[test](Replier.md#test)

___

### reply

▸ **reply**(`bot`, `msg`, `test`): `Promise`<[`ReplyResult`](../interfaces/ReplyResult.md)\>

回复消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bot` | [`IBot`](../interfaces/IBot.md) | bot |
| `msg` | [`Message`](../interfaces/Message.md) | 待回复的消息 |
| `test` | [`TestInfo`](../interfaces/TestInfo.md) | - |

#### Returns

`Promise`<[`ReplyResult`](../interfaces/ReplyResult.md)\>

#### Overrides

[Replier](Replier.md).[reply](Replier.md#reply)

___

### getCooldownHint

▸ **getCooldownHint**(`remainTime?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `remainTime?` | `number` |

#### Returns

`string`

## Constructors

### constructor

• **new MatryoshkaReplier**()

#### Inherited from

[Replier](Replier.md).[constructor](Replier.md#constructor)
