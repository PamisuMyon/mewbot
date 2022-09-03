[mewbot](../README.md) / ReplierConfig

# Interface: ReplierConfig

回复器配置

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [spam](ReplierConfig.md#spam)

## Properties

### spam

• `Optional` **spam**: `Object`

指令冷却配置 参照[Spam](../classes/Spam.md)

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval?` | `number` | 连击生效间隔 |
| `threshold?` | `number` | 冷却连击阈值 |
| `cooldown?` | `number` | 冷却时间 单位毫秒 |
