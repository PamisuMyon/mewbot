[mewbot](../README.md) / Spam

# Class: Spam

指令冷却检测
使用示例参照 PrimaryReplier

## Table of contents

### Properties

- [\_interval](Spam.md#_interval)
- [\_threshold](Spam.md#_threshold)
- [\_cooldown](Spam.md#_cooldown)
- [\_infos](Spam.md#_infos)

### Constructors

- [constructor](Spam.md#constructor)

### Methods

- [init](Spam.md#init)
- [check](Spam.md#check)
- [record](Spam.md#record)
- [reset](Spam.md#reset)

## Properties

### \_interval

• `Protected` **\_interval**: `number`

___

### \_threshold

• `Protected` **\_threshold**: `number`

___

### \_cooldown

• `Protected` **\_cooldown**: `number`

___

### \_infos

• `Protected` **\_infos**: `Object`

#### Index signature

▪ [id: `string`]: `SpamInfo`

## Constructors

### constructor

• **new Spam**(`interval?`, `threshold?`, `cooldown?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval?` | `number` | 连击生效间隔 单位毫秒 |
| `threshold?` | `number` | 冷却连击阈值 |
| `cooldown?` | `number` | 冷却时间 单位毫秒 |

## Methods

### init

▸ **init**(`interval?`, `threshold?`, `cooldown?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `interval?` | `number` |
| `threshold?` | `number` |
| `cooldown?` | `number` |

#### Returns

`void`

___

### check

▸ **check**(`id`): [`CheckResult`](../interfaces/CheckResult.md)

Spam检测

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | 任意id，例如用户id，话题/节点id等 |

#### Returns

[`CheckResult`](../interfaces/CheckResult.md)

___

### record

▸ **record**(`id`): `void`

Spam记录

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | 任意id，例如用户id，话题/节点id等 |

#### Returns

`void`

___

### reset

▸ **reset**(`id`): `void`

重置Spam

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | 任意id，例如用户id，话题/节点id等 |

#### Returns

`void`
