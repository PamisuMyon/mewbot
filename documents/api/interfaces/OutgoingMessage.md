[mewbot](../README.md) / OutgoingMessage

# Interface: OutgoingMessage

发给服务端的消息结构

## Table of contents

### Properties

- [nonce](OutgoingMessage.md#nonce)
- [content](OutgoingMessage.md#content)
- [media](OutgoingMessage.md#media)
- [stamp](OutgoingMessage.md#stamp)
- [type](OutgoingMessage.md#type)
- [thought](OutgoingMessage.md#thought)
- [replyToMessageId](OutgoingMessage.md#replytomessageid)

## Properties

### nonce

• `Optional` **nonce**: `string`

nonce，使用发送消息相关接口时，将自动填充

___

### content

• `Optional` **content**: `string`

文本内容

___

### media

• `Optional` **media**: `string`[]

媒体内容，其中为媒体id

___

### stamp

• `Optional` **stamp**: `string`

表情贴纸id

___

### type

• `Optional` **type**: `number`

类型

___

### thought

• `Optional` **thought**: `string`

要转发的想法id

___

### replyToMessageId

• `Optional` **replyToMessageId**: `string`

要回复的消息id
