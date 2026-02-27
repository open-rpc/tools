# x-implemented-by Extension

## Introduction

The `x-implemented-by` extension declares which logical participant(s) are responsible for handling a JSON-RPC method.

## Purpose

This extension helps tooling and API consumers understand method ownership across participants:

- Clarifies who handles inbound requests for each method
- Supports multi-participant APIs (for example, `server` and `client`)
- Improves documentation and mock behavior for directional RPC flows

## Specification

- Type: array of non-empty strings
- Minimum items: 1
- Unique items: true
- Restricted to: `methodObject`
- Default (when omitted): `["server"]`

## Example

```json
{
  "openrpc": "1.2.6",
  "methods": [
    {
      "name": "subscribe",
      "x-implemented-by": ["server"]
    },
    {
      "name": "notification",
      "x-implemented-by": ["client"]
    }
  ]
}
```
