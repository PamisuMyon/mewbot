[mewbot](../README.md) / WsHandler

# Class: WsHandler

## Hierarchy

- `BaseEmitter`<{ `open`: `void` ; `dispatch`: [`Dispatch`](../interfaces/Dispatch.md) ; `close`: `void`  }\>

  ↳ **`WsHandler`**

## Table of contents

### Constructors

- [constructor](WsHandler.md#constructor)

### Properties

- [\_emitter](WsHandler.md#_emitter)
- [\_ws](WsHandler.md#_ws)
- [\_connectStatus](WsHandler.md#_connectstatus)
- [\_heartbeatCheck](WsHandler.md#_heartbeatcheck)

### Methods

- [on](WsHandler.md#on)
- [off](WsHandler.md#off)
- [emit](WsHandler.md#emit)
- [connect](WsHandler.md#connect)
- [retryConnection](WsHandler.md#retryconnection)
- [checkHeartbeat](WsHandler.md#checkheartbeat)
- [parseDispatch](WsHandler.md#parsedispatch)
- [refineDispatch](WsHandler.md#refinedispatch)
- [close](WsHandler.md#close)

## Constructors

### constructor

• **new WsHandler**()

#### Inherited from

BaseEmitter<{
    open: void,
    dispatch: Dispatch,
    close: void,
}\>.constructor

## Properties

### \_emitter

• `Protected` **\_emitter**: `EventEmitter`

#### Inherited from

BaseEmitter.\_emitter

___

### \_ws

• `Protected` **\_ws**: `WebSocket`

___

### \_connectStatus

• `Protected` **\_connectStatus**: [`ConnectStatus`](../enums/ConnectStatus.md) = `ConnectStatus.None`

___

### \_heartbeatCheck

• `Protected` **\_heartbeatCheck**: `number` = `-1`

## Methods

### on

▸ **on**<`K`\>(`eventName`, `fn`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `EventKey`<{ `open`: `void` ; `dispatch`: [`Dispatch`](../interfaces/Dispatch.md) ; `close`: `void`  }\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `K` |
| `fn` | `EventReceiver`<{ `open`: `void` ; `dispatch`: [`Dispatch`](../interfaces/Dispatch.md) ; `close`: `void`  }[`K`]\> |

#### Returns

`void`

#### Inherited from

BaseEmitter.on

___

### off

▸ **off**<`K`\>(`eventName`, `fn`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `EventKey`<{ `open`: `void` ; `dispatch`: [`Dispatch`](../interfaces/Dispatch.md) ; `close`: `void`  }\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `K` |
| `fn` | `EventReceiver`<{ `open`: `void` ; `dispatch`: [`Dispatch`](../interfaces/Dispatch.md) ; `close`: `void`  }[`K`]\> |

#### Returns

`void`

#### Inherited from

BaseEmitter.off

___

### emit

▸ `Protected` **emit**<`K`\>(`eventName`, `params`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `EventKey`<{ `open`: `void` ; `dispatch`: [`Dispatch`](../interfaces/Dispatch.md) ; `close`: `void`  }\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `K` |
| `params` | { `open`: `void` ; `dispatch`: [`Dispatch`](../interfaces/Dispatch.md) ; `close`: `void`  }[`K`] |

#### Returns

`void`

#### Inherited from

BaseEmitter.emit

___

### connect

▸ **connect**(`options`, `auth?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`<[`ConnectOptions`](../interfaces/ConnectOptions.md)\> |
| `auth?` | [`Auth`](../interfaces/Auth.md) |

#### Returns

`void`

___

### retryConnection

▸ `Protected` **retryConnection**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ConnectOptions`](../interfaces/ConnectOptions.md) |

#### Returns

`void`

___

### checkHeartbeat

▸ `Protected` **checkHeartbeat**(`options`, `timeout?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | [`ConnectOptions`](../interfaces/ConnectOptions.md) | `undefined` |
| `timeout` | `number` | `0` |

#### Returns

`void`

___

### parseDispatch

▸ `Protected` **parseDispatch**(`raw`): [`Dispatch`](../interfaces/Dispatch.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | `string` |

#### Returns

[`Dispatch`](../interfaces/Dispatch.md)

___

### refineDispatch

▸ `Protected` **refineDispatch**(`raw`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | [`Dispatch`](../interfaces/Dispatch.md) |

#### Returns

`void`

___

### close

▸ **close**(): `void`

#### Returns

`void`
