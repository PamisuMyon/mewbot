[mewbot](../README.md) / AuthMode

# Enumeration: AuthMode

请求时的授权模式

## Table of contents

### Enumeration Members

- [NoAuth](AuthMode.md#noauth)
- [NeedAuth](AuthMode.md#needauth)
- [Free](AuthMode.md#free)

## Enumeration Members

### NoAuth

• **NoAuth** = ``0``

无需授权

___

### NeedAuth

• **NeedAuth** = ``1``

必须授权

___

### Free

• **Free** = ``2``

可不授权
如有授权token，则使用token，否则不使用
