[mewbot](../README.md) / InitOptions

# Interface: InitOptions

bot初始化选项

## Table of contents

### Properties

- [storage](InitOptions.md#storage)
- [repliers](InitOptions.md#repliers)
- [replierPickFunction](InitOptions.md#replierpickfunction)

## Properties

### storage

• `Optional` **storage**: [`IBotStorage`](IBotStorage.md)

存储，默认为[FileStorage](../classes/FileStorage.md)

___

### repliers

• `Optional` **repliers**: [`Replier`](../classes/Replier.md)[]

回复器列表，回复器位置越前，优先级越高

___

### replierPickFunction

• `Optional` **replierPickFunction**: [`ReplierPickFunction`](../README.md#replierpickfunction)

回复器挑选函数

内置实现参照 [pick01](../classes/Replier.md#pick01)（默认）, [pick](../classes/Replier.md#pick)
