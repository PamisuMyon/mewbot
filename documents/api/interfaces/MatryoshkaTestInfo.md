[mewbot](../README.md) / MatryoshkaTestInfo

# Interface: MatryoshkaTestInfo

回复器测试结果

## Hierarchy

- [`TestInfo`](TestInfo.md)

  ↳ **`MatryoshkaTestInfo`**

## Table of contents

### Properties

- [confidence](MatryoshkaTestInfo.md#confidence)
- [data](MatryoshkaTestInfo.md#data)
- [replierIndex](MatryoshkaTestInfo.md#replierindex)
- [options](MatryoshkaTestInfo.md#options)
- [subReplierIndex](MatryoshkaTestInfo.md#subreplierindex)

## Properties

### confidence

• **confidence**: `number`

置信度，默认的选择函数中需要确保该值在[0,1]区间

#### Inherited from

[TestInfo](TestInfo.md).[confidence](TestInfo.md#confidence)

___

### data

• `Optional` **data**: `any`

额外数据，在[test](../classes/Replier.md#test)中赋值，传递给[reply](../classes/Replier.md#reply)使用

#### Inherited from

[TestInfo](TestInfo.md).[data](TestInfo.md#data)

___

### replierIndex

• `Optional` **replierIndex**: `number`

当前回复器在所属回复器集合中的下标，由外部设置

#### Inherited from

[TestInfo](TestInfo.md).[replierIndex](TestInfo.md#replierindex)

___

### options

• `Optional` **options**: [`TestParams`](TestParams.md)

测试选项，由外部设置

#### Inherited from

[TestInfo](TestInfo.md).[options](TestInfo.md#options)

___

### subReplierIndex

• `Optional` **subReplierIndex**: `number`

当前回复器在所属回复器集合中的下标，由外部设置
