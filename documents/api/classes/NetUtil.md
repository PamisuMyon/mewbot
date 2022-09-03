[mewbot](../README.md) / NetUtil

# Class: NetUtil

## Table of contents

### Properties

- [pipeline](NetUtil.md#pipeline)

### Methods

- [download](NetUtil.md#download)

### Constructors

- [constructor](NetUtil.md#constructor)

## Properties

### pipeline

▪ `Static` **pipeline**: <A, B\>(`source`: `A`, `destination`: `B`, `options?`: `PipelineOptions`) => `PipelinePromise`<`B`\><A, T1, B\>(`source`: `A`, `transform1`: `T1`, `destination`: `B`, `options?`: `PipelineOptions`) => `PipelinePromise`<`B`\><A, T1, T2, B\>(`source`: `A`, `transform1`: `T1`, `transform2`: `T2`, `destination`: `B`, `options?`: `PipelineOptions`) => `PipelinePromise`<`B`\><A, T1, T2, T3, B\>(`source`: `A`, `transform1`: `T1`, `transform2`: `T2`, `transform3`: `T3`, `destination`: `B`, `options?`: `PipelineOptions`) => `PipelinePromise`<`B`\><A, T1, T2, T3, T4, B\>(`source`: `A`, `transform1`: `T1`, `transform2`: `T2`, `transform3`: `T3`, `transform4`: `T4`, `destination`: `B`, `options?`: `PipelineOptions`) => `PipelinePromise`<`B`\>(`streams`: readonly (`ReadableStream` \| `WritableStream` \| `ReadWriteStream`)[], `options?`: `PipelineOptions`) => `Promise`<`void`\>(`stream1`: `ReadableStream`, `stream2`: `WritableStream` \| `ReadWriteStream`, ...`streams`: (`WritableStream` \| `ReadWriteStream` \| `PipelineOptions`)[]) => `Promise`<`void`\>

#### Type declaration

▸ <`A`, `B`\>(`source`, `destination`, `options?`): `PipelinePromise`<`B`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `PipelineSource`<`any`\> |
| `B` | extends `WritableStream` \| `PipelineDestinationIterableFunction`<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`<`any`\> \| `PipelineDestinationPromiseFunction`<`any`, `any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `A` |
| `destination` | `B` |
| `options?` | `PipelineOptions` |

##### Returns

`PipelinePromise`<`B`\>

▸ <`A`, `T1`, `B`\>(`source`, `transform1`, `destination`, `options?`): `PipelinePromise`<`B`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `PipelineSource`<`any`\> |
| `T1` | extends `PipelineTransform`<`A`, `any`\> |
| `B` | extends `WritableStream` \| `PipelineDestinationIterableFunction`<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`<`any`\> \| `PipelineDestinationPromiseFunction`<`any`, `any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `A` |
| `transform1` | `T1` |
| `destination` | `B` |
| `options?` | `PipelineOptions` |

##### Returns

`PipelinePromise`<`B`\>

▸ <`A`, `T1`, `T2`, `B`\>(`source`, `transform1`, `transform2`, `destination`, `options?`): `PipelinePromise`<`B`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `PipelineSource`<`any`\> |
| `T1` | extends `PipelineTransform`<`A`, `any`\> |
| `T2` | extends `PipelineTransform`<`T1`, `any`\> |
| `B` | extends `WritableStream` \| `PipelineDestinationIterableFunction`<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`<`any`\> \| `PipelineDestinationPromiseFunction`<`any`, `any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `A` |
| `transform1` | `T1` |
| `transform2` | `T2` |
| `destination` | `B` |
| `options?` | `PipelineOptions` |

##### Returns

`PipelinePromise`<`B`\>

▸ <`A`, `T1`, `T2`, `T3`, `B`\>(`source`, `transform1`, `transform2`, `transform3`, `destination`, `options?`): `PipelinePromise`<`B`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `PipelineSource`<`any`\> |
| `T1` | extends `PipelineTransform`<`A`, `any`\> |
| `T2` | extends `PipelineTransform`<`T1`, `any`\> |
| `T3` | extends `PipelineTransform`<`T2`, `any`\> |
| `B` | extends `WritableStream` \| `PipelineDestinationIterableFunction`<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`<`any`\> \| `PipelineDestinationPromiseFunction`<`any`, `any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `A` |
| `transform1` | `T1` |
| `transform2` | `T2` |
| `transform3` | `T3` |
| `destination` | `B` |
| `options?` | `PipelineOptions` |

##### Returns

`PipelinePromise`<`B`\>

▸ <`A`, `T1`, `T2`, `T3`, `T4`, `B`\>(`source`, `transform1`, `transform2`, `transform3`, `transform4`, `destination`, `options?`): `PipelinePromise`<`B`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `PipelineSource`<`any`\> |
| `T1` | extends `PipelineTransform`<`A`, `any`\> |
| `T2` | extends `PipelineTransform`<`T1`, `any`\> |
| `T3` | extends `PipelineTransform`<`T2`, `any`\> |
| `T4` | extends `PipelineTransform`<`T3`, `any`\> |
| `B` | extends `WritableStream` \| `PipelineDestinationIterableFunction`<`string` \| `Buffer`\> \| `PipelineDestinationPromiseFunction`<`string` \| `Buffer`, `any`\> \| `PipelineDestinationIterableFunction`<`any`\> \| `PipelineDestinationPromiseFunction`<`any`, `any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `A` |
| `transform1` | `T1` |
| `transform2` | `T2` |
| `transform3` | `T3` |
| `transform4` | `T4` |
| `destination` | `B` |
| `options?` | `PipelineOptions` |

##### Returns

`PipelinePromise`<`B`\>

▸ (`streams`, `options?`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `streams` | readonly (`ReadableStream` \| `WritableStream` \| `ReadWriteStream`)[] |
| `options?` | `PipelineOptions` |

##### Returns

`Promise`<`void`\>

▸ (`stream1`, `stream2`, ...`streams`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `stream1` | `ReadableStream` |
| `stream2` | `WritableStream` \| `ReadWriteStream` |
| `...streams` | (`WritableStream` \| `ReadWriteStream` \| `PipelineOptions`)[] |

##### Returns

`Promise`<`void`\>

## Methods

### download

▸ `Static` **download**(`url`, `filePath`, `timeout?`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `filePath` | `string` | `undefined` |
| `timeout` | `number` | `360000` |

#### Returns

`Promise`<`undefined` \| `string`\>

## Constructors

### constructor

• **new NetUtil**()
