[mewbot](../README.md) / MewClient

# Class: MewClient
- [授权](MewClient.md#授权)
- [连接](MewClient.md#连接)
- [消息](MewClient.md#消息)
- [想法](MewClient.md#想法)
- [媒体](MewClient.md#媒体)
- [据点](MewClient.md#据点)
- [用户](MewClient.md#用户)
- [通用](MewClient.md#通用)

*带有 **🛡管理员** 标记的API需要管理权限。

## 授权

### auth

• `get` **auth**(): [`Auth`](../interfaces/Auth.md)

当前授权token信息

#### Returns

[`Auth`](../interfaces/Auth.md)

___

### hasAuth

• `get` **hasAuth**(): `boolean`

是否有授权token

#### Returns

`boolean`

___

### setToken

▸ **setToken**(`token`): `void`

设置授权Token

官方暂未提供token获取方式，请使用抓包工具自行抓取

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | 授权token |

#### Returns

`void`

___

### login

▸ **login**(`username`, `password`): `Promise`<[`Result`](../interfaces/Result.md)<[`Auth`](../interfaces/Auth.md)\>\>

账密登录

**`Deprecated`**

官方已不再使用v1登录API，无法确保其可用性，请使用[setToken](MewClient.md#settoken)替代

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | 账户 |
| `password` | `string` | 密码 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Auth`](../interfaces/Auth.md)\>\>

## 连接

### connect

▸ **connect**(`options`): `void`

开启连接

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<[`ConnectOptions`](../interfaces/ConnectOptions.md)\> | 连接选项 |

#### Returns

`void`

___

### close

▸ **close**(): `void`

关闭连接

#### Returns

`void`


### on

▸ **on**<`K`\>(`eventName`, `fn`): `void`

监听事件

参考[事件](./Events.md)

___

### off

▸ **off**<`K`\>(`eventName`, `fn`): `void`

取消监听事件

参考[事件](./Events.md)

## 消息

### sendMessage

▸ **sendMessage**(`topic_id`, `message`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

发送消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |
| `message` | [`OutgoingMessage`](../interfaces/OutgoingMessage.md) | 消息 参考[OutgoingMessage](../interfaces/OutgoingMessage.md) |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

___

### sendTextMessage

▸ **sendTextMessage**(`topic_id`, `content`, `replyToMessageId?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

发送文本消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |
| `content` | `string` | 文本内容，长度超过服务器允许的最大值（2000）时，将会返回`ValidationError` |
| `replyToMessageId?` | `string` | 要回复的消息id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

___

### sendTextMessageSafely

▸ **sendTextMessageSafely**(`topic_id`, `content`, `replyToMessageId?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>[]\>

发送超长文本消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |
| `content` | `string` | 文本内容，长度超过服务器允许的最大值（2000）时，将会分割为多条发送，暂不支持完美分割emoji |
| `replyToMessageId?` | `string` | 要回复的消息id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>[]\>

___

### sendStampMessage

▸ **sendStampMessage**(`topic_id`, `stamp_id`, `replyToMessageId?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

发送表情消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |
| `stamp_id` | `string` | 表情id 参考[getStamps](MewClient.md#getstamps) |
| `replyToMessageId?` | `string` | 要回复的消息id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

___

### sendThoughtMessage

▸ **sendThoughtMessage**(`topic_id`, `thought_id`, `replyToMessageId?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

发送想法消息（转发想法到节点）

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |
| `thought_id` | `string` | 想法id |
| `replyToMessageId?` | `string` | 要回复的消息id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

___

### sendImageMessage

▸ **sendImageMessage**(`topic_id`, `filePath`, `replyToMessageId?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

发送图片消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |
| `filePath` | `string` | 文件路径 |
| `replyToMessageId?` | `string` | 要回复的消息id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Message`](../interfaces/Message.md)\>\>

___

### getTopicMessages

▸ **getTopicMessages**(`topic_id`, `limit?`, `before?`, `after?`): `Promise`<[`Result`](../interfaces/Result.md)<[`TopicMessageResult`](../interfaces/TopicMessageResult.md)\>\>

获取某个节点的消息

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `topic_id` | `string` | `undefined` | 话题/节点id |
| `limit` | `number` | `50` | 数量，默认50 |
| `before?` | `string` | `undefined` | 消息id，获取该条消息之前的消息 |
| `after?` | `string` | `undefined` | 消息id，获取该条消息之后的消息 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`TopicMessageResult`](../interfaces/TopicMessageResult.md)\>\>

___

### readMessage

▸ **readMessage**(`topic_id`, `message_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

标记该条消息之前的消息为已读

如果在节点、私聊中发送了消息，服务端会自动将该条消息之前的所有消息标记为已读，不需要手动调用本方法

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |
| `message_id` | `string` | 消息id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### deleteMessage

▸ **deleteMessage**(`message_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

撤回/删除消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message_id` | `string` | 消息id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### addMessageReaction

▸ **addMessageReaction**(`message_id`, `stamp_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

给消息添加情绪（表情）

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message_id` | `string` | 消息id |
| `stamp_id` | `string` | 表情id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

___

### deleteMessageReaction

▸ **deleteMessageReaction**(`message_id`, `stamp_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

取消给消息添加的情绪（表情）

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message_id` | `string` | 消息id |
| `stamp_id` | `string` | 表情id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

## 想法

### getNodeThoutghts

▸ **getNodeThoutghts**(`node_id`, `limit?`, `sort?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Thoughts`](../interfaces/Thoughts.md)\>\>

获取据点下所有话题的想法

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `node_id` | `string` | `undefined` | 话题/节点 id |
| `limit` | `number` | `20` | 数量，默认20 |
| `sort` | `string` | `'reply'` | 排序类型，默认为‘reply’ 按最后回复时间排序 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Thoughts`](../interfaces/Thoughts.md)\>\>

___

### getTopicThoughts

▸ **getTopicThoughts**(`topic_id`, `limit?`, `sort?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Thoughts`](../interfaces/Thoughts.md)\>\>

获取指定话题下的想法

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `topic_id` | `string` | `undefined` | 话题/节点id |
| `limit` | `number` | `20` | 数量，默认20 |
| `sort` | `string` | `'reply'` | 排序类型，默认为‘reply’ 按最后回复时间排序 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Thoughts`](../interfaces/Thoughts.md)\>\>

___

### getThought

▸ **getThought**(`thought_id`): `Promise`<[`Result`](../interfaces/Result.md)<[`Thought`](../interfaces/Thought.md)\>\>

获取想法

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thought_id` | `string` | 想法id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Thought`](../interfaces/Thought.md)\>\>

___

### postThought

▸ **postThought**(`topic_id`, `thought`): `Promise`<[`Result`](../interfaces/Result.md)<[`Thought`](../interfaces/Thought.md)\>\>

发表想法

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |
| `thought` | [`OutgoingThought`](../interfaces/OutgoingThought.md) | 想法，参考[OutgoingThought](../interfaces/OutgoingThought.md) |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Thought`](../interfaces/Thought.md)\>\>

___

### postSimpleThought

▸ **postSimpleThought**(`topic_id`, `text`): `Promise`<[`Result`](../interfaces/Result.md)<[`Thought`](../interfaces/Thought.md)\>\>

发表纯文本想法

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |
| `text` | `string` | 文本 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Thought`](../interfaces/Thought.md)\>\>

___

### deleteThought

▸ **deleteThought**(`thought_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

删除想法

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thought_id` | `string` | 想法id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### embeds

▸ **embeds**(`embedUrl`): `Promise`<[`Result`](../interfaces/Result.md)<[`Embed`](../interfaces/Embed.md)\>\>

解析链接为嵌入内容

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `embedUrl` | `string` | 链接 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Embed`](../interfaces/Embed.md)\>\>

___

### addThoughtReaction

▸ **addThoughtReaction**(`thought_id`, `stamp_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

给想法添加情绪

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thought_id` | `string` | 想法id |
| `stamp_id` | `string` | 表情id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### deleteThoughtReaction

▸ **deleteThoughtReaction**(`thought_id`, `stamp_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

取消给想法添加的情绪

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thought_id` | `string` | 想法id |
| `stamp_id` | `string` | 表情id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### sinkThought

▸ **sinkThought**(`thought_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

下沉想法

**🛡管理员**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thought_id` | `string` | 想法id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### unsinkThought

▸ **unsinkThought**(`thought_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

取消下沉想法

**🛡管理员**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thought_id` | `string` | 想法id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### moveThought

▸ **moveThought**(`thought_id`, `topicId`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

移动想法

**🛡管理员**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thought_id` | `string` | 想法id |
| `topicId` | `string` | - |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### getComments

▸ **getComments**(`thought_id`, `limit?`, `before?`, `after?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Comments`](../interfaces/Comments.md)\>\>

获取想法下评论

传递before=null, after='0' 按时间正序开始获取

传递before=null, after=null 按时间倒序开始获取

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `thought_id` | `string` | `undefined` | 想法id |
| `limit` | `number` | `20` | 数量 |
| `before?` | `string` | `undefined` | 评论id，获取该条评论之后的评论 |
| `after?` | `string` | `undefined` | 评论id，获取该条评论之前的消评论， |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Comments`](../interfaces/Comments.md)\>\>

___

### postComment

▸ **postComment**(`thought_id`, `content`, `imageFile?`, `parentId?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Comment`](../interfaces/Comment.md)\>\>

发表评论

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thought_id` | `string` | 想法id |
| `content` | `string` | 文本内容 |
| `imageFile?` | `string` | 图片文件 (可选) |
| `parentId?` | `string` | 要回复的评论id (可选) |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Comment`](../interfaces/Comment.md)\>\>

▸ **postComment**(`thought_id`, `comment`): `Promise`<[`Result`](../interfaces/Result.md)<[`Comment`](../interfaces/Comment.md)\>\>

发表评论

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thought_id` | `string` | 想法id |
| `comment` | [`OutgoingComment`](../interfaces/OutgoingComment.md) | 评论 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Comment`](../interfaces/Comment.md)\>\>

___

### deleteComment

▸ **deleteComment**(`comment_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

删除评论

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comment_id` | `string` | 评论id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### addCommentReaction

▸ **addCommentReaction**(`comment_id`, `stamp_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

给评论添加情绪

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comment_id` | `string` | 评论id |
| `stamp_id` | `string` | 表情id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### deleteCommentReaction

▸ **deleteCommentReaction**(`comment_id`, `stamp_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

取消给评论添加的情绪

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comment_id` | `string` | 评论id |
| `stamp_id` | `string` | 表情id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

## 媒体

### uploadImage

▸ **uploadImage**(`filePath`, `retry?`, `retryInterval?`): `Promise`<[`Result`](../interfaces/Result.md)<[`MediaImageInfo`](../interfaces/MediaImageInfo.md)\>\>

上传图片

参考 [veImageX 图片上传](https://www.volcengine.com/docs/508/67331)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `filePath` | `string` | `undefined` | 文件路径 |
| `retry` | `number` | `2` | 上传重试次数，默认 2 |
| `retryInterval` | `number` | `200` | 重试间隔，默认200 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`MediaImageInfo`](../interfaces/MediaImageInfo.md)\>\>

图片信息

___

### stsToken

▸ **stsToken**(): `Promise`<[`Result`](../interfaces/Result.md)<[`STSToken`](../interfaces/STSToken.md)\>\>

获取veImagex上传所需STSToken

通常不需要直接调用此方法，请使用 [uploadImage](MewClient.md#uploadimage)

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`STSToken`](../interfaces/STSToken.md)\>\>

___

### imagexUpload

▸ **imagexUpload**(`token`, `filePath`): `Promise`<`any`\>

veImagex上传

通常不需要直接调用此方法，请使用 [uploadImage](MewClient.md#uploadimage)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | [`STSToken`](../interfaces/STSToken.md) | STSToken |
| `filePath` | `string` | 文件路径 |

#### Returns

`Promise`<`any`\>

___

### getImageInfo

▸ **getImageInfo**(`imageUri`): `Promise`<[`Result`](../interfaces/Result.md)<[`MediaImageInfo`](../interfaces/MediaImageInfo.md)\>\>

获取图片信息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `imageUri` | `string` | 图片uri |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`MediaImageInfo`](../interfaces/MediaImageInfo.md)\>\>

## 据点

### getNodeInfo

▸ **getNodeInfo**(`node_id`): `Promise`<[`Result`](../interfaces/Result.md)<[`Node`](../interfaces/Node.md)\>\>

获取据点信息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node_id` | `string` | 据点id （数字或英文id，非MewCode） |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Node`](../interfaces/Node.md)\>\>

___

### modifyNodeInfo

▸ **modifyNodeInfo**(`node_id`, `info`): `Promise`<[`Result`](../interfaces/Result.md)<[`Node`](../interfaces/Node.md)\>\>

修改据点信息

**🛡管理员**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node_id` | `string` | 据点id （数字或英文id，非MewCode） |
| `info` | [`OutgoingNode`](../interfaces/OutgoingNode.md) | 据点信息 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Node`](../interfaces/Node.md)\>\>

___

### getNodeMembers

▸ **getNodeMembers**(`node_id`, `after?`, `before?`, `userWithRelationship?`, `type?`, `limit?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Members`](../interfaces/Members.md)\>\>

获取据点成员列表

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `node_id` | `string` | `undefined` | 据点id |
| `after?` | `string` | `undefined` | 下一页指针，对应结果中的`next_cursor`字段 |
| `before?` | `string` | `undefined` | 上一页指针，对应结果中的`prev_cursor`字段 |
| `userWithRelationship` | `boolean` | `false` | 为true时，填充User对象中的关系字段，例如`following`是否关注与`followed_by`是否关注了我 |
| `type?` | `string` | `undefined` | 传入'restricted'获取受限成员 |
| `limit` | `number` | `50` | 数量 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Members`](../interfaces/Members.md)\>\>

___

### getNodeMember

▸ **getNodeMember**(`node_id`, `user_id`): `Promise`<[`Result`](../interfaces/Result.md)<[`Member`](../interfaces/Member.md)\>\>

获取据点单个成员

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node_id` | `string` | 据点id |
| `user_id` | `string` | 用户id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Member`](../interfaces/Member.md)\>\>

___

### modifyNodeMemberPermission

▸ **modifyNodeMemberPermission**(`node_id`, `user_id`, `permissions_deny`): `Promise`<[`Result`](../interfaces/Result.md)<[`Member`](../interfaces/Member.md)\>\>

修改据点成员权限，例如参与讨论、发表想法、发表评论

```javascript
const p = PermissionFlag.Speak | PermissionFlag.Comment;
const hasSpeak = (p & PermissionFlag.Speak) != 0;
```

**🛡管理员**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node_id` | `string` | 据点id |
| `user_id` | `string` | 用户id |
| `permissions_deny` | `number` | 禁用的权限Flag 使用位运算组合 参照[PermissionFlag](../enums/PermissionFlag.md), 传入0解除所有限制 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Member`](../interfaces/Member.md)\>\>

___

### deleteNodeMember

▸ **deleteNodeMember**(`node_id`, `user_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

将成员移出据点

**🛡管理员**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node_id` | `string` | 据点id |
| `user_id` | `string` | 用户id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### getNodeBans

▸ **getNodeBans**(`node_id`, `after?`, `before?`, `limit?`): `Promise`<[`Result`](../interfaces/Result.md)<[`Members`](../interfaces/Members.md)\>\>

获取据点黑名单

**🛡管理员**

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `node_id` | `string` | `undefined` | 据点id |
| `after?` | `string` | `undefined` | 下一页指针 |
| `before?` | `string` | `undefined` | 上一页指针 |
| `limit` | `number` | `50` | 数量 |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Members`](../interfaces/Members.md)\>\>

___

### banNodeMember

▸ **banNodeMember**(`node_id`, `user_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

将成员加入据点黑名单

**🛡管理员**

#### Parameters

| Name | Type |
| :------ | :------ |
| `node_id` | `string` |
| `user_id` | `string` |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### unbanNodeMember

▸ **unbanNodeMember**(`node_id`, `user_id`): `Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

将成员移出据点黑名单

**🛡管理员**

#### Parameters

| Name | Type |
| :------ | :------ |
| `node_id` | `string` |
| `user_id` | `string` |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`string`\>\>

返回data为空字符串代表成功

___

### getTopicInfo

▸ **getTopicInfo**(`topic_id`): `Promise`<[`Result`](../interfaces/Result.md)<[`Topic`](../interfaces/Topic.md)\>\>

获取话题/节点信息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic_id` | `string` | 话题/节点id |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Topic`](../interfaces/Topic.md)\>\>

## 用户

### getUserInfo

▸ **getUserInfo**(`username`): `Promise`<[`Result`](../interfaces/Result.md)<[`User`](../interfaces/User.md)\>\>

获取用户信息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | 用户Mew ID |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`User`](../interfaces/User.md)\>\>

___

### getMeInfo

▸ **getMeInfo**(): `Promise`<[`Result`](../interfaces/Result.md)<[`User`](../interfaces/User.md)\>\>

获取自身信息

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`User`](../interfaces/User.md)\>\>

## 通用

### request

▸ **request**<`T`\>(`url`, `options?`, `authMode?`): `Promise`<[`Result`](../interfaces/Result.md)<`T`\>\>

通用的json请求方法

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | `string` | `undefined` | url |
| `options?` | `any` | `undefined` | 请求配置，参考[got Options](https://github.com/sindresorhus/got/blob/main/documentation/2-options.md) |
| `authMode` | [`AuthMode`](../enums/AuthMode.md) | `AuthMode.NeedAuth` | 授权模式，参考[AuthMode](../enums/AuthMode.md) |

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<`T`\>\>

请求结果， 参考[Result](../interfaces/Result.md)

___

### getStamps

▸ **getStamps**(): `Promise`<[`Result`](../interfaces/Result.md)<[`Stamps`](../interfaces/Stamps.md)\>\>

获取表情

#### Returns

`Promise`<[`Result`](../interfaces/Result.md)<[`Stamps`](../interfaces/Stamps.md)\>\>
