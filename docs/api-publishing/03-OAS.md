---
title: "OpenAPI Specifications"
slug: "openapi-specifications"
---

## OpenAPI Specification Structure

| Component | Description | Requirement |
|:---|:---|:---|
| OpenAPI specification | The core specification | All mandatory fields defined in the specification itself |
| Property descriptions | A human readable description of a property defined in an OpenAPI specification. Descriptions should be relatively verbose and provide enough information to enable the reader to understand the purpose of the property being described. | Specification authors **MUST** provide descriptions for all properties |

### Info Section

The `info` section of an OpenAPI specification contains details on the API Provider.

|Property|Description|Requirement|
|:---|:---|:---|
|`info.title`| | **MUST** |
|`info.description`|See [Property Descriptions](#property-descriptions) | **MUST** |
|`info.license`| | `info.license.name` **MUST** `info.license.url` **MUST** |
|`info.version`| The version of the OpenAPI document (not the API or OpenAPI version used) | **MUST** |
| `info.contact`| Contains details on appropriate mechanism for contacting the API provider | `info.contact.name` **MUST** `info.contact.url` **MUST** |
|`info.servers`| | **MUST** |

### External Documentation

|`externalDocs`| A reference to documentation that supports the API. | **MUST** for FHIR APIs (reference the implementation guide) **SHOULD** for non-FHIR APIs |

### Paths Section

The `paths` section is a parent property that contains a list of the resource paths in the API and the properties associated with each resource path.

|Property|Description|Requirement|
|:---|:---|:---|
|`{path}.summary`| A short human readable summary of the resource purpose | **MUST** |
|`{path}.description`|See [Property Descriptions](#property-descriptions)|**MUST**|
|`{path}.{http-verb}.summary`|A short human readable summary of the resource operation purpose|**MUST**|
|`{path}.{http-verb}.operationId`|A **UNIQUE** string to identify the operation. Used by tools and libraries to uniquely identify the operation.|**MUST**|
|`{path}.{http-verb}.responses`|A list of the responses that an API Consumer can expect from the operation.|**MUST**|




### Property Descriptions

OpenAPI property descriptions are intended to be used by API Consumer developers to understand the purpose of a specification property. Description fields support [CommonMark Syntax](https://spec.commonmark.org/) which **SHOULD** be used as it enables formatting supported by most rich text OpenAPI tooling.

```yaml
  description: >-
    OpenAPI Specification for example API Provider API.</br>
    By consuming these APIs, an API Consumer can achieve specific business outcomes.</br></br>
    These APIs can be called by API Consumers during processing of the following endpoints:</br>
    `POST /abc`</br>
    `POST /def`</br>
    `POST /hij`
```

:::info The above example would render in standard tooling similar to the following honouring CommonMark syntax
<img src="/img/content/oas-description.png"/>
:::

## OpenAPI Validation

The OpenAPI document **MUST** pass validation against the OpenAPI specification. There are a number of tools available which can perform validation such as the online [Swagger Editor](https://swagger.io/tools/swagger-editor). This validation can be added into an automated pipeline or within a developer IDE.
