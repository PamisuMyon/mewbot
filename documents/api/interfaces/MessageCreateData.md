[mewbot](../README.md) / MessageCreateData

# Interface: MessageCreateData

通过WebSocket接收的消息创建数据

## Table of contents

### Properties

- [id](MessageCreateData.md#id)
- [author\_id](MessageCreateData.md#author_id)
- [node\_id](MessageCreateData.md#node_id)
- [topic\_id](MessageCreateData.md#topic_id)
- [content](MessageCreateData.md#content)
- [stamp](MessageCreateData.md#stamp)
- [media](MessageCreateData.md#media)
- [thought](MessageCreateData.md#thought)
- [attachments](MessageCreateData.md#attachments)
- [embeds](MessageCreateData.md#embeds)
- [mentions](MessageCreateData.md#mentions)
- [mention\_roles](MessageCreateData.md#mention_roles)
- [mention\_everyone](MessageCreateData.md#mention_everyone)
- [type](MessageCreateData.md#type)
- [parent](MessageCreateData.md#parent)
- [nonce](MessageCreateData.md#nonce)
- [profile\_card](MessageCreateData.md#profile_card)
- [created\_at](MessageCreateData.md#created_at)
- [edited\_at](MessageCreateData.md#edited_at)
- [objects](MessageCreateData.md#objects)
- [\_user](MessageCreateData.md#_user)
- [\_media](MessageCreateData.md#_media)
- [\_isDirect](MessageCreateData.md#_isdirect)

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

• **thought**: `string`

想法id

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

### objects

• **objects**: [`CommonObjects`](CommonObjects.md)

___

### \_user

• `Optional` **\_user**: [`User`](User.md)

额外添加字段：用户信息

___

### \_media

• `Optional` **\_media**: [`Media`](Media.md)[]

额外添加字段：媒体信息

___

### \_isDirect

• `Optional` **\_isDirect**: `boolean`

额外添加字段：是否为私聊消息
