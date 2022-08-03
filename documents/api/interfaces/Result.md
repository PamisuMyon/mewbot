[mewbot](../README.md) / Result

# Interface: Result<T\>

通用的API返回数据类型，用来统一服务端返回值

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [data](Result.md#data)
- [error](Result.md#error)

## Properties

### data

• `Optional` **data**: `T`

数据，服务端返回正确结果时有值

___

### error

• `Optional` **error**: [`ErrorBody`](ErrorBody.md)

错误，服务端返回错误结果时有值
