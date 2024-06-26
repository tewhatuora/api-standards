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
| Property descriptions | A human readable description of a property defined in an AsyncAPI specification. Descriptions should be relatively verbose and provide enough information to enable the reader to understand the purpose of the property being described. | <ApiStandard id="HNZAS_MUST_ASYNCAPI_DESCRIPTIONS" type="MUST" toolTip="An AsyncAPI specification MUST describe all properties.">Specification authors **MUST** provide descriptions for all properties</ApiStandard> |

### AsyncAPI Section

|Property|Description|Requirement|
|:---|:---|:---|
|`asyncapi`| The version of the AsyncAPI specification being used | <ApiStandard id="HNZAS_MUST_ASYNCAPI_VERSION" type="MUST" toolTip="An AsyncAPI specification MUST identify which version of the specification is used">**MUST**</ApiStandard> |

### Info Section

The `info` section of an AsyncAPI specification contains details on the API Provider.

|Property|Description|Requirement|
|:---|:---|:---|
|`info.title`| The title of the API | <ApiStandard id="HNZAS_MUST_ASYNCAPI_TITLE" type="MUST" toolTip="An AsyncAPI specification MUST include a title">**MUST**</ApiStandard> |
|`info.description`|See [Property Descriptions](#property-descriptions) | <ApiStandard id="HNZAS_MUST_ASYNCAPI_DESCRIPTION" type="MUST" toolTip="An AsyncAPI specification MUST include a description">**MUST**</ApiStandard> |
|`info.license`| License used by the API | <ApiStandard id="HNZAS_MUST_ASYNCAPI_LICENCE" type="MUST" toolTip="An AsyncAPI specification MUST include a license name and url">**MUST**</ApiStandard> |
|`info.version`| The version of the API | <ApiStandard id="HNZAS_MUST_ASYNCAPI_VERSION" type="MUST" toolTip="An AsyncAPI specification MUST include the API version">**MUST**</ApiStandard> |
|`info.contact`| Contains details on appropriate mechanism for contacting the API Provider. | <ApiStandard id="HNZAS_MUST_ASYNCAPI_CONTACT" type="MUST" toolTip="An AsyncAPI specification MUST include contact details">**MUST**</ApiStandard> `info.contact.name` **MUST** `info.contact.url` **MUST** |

### Servers Section

|Property|Description|Requirement|
|:---|:---|:---|
|`servers.url`| The API Provider host | <ApiStandard id="HNZAS_MUST_ASYNCAPI_SERVERS" type="MUST" toolTip="An AsyncAPI specification MUST include servers">**MUST**</ApiStandard> |
|`servers.protocol`| The protocol supported by this API Provider host | <ApiStandard id="HNZAS_MUST_ASYNCAPI_PROTOCOL" type="MUST" toolTip="An AsyncAPI specification MUST include supported protocols">**MUST**</ApiStandard> |
|`servers.security`| The security mechanisms which can be used with this server | <ApiStandard id="HNZAS_MUST_ASYNCAPI_SECURITY" type="MUST" toolTip="An AsyncAPI specification MUST include security">**MUST**</ApiStandard> |
|`servers.description`| Additional information about this server such as the environment | <ApiStandard id="HNZAS_SHOULD_ASYNCAPI_DESCRIPTION" type="SHOULD" toolTip="An AsyncAPI specification SHOULD include description about the servers">**MUST**</ApiStandard> |

### Channels Section

Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers. Channels are also known as "topics", "routing keys", "event types" or "paths". Note that the structure of this section has changed significantly between versions 2 and 3 of the specification.

The below details describe what is expected, through different properties across versions.

<ApiStandard id="HNZAS_MUST_ASYNCAPI_TOPICNAME_V3" type="MUST" toolTip="When using v3 of AsyncAPI, the address field MUST contain the topic name" wrapper="li">When using v3 of AsyncAPI, the address field MUST contain the topic name</ApiStandard>
<ApiStandard id="HNZAS_MUST_ASYNCAPI_TOPICNAME_V2" type="MUST" toolTip="When using v2 of AsyncAPI, the topic name MUST be included in the description field" wrapper="li">When using v2 of AsyncAPI, the topic name MUST be included in the description field</ApiStandard>
<ApiStandard id="HNZAS_MUST_ASYNCAPI_MESSAGES_V3" type="MUST" toolTip="When using v3 of AsyncAPI, the messages field MUST be used" wrapper="li">When using v3 of AsyncAPI, the messages field **MUST** be used to represent the messages which are published to a channel</ApiStandard>
<ApiStandard id="HNZAS_MUST_ASYNCAPI_MESSAGES_V2" type="MUST" toolTip="When using v2 of AsyncAPI, the message field under the publish or subscribe field MUST be used" wrapper="li">When using v2 of AsyncAPI, the `message` field under the `publish` or `subscribe` field **MUST** be used</ApiStandard>

### External Docs Section

|Property|Description|Requirement|
|:---|:---|:---|
|`externalDocs.url`| A URL for further documentation about about the API. | <ApiStandard id="HNZAS_MUST_ASYNCAPI_DESCRIPTION" type="MUST" toolTip="An AsyncAPI specification MUST include externalDocs with further information about the API">**MUST**</ApiStandard> |

## AsyncAPI Validation

<ApiStandard id="HNZAS_MUST_ASYNCAPI_VALIDATION" type="MUST" toolTip="An AsyncAPI specification MUST pass validation">The AsyncAPI document **MUST** pass validation against the AsyncAPI specification. There are a number of tools available which can perform validation such as the online [Swagger Editor](https://swagger.io/tools/swagger-editor). This validation can be added into an automated pipeline or within a developer IDE.</ApiStandard>
