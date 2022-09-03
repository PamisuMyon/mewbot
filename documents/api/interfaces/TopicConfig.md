[mewbot](../README.md) / TopicConfig

# Interface: TopicConfig

话题/节点配置

## Table of contents

### Properties

- [id](TopicConfig.md#id)
- [name](TopicConfig.md#name)
- [isStatic](TopicConfig.md#isstatic)
- [repliers](TopicConfig.md#repliers)

## Properties

### id

• **id**: `string`

话题/节点id

___

### name

• **name**: `string`

话题/节点名称

___

### isStatic

• `Optional` **isStatic**: `boolean`

是否为静态配置，静态配置不可在运行中被移除

___

### repliers

• **repliers**: `Object`

回复器配置，`key`对应[type](../classes/Replier.md#type)，为`all`时表示启用所有回复器

#### Index signature

▪ [type: `string`]: [`ReplierConfig`](ReplierConfig.md)
