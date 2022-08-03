[mewbot](../README.md) / Logger

# Class: Logger

## Table of contents

### Constructors

- [constructor](Logger.md#constructor)

### Accessors

- [logLevel](Logger.md#loglevel)

### Methods

- [stamp](Logger.md#stamp)
- [log](Logger.md#log)
- [verbose](Logger.md#verbose)
- [debug](Logger.md#debug)
- [info](Logger.md#info)
- [warn](Logger.md#warn)
- [error](Logger.md#error)
- [dir](Logger.md#dir)

## Constructors

### constructor

• **new Logger**()

## Accessors

### logLevel

• `get` **logLevel**(): [`LogLevel`](../enums/LogLevel.md)

#### Returns

[`LogLevel`](../enums/LogLevel.md)

• `set` **logLevel**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`LogLevel`](../enums/LogLevel.md) |

#### Returns

`void`

## Methods

### stamp

▸ `Protected` **stamp**(`level?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `level` | [`LogLevel`](../enums/LogLevel.md) | `LogLevel.Disabled` |

#### Returns

`string`

___

### log

▸ **log**(`msg`, `level?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `msg` | `any` | `undefined` |
| `level` | [`LogLevel`](../enums/LogLevel.md) | `LogLevel.Debug` |

#### Returns

`void`

___

### verbose

▸ **verbose**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`void`

___

### debug

▸ **debug**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`void`

___

### info

▸ **info**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`void`

___

### warn

▸ **warn**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`void`

___

### error

▸ **error**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`void`

___

### dir

▸ **dir**(`obj`, `level?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `obj` | `any` | `undefined` |
| `level` | [`LogLevel`](../enums/LogLevel.md) | `LogLevel.Debug` |

#### Returns

`void`
