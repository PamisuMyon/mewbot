# 事件

使用[MewClient.on](./api/classes/MewClient.md#on)来监听事件。

## `open`: `void`
WebSocket连接开启。

## `close`: `void`
WebSocket连接关闭。

## `dispatch`: [`Dispatch`](./api/interfaces/Dispatch.md)
总分发事件，MewClient内部会对该事件分类后再分发，通常情况下，您应监听以下再分发的子事件，无需监听总分发事件。

## `user_typing`: [`UserTypingData`](./api/interfaces/UserTypingData.md)
用户正在输入。

## `message_create`: [`MessageCreateData`](./api/interfaces/MessageCreateData.md)
新消息。

## `message_delete`: [`Message`](./api/interfaces/Message.md) 
消息删除（撤回）。

## `message_engagement`: [`MessageEngagementData`](./api/interfaces/MessageEngagementData.md)
新消息出现在中枢的跑马灯区。

## `thought_engagement`: [`ThoughtEngagementData`](./api/interfaces/ThoughtEngagementData.md)
想法有新的动态（新想法）。

## `comment_engagement`: [`CommentEngagementData`](./api/interfaces/CommentEngagementData.md)
评论有新的动态（新评论）。

## `node_member_add`: [`NodeMemberAddData`](./api/interfaces/NodeMemberAddData.md)
据点成员加入。
