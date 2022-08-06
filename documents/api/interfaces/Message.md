[mewbot](../README.md) / Message

# Interface: Message

消息

## Table of contents

### Properties

- [id](Message.md#id)
- [author\_id](Message.md#author_id)
- [node\_id](Message.md#node_id)
- [topic\_id](Message.md#topic_id)
- [content](Message.md#content)
- [stamp](Message.md#stamp)
- [media](Message.md#media)
- [thought](Message.md#thought)
- [thread](Message.md#thread)
- [attachments](Message.md#attachments)
- [embeds](Message.md#embeds)
- [mentions](Message.md#mentions)
- [mention\_roles](Message.md#mention_roles)
- [mention\_everyone](Message.md#mention_everyone)
- [type](Message.md#type)
- [parent](Message.md#parent)
- [nonce](Message.md#nonce)
- [profile\_card](Message.md#profile_card)
- [created\_at](Message.md#created_at)
- [edited\_at](Message.md#edited_at)
- [triggered\_thought](Message.md#triggered_thought)
- [first\_be\_replied](Message.md#first_be_replied)
- [reply\_to\_message\_id](Message.md#reply_to_message_id)
- [root\_message\_id](Message.md#root_message_id)
- [reactions](Message.md#reactions)
- [objects](Message.md#objects)
- [\_user](Message.md#_user)
- [\_media](Message.md#_media)
- [\_isDirect](Message.md#_isdirect)

## Properties

### id

• **id**: `string`

消息id

___

### author\_id

• **author\_id**: `string`

作者id

___

### node\_id

• **node\_id**: `string`

据点id

___

### topic\_id

• **topic\_id**: `string`

话题/节点id

___

### content

• `Optional` **content**: `string`

文本内容

___

### stamp

• `Optional` **stamp**: `string`

表情

___

### media

• **media**: `string`[]

媒体id

___

### thought

• `Optional` **thought**: `string`

想法id

___

### thread

• `Optional` **thread**: `any`

___

### attachments

• `Optional` **attachments**: `any`[]

___

### embeds

• `Optional` **embeds**: [`Embed`](Embed.md)[]

___

### mentions

• `Optional` **mentions**: `string`[]

___

### mention\_roles

• `Optional` **mention\_roles**: `any`[]

___

### mention\_everyone

• **mention\_everyone**: `boolean`

___

### type

• **type**: `number`

___

### parent

• `Optional` **parent**: `any`

___

### nonce

• `Optional` **nonce**: `string`

___

### profile\_card

• `Optional` **profile\_card**: `any`

___

### created\_at

• **created\_at**: `string`

___

### edited\_at

• `Optional` **edited\_at**: `string`

___

### triggered\_thought

• `Optional` **triggered\_thought**: `any`

___

### first\_be\_replied

• `Optional` **first\_be\_replied**: `any`

___

### reply\_to\_message\_id

• `Optional` **reply\_to\_message\_id**: `string`

___

### root\_message\_id

• `Optional` **root\_message\_id**: `string`

___

### reactions

• `Optional` **reactions**: `any`[]

___

### objects

• **objects**: [`CommonObjects`](CommonObjects.md)

___

### \_user

• **\_user**: [`User`](User.md)

额外添加字段：用户信息

___

### \_media

• **\_media**: [`Media`](Media.md)[]

额外添加字段：消息正文中包含的媒体信息

___

### \_isDirect

• **\_isDirect**: `boolean`

额外添加字段：是否为私聊消息
