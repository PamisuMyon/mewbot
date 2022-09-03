[mewbot](../README.md) / IServerImageDao

# Interface: IServerImageDao

## Table of contents

### Methods

- [findByFileName](IServerImageDao.md#findbyfilename)
- [deleteByFileName](IServerImageDao.md#deletebyfilename)
- [insertOne](IServerImageDao.md#insertone)

## Methods

### findByFileName

▸ **findByFileName**(`fileName`): `Promise`<``null`` \| [`ServerImageInfo`](ServerImageInfo.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileName` | `string` |

#### Returns

`Promise`<``null`` \| [`ServerImageInfo`](ServerImageInfo.md)\>

___

### deleteByFileName

▸ **deleteByFileName**(`fileName`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileName` | `string` |

#### Returns

`Promise`<`any`\>

___

### insertOne

▸ **insertOne**(`serverImage`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `serverImage` | [`ServerImageInfo`](ServerImageInfo.md) |

#### Returns

`Promise`<`any`\>
