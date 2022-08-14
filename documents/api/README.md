mewbot

# mewbot

## Table of contents

### Enumerations

- [LogLevel](enums/LogLevel.md)
- [AuthMode](enums/AuthMode.md)
- [ConnectStatus](enums/ConnectStatus.md)
- [DispatchEvent](enums/DispatchEvent.md)
- [PermissionFlag](enums/PermissionFlag.md)

### Classes

- [Logger](classes/Logger.md)
- [MewClient](classes/MewClient.md)
- [WsHandler](classes/WsHandler.md)

### Variables

- [logger](README.md#logger)
- [ApiHost](README.md#apihost)
- [WsHost](README.md#wshost)
- [Constants](README.md#constants)

### Functions

- [setLogger](README.md#setlogger)
- [getHeaders](README.md#getheaders)
- [getWsHeaders](README.md#getwsheaders)
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
- [Dispatch](interfaces/Dispatch.md)
- [UserTyping](interfaces/UserTyping.md)
- [Media](interfaces/Media.md)
- [Engagement](interfaces/Engagement.md)
- [NodeMemberActivityChange](interfaces/NodeMemberActivityChange.md)
- [Message](interfaces/Message.md)
- [TopicMessageResult](interfaces/TopicMessageResult.md)
- [STSToken](interfaces/STSToken.md)
- [MediaImageInfo](interfaces/MediaImageInfo.md)
- [Direct](interfaces/Direct.md)
- [OutgoingMessage](interfaces/OutgoingMessage.md)
- [Node](interfaces/Node.md)
- [Mod](interfaces/Mod.md)
- [Role](interfaces/Role.md)
- [Joinquestion](interfaces/Joinquestion.md)
- [Topic](interfaces/Topic.md)
- [Members](interfaces/Members.md)
- [Member](interfaces/Member.md)
- [OutgoingNode](interfaces/OutgoingNode.md)
- [OutgoingTopic](interfaces/OutgoingTopic.md)
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

## Variables

### logger

• **logger**: [`Logger`](classes/Logger.md)

___

### ApiHost

• `Const` **ApiHost**: ``"https://api.mew.fun"``

___

### WsHost

• `Const` **WsHost**: ``"wss://gateway.mew.fun/socket.io/?EIO=4&transport=websocket"``

___

### Constants

• `Const` **Constants**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `MaxMessageContentLength` | `number` |

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

### getHeaders

▸ **getHeaders**(): `Record`<`string`, `any`\>

#### Returns

`Record`<`string`, `any`\>

___

### getWsHeaders

▸ **getWsHeaders**(): `Record`<`string`, `any`\>

#### Returns

`Record`<`string`, `any`\>

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
| `data` | [`Message`](interfaces/Message.md) |

#### Returns

`void`
