---
title: "Open API Specifications"
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
|`info.description`| | **MUST** |
|`info.license`| | `info.license.name` **MUST** `info.license.url` **MUST** |
|`info.version`| | **MUST** |
| `info.contact`| Contains details on appropriate mechanism for contacting the API provider | `info.contact.name` **MUST** `info.contact.url` **MUST** |

### Property Descriptions

Open API property descriptions are intended to be used by API consumer developers to understand the purpose of a specification property. Description fields support [CommonMark Syntax](https://spec.commonmark.org/) which **SHOULD** be used as it enables formatting supported by most rich text OpenAPI tooling.

```yaml
  description: >-
    OpenAPI Specification for example API Provider API.</br>
    By consuming these APIs, an API Consumer can achieve specific business outcomes.</br></br>
    These APIs can be called by API Consumers during processing of the following endpoints:</br>
    `POST /abc`</br>
    `POST /def`</br>
    `POST /hij`
```

The above example would render in standard tooling as follows

:::info The above example would render in standard tooling similar to the following honouring CommonMark syntax
<img src="/img/content/oas-description.png"/>
:::

