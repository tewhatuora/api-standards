---
title: "AsyncAPI Specifications"
slug: "asyncapi-specifications"
---

The AsyncAPI Specification is a project used to describe and document message-driven APIs in a machine-readable format. It’s protocol-agnostic, so you can use it for APIs that work over any [protocol](../api-development/Asynchronous%20APIs/Protocols) (e.g., AMQP, MQTT, WebSockets, Kafka, HTTP, etc).

The AsyncAPI Specification defines a set of files required to describe such an API. These files can then be used to create utilities, such as documentation, integration and/or testing tools.

## AsyncAPI Specification Structure

| Component | Description | Requirement |
|:---|:---|:---|
| AsyncAPI specification | The core specification | All mandatory fields defined in the specification itself |
| Property descriptions | A human readable description of a property defined in an AsyncAPI specification. Descriptions should be relatively verbose and provide enough information to enable the reader to understand the purpose of the property being described. | Specification authors **MUST** provide descriptions for all properties |

### AsyncAPI Section

|Property|Description|Requirement|
|:---|:---|:---|
|`asyncapi`| The version of the AsyncAPI specification being used | **MUST** |

### Info Section

The `info` section of an AsyncAPI specification contains details on the API Provider.

|Property|Description|Requirement|
|:---|:---|:---|
|`info.title`| The title of the API | **MUST** |
|`info.description`|See [Property Descriptions](#property-descriptions) | **MUST** |
|`info.license`| | `info.license.name` **MUST** `info.license.url` **MUST** |
|`info.version`| The version of the API | **MUST** |
|`info.contact`| Contains details on appropriate mechanism for contacting the API Provider | `info.contact.name` **MUST** `info.contact.url` **MUST** |

### Servers Section

|Property|Description|Requirement|
|:---|:---|:---|
|`servers.url`| The API Provider host | **MUST** |
|`servers.protocol`| The protocol supported by this API Provider host | **MUST** |
|`servers.security`| The security mechanisms which can be used with this server | **MUST** |
|`servers.description`| Additional information about this server such as the environment | **SHOULD** |

### Channels Section

Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers. Channels are also known as "topics", "routing keys", "event types" or "paths". Note that the structure of this section has changed significantly between versions 2 and 3 of the specification.

The below details describe what is expected, through different properties across versions.

- the `address` field in v3+ of the specification **MUST** contain the topic name. If using v2, this **MUST** be included in the description field
- the `servers` field **MUST** be used in indicate which servers where the channel is available for consumption
- the `messages` field in v3+ of the specification **MUST** be used to represent the messages which are published to a channel. In v2, the `message` field under the `publish` or `subscribe` field **MUST** be used

### External Docs Section

|Property|Description|Requirement|
|:---|:---|:---|
|`externalDocs.url`| A URL for further documentation about about the API. | **MUST** |

## AsyncAPI Validation

The AsyncAPI document **MUST** pass validation against the AsyncAPI specification. There are a number of tools available which can perform validation such as the online [Swagger Editor](https://swagger.io/tools/swagger-editor). This validation can be added into an automated pipeline or within a developer IDE.
