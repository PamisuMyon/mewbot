# 事件

使用[MewClient.on](./api/classes/MewClient.md#on)来监听事件。

## `open`: `void`
WebSocket连接开启。

## `close`: `void`
WebSocket连接关闭。

## `dispatch`: [`Dispatch`](./api/interfaces/Dispatch.md)
总分发事件，MewClient内部会对该事件分类后再分发，通常情况下，您应监听以下再分发的子事件，无需监听总分发事件。

如果没有您需要的子事件，则监听此总分发事件，`event`字段为事件类型，`data`字段为数据。

完整的事件列表请参考[yige233/bettermew/mew.frame.js](https://github.com/yige233/bettermew/blob/main/mew.frame.js)

## `user_typing`: [`UserTyping`](./api/interfaces/UserTyping.md)
用户正在输入。

## `message_create`: [`Message`](./api/interfaces/Message.md) 
新消息。

## `message_delete`: [`Message`](./api/interfaces/Message.md) 
消息删除（撤回）。

## `message_engagement`: [`Engagement`](./api/interfaces/Engagement.md)
消息发生变化（情绪增加/减少)。

## `thought_create`: [`Thought`](./api/interfaces/Thought.md)
新想法。

## `thought_update`: [`Thought`](./api/interfaces/Thought.md)
想法更新（内容更新、下沉/解除下沉等）。

## `thought_engagement`: [`Engagement`](./api/interfaces/Engagement.md)
想法发生变化（情绪增加/减少、评论增加/删除)。

## `comment_create`: [`Comment`](./api/interfaces/Comment.md)
新评论。

## `comment_engagement`: [`Engagement`](./api/interfaces/Engagement.md)
评论发生变化（情绪增加/减少、评论有新回复）。

## `node_member_add`: [`Member`](./api/interfaces/Member.md)
据点成员加入。

## `node_member_remove`: [`Member`](./api/interfaces/Member.md)
据点成员移除。

## `node_member_ban`: [`Member`](./api/interfaces/Member.md)
成员进入据点黑名单。

## `node_member_activity_change`: [`NodeMemberActivityChange`](./api/interfaces/NodeMemberActivityChange.md)
据点活跃成员变化。
