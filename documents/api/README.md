mewbot

# mewbot

## Table of contents

### Enumerations

- [LogLevel](enums/LogLevel.md)
- [AuthMode](enums/AuthMode.md)
- [ConnectStatus](enums/ConnectStatus.md)
- [DispatchEvent](enums/DispatchEvent.md)

### Classes

- [Logger](classes/Logger.md)
- [MewClient](classes/MewClient.md)
- [WsHandler](classes/WsHandler.md)

### Variables

- [logger](README.md#logger)

### Functions

- [setLogger](README.md#setlogger)
- [initConnectOptions](README.md#initconnectoptions)
- [refine](README.md#refine)

### Interfaces

- [ConnectOptions](interfaces/ConnectOptions.md)
- [Result](interfaces/Result.md)
- [CommonObjects](interfaces/CommonObjects.md)
- [ErrorBody](interfaces/ErrorBody.md)
- [Stamps](interfaces/Stamps.md)
- [Stamp](interfaces/Stamp.md)
- [Reaction](interfaces/Reaction.md)
- [Message](interfaces/Message.md)
- [TopicMessageResult](interfaces/TopicMessageResult.md)
- [STSToken](interfaces/STSToken.md)
- [MediaImageInfo](interfaces/MediaImageInfo.md)
- [Dispatch](interfaces/Dispatch.md)
- [UserTypingData](interfaces/UserTypingData.md)
- [MessageCreateData](interfaces/MessageCreateData.md)
- [Media](interfaces/Media.md)
- [ThoughtEngagementData](interfaces/ThoughtEngagementData.md)
- [MessageEngagementData](interfaces/MessageEngagementData.md)
- [CommentEngagementData](interfaces/CommentEngagementData.md)
- [NodeMemberAddData](interfaces/NodeMemberAddData.md)
- [OutgoingMessage](interfaces/OutgoingMessage.md)
- [Node](interfaces/Node.md)
- [Mod](interfaces/Mod.md)
- [Role](interfaces/Role.md)
- [Joinquestion](interfaces/Joinquestion.md)
- [Topic](interfaces/Topic.md)
- [Thoughts](interfaces/Thoughts.md)
- [Thought](interfaces/Thought.md)
- [OutgoingThought](interfaces/OutgoingThought.md)
- [Post](interfaces/Post.md)
- [Content](interfaces/Content.md)
- [Embed](interfaces/Embed.md)
- [Comments](interfaces/Comments.md)
- [Comment](interfaces/Comment.md)
- [OutgoingComment](interfaces/OutgoingComment.md)
- [Auth](interfaces/Auth.md)
- [User](interfaces/User.md)
- [Member](interfaces/Member.md)

### Type Aliases

- [MessageDeleteData](README.md#messagedeletedata)

## Variables

### logger

• **logger**: [`Logger`](classes/Logger.md)

## Functions

### setLogger

▸ **setLogger**(`l`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | [`Logger`](classes/Logger.md) |

#### Returns

`void`

___

### initConnectOptions

▸ **initConnectOptions**(`options?`): [`ConnectOptions`](interfaces/ConnectOptions.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`ConnectOptions`](interfaces/ConnectOptions.md)\> |

#### Returns

[`ConnectOptions`](interfaces/ConnectOptions.md)

___

### refine

▸ **refine**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Message`](interfaces/Message.md) \| [`MessageCreateData`](interfaces/MessageCreateData.md) |

#### Returns

`void`

## Type Aliases

### MessageDeleteData

Ƭ **MessageDeleteData**: [`Message`](interfaces/Message.md)
