[mewbot](../README.md) / TestInfo

# Interface: TestInfo

回复器测试结果

## Hierarchy

- **`TestInfo`**

  ↳ [`MatryoshkaTestInfo`](MatryoshkaTestInfo.md)

## Table of contents

### Properties

- [confidence](TestInfo.md#confidence)
- [data](TestInfo.md#data)
- [replierIndex](TestInfo.md#replierindex)
- [options](TestInfo.md#options)

## Properties

### confidence

• **confidence**: `number`

置信度，默认的选择函数中需要确保该值在[0,1]区间

___

### data

• `Optional` **data**: `any`

额外数据，在[test](../classes/Replier.md#test)中赋值，传递给[reply](../classes/Replier.md#reply)使用

___

### replierIndex

• `Optional` **replierIndex**: `number`

当前回复器在所属回复器集合中的下标，由外部设置

___

### options

• `Optional` **options**: [`TestParams`](TestParams.md)

测试选项，由外部设置
