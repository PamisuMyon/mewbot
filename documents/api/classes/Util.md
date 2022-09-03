[mewbot](../README.md) / Util

# Class: Util

## Table of contents

### Methods

- [dateFormat](Util.md#dateformat)
- [stringFormat](Util.md#stringformat)
- [randomInt](Util.md#randomint)
- [nonce](Util.md#nonce)
- [sleep](Util.md#sleep)
- [isUrlAlive](Util.md#isurlalive)
- [randomFloat](Util.md#randomfloat)
- [randomItem](Util.md#randomitem)
- [getNumber](Util.md#getnumber)
- [getTimeCounterText](Util.md#gettimecountertext)
- [isArrEmpty](Util.md#isarrempty)
- [getElemSafe](Util.md#getelemsafe)
- [removeElem](Util.md#removeelem)
- [pushUnique](Util.md#pushunique)
- [pushAllUnique](Util.md#pushallunique)

### Constructors

- [constructor](Util.md#constructor)

## Methods

### dateFormat

▸ `Static` **dateFormat**(`fmt`, `date`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fmt` | `string` |
| `date` | `Date` |

#### Returns

`string`

___

### stringFormat

▸ `Static` **stringFormat**(`str`, ...`args`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `...args` | `any` |

#### Returns

`undefined` \| `string`

___

### randomInt

▸ `Static` **randomInt**(`min`, `max`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

___

### nonce

▸ `Static` **nonce**(): `string`

生成Number once

#### Returns

`string`

nonce

___

### sleep

▸ `Static` **sleep**(`timeout`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeout` | `number` |

#### Returns

`Promise`<`unknown`\>

___

### isUrlAlive

▸ `Static` **isUrlAlive**(`url`, `timeout?`, `retry?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `timeout` | `number` | `1000` |
| `retry` | `number` | `0` |

#### Returns

`Promise`<`boolean`\>

___

### randomFloat

▸ `Static` **randomFloat**(`min`, `max`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

___

### randomItem

▸ `Static` **randomItem**<`T`\>(`array`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |

#### Returns

`T`

___

### getNumber

▸ `Static` **getNumber**(`str`, `defaultValue`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `defaultValue` | `number` |

#### Returns

`number`

___

### getTimeCounterText

▸ `Static` **getTimeCounterText**(`time`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

`string`

___

### isArrEmpty

▸ `Static` **isArrEmpty**(`arr?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr?` | `any`[] |

#### Returns

`boolean`

___

### getElemSafe

▸ `Static` **getElemSafe**<`T`\>(`arr`, `index`): `undefined` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `index` | `number` |

#### Returns

`undefined` \| `T`

___

### removeElem

▸ `Static` **removeElem**<`T`\>(`array`, `elem`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `T`[] |
| `elem` | `T` |

#### Returns

`void`

___

### pushUnique

▸ `Static` **pushUnique**<`T`\>(`a`, `b`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T`[] |
| `b` | `T` |

#### Returns

`void`

___

### pushAllUnique

▸ `Static` **pushAllUnique**<`T`\>(`a`, `b`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T`[] |
| `b` | `T`[] |

#### Returns

`void`

## Constructors

### constructor

• **new Util**()
