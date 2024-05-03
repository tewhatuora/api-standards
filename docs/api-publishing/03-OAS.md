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

|Property|Description|Requirement|
|:---|:---|:---|
|`externalDocs`| A reference to documentation that supports the API. | **MUST** for FHIR APIs (reference the implementation guide) **SHOULD** for non-FHIR APIs |

### Paths Section

The `paths` section is a parent property that contains a list of the resource paths in the API and the properties associated with each resource path.

|Property|Description|Requirement|
|:---|:---|:---|
|`{path}.summary`| A short human readable summary of the resource purpose | **MUST** |
|`{path}.description`|See [Property Descriptions](#property-descriptions)|**MUST**|
|`{path}.{http-verb}.summary`|A short human readable summary of the resource operation purpose|**MUST**|
|`{path}.{http-verb}.operationId`|A **UNIQUE** string to identify the operation. Used by tools and libraries to uniquely identify the operation.|**MUST**|
|`{path}.{http-verb}.requestBody`|The request body appropriate for this operation. See [Request Body](#request-body).|**MUST** for `POST`, `PUT`, `PATCH` verbs. **MUST NOT** for `GET`, `DELETE`, `HEAD`, `OPTIONS` verbs.|
|`{path}.{http-verb}.responses`|A list of the responses that an API Consumer can expect from the operation.|**MUST**|
|`{path}.{http-verb}.responses`|A list of the responses that an API Consumer can expect from the operation. See [Responses](#responses)|**MUST**|



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

### Responses

An open API specification path/http-verb **SHOULD** include **ALL** responses by HTTP response code. **MUST** include error responses and where possible **SHOULD** refer to an error schema

```yaml
responses:
  '200':
    description: API request success
    content:
      application/fhir+json:
        schema:
          $ref: '#/components/schemas/Observation'
  '400':
    description: Bad request error. The request failed due to invalid input format or a validation error - retrying the request will not succeed
    content:
      application/fhir+json:
        schema:
          $ref: '#/components/schemas/OperationOutcome'
  '404':
    description: Resource not found error. The request failed as the requested resource could not be found on the server.
    content:
      application/fhir+json:
        schema:
          $ref: '#/components/schemas/OperationOutcome'
  '500':
    description: Server error
    content:
      application/fhir+json:
        schema:
          $ref: '#/components/schemas/OperationOutcome'
```

### Request Body

Where an OpenAPI Specification defines a `POST`, `PUT`, or `PATCH` operation this **MUST** include a `requestBody` property that defines the operation request content. The `requestBody` **SHOULD** include a reference to a `schemas` object defined in the `components` section of the OpenAPI specification.

```yaml
post:
  summary: Create a new instance of a resource
  operationId: createObservation
  requestBody:
    description: The payload for the new resource
    required: true
    content:
      application/fhir+json:
        schema:
          $ref: '#/components/schemas/Observation'
```

## OpenAPI Validation

The OpenAPI document **MUST** pass validation against the OpenAPI specification. There are a number of tools available which can perform validation such as the online [Swagger Editor](https://swagger.io/tools/swagger-editor). This validation can be added into an automated pipeline or within a developer IDE.
