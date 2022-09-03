[mewbot](../README.md) / ConnectOptions

# Interface: ConnectOptions

MewClient连接选项

## Table of contents

### Properties

- [subcriptionNodes](ConnectOptions.md#subcriptionnodes)
- [handshakeTimeout](ConnectOptions.md#handshaketimeout)
- [heartbeatCheckTimeout](ConnectOptions.md#heartbeatchecktimeout)
- [reconnectTimeout](ConnectOptions.md#reconnecttimeout)

## Properties

### subcriptionNodes

• **subcriptionNodes**: `string`[]

订阅据点id集合

___

### handshakeTimeout

• **handshakeTimeout**: `number`

WebSocket握手超时

___

### heartbeatCheckTimeout

• **heartbeatCheckTimeout**: `number`

心跳检测间隔，超过此间隔为检测到心跳，则自动重连

___

### reconnectTimeout

• **reconnectTimeout**: `number`

重连前的延时
