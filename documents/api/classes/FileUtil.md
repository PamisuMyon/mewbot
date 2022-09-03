[mewbot](../README.md) / FileUtil

# Class: FileUtil

## Table of contents

### Methods

- [create](FileUtil.md#create)
- [read](FileUtil.md#read)
- [readJson](FileUtil.md#readjson)
- [write](FileUtil.md#write)
- [delete](FileUtil.md#delete)
- [exists](FileUtil.md#exists)

### Constructors

- [constructor](FileUtil.md#constructor)

## Methods

### create

▸ `Static` **create**(`path`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`void`\>

___

### read

▸ `Static` **read**(`path`): `Promise`<`undefined` \| `Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`undefined` \| `Buffer`\>

___

### readJson

▸ `Static` **readJson**(`path`, `log?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `path` | `string` | `undefined` |
| `log` | `boolean` | `true` |

#### Returns

`Promise`<`any`\>

___

### write

▸ `Static` **write**(`path`, `data`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `data` | `string` |

#### Returns

`Promise`<`void`\>

___

### delete

▸ `Static` **delete**(`path`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`void`\>

___

### exists

▸ `Static` **exists**(`path`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`boolean`\>

## Constructors

### constructor

• **new FileUtil**()
