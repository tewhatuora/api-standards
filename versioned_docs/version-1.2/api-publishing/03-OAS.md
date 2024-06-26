---
title: "OpenAPI Specifications"
slug: "openapi-specifications"
---

:::info

All components of the [OpenAPI Specification](https://swagger.io/specification/) are supported by this standard and should be interpreted as a **MAY** unless stated otherwise below.

:::

:::info

View example API specifications

[FHIR-APISpecification](../api-specifications/example-fhir-specification)

[REST-API-Specification](../api-specifications/example-agency-specification)

:::

## OpenAPI Specification Structure

| Component | Description | Requirement |
|:---|:---|:---|
| OpenAPI specification | The core specification | All mandatory fields defined in the specification itself |
| Property descriptions | A human readable description of a property defined in an OpenAPI specification. Descriptions should be relatively verbose and provide enough information to enable the reader to understand the purpose of the property being described. | Specification authors **MUST** provide descriptions for all properties |

### Servers Property

|Property|Description|Requirement|
|---|---|---|
|`servers`| Property defining a list of endpoints where the API can be accessed. | **MUST** |

```yaml
servers:
  - url: https://fhir.api.digital.health.nz/R4
    description: API Standards Example FHIR API URL
  - url: https://fhir.api-test.digital.health.nz/R4
    description: API Standards Example FHIR API Test URL
```

### Info Section

The `info` section of an OpenAPI specification contains details on the API Provider.

|Property|Description|Requirement|
|:---|:---|:---|
|`info.title`| | **MUST** |
|`info.description`|See [Property Descriptions](#property-descriptions) | **MUST** |
|`info.license`| | `info.license.name` **MUST** `info.license.url` **MUST** |
|`info.version`| The version of the OpenAPI document (not the API or OpenAPI version used) | **MUST** |
| `info.contact`| Contains details on appropriate mechanism for contacting the API provider | `info.contact.name` **MUST** `info.contact.url` **MUST** |
| `info.termsOfService`| Contains a link to the terms of service for the API | **SHOULD** |

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
|`{path}.{http-verb}.security`|The security scheme appropriate for the path/verb - see [security](#security)|**MUST**|
|`{path}.{http-verb}.operationId`|A **UNIQUE** string to identify the operation. Used by tools and libraries to uniquely identify the operation.|**MUST**|
|`{path}.{http-verb}.requestBody`|The request body appropriate for this operation. See [Request Body](#request-body).|**MUST** for `POST`, `PUT`, `PATCH` verbs. **MUST NOT** for `GET`, `DELETE`, `HEAD`, `OPTIONS` verbs.|
|`{path}.{http-verb}.responses`|A list of the responses that an API Consumer can expect from the operation. See [Responses](#responses)|**MUST**|

#### Security

Open API Specifications **MUST** define appropriate security mechanisms for the API.

Security schemes **MUST** be defined in `components.securitySchemes` and referenced in all API operations.

:::info

Note that if an operation is PUBLIC, for example a FHIR metadata endpoint, the definition in OpenAPI **SHOULD** still have a security property.

:::

**Example PUBLIC definition**

```yaml

paths:
  /fhir/mdr/v1/metadata:
    summary: Access to the Server's Capability Statement
    description: >-
      All FHIR Servers return a CapabilityStatement that describes what services
      they perform
    get:
      security: []
      summary: Return the server's capability statement

```

**Example Security Schemes**

```yaml

components:
  securitySchemes:
    api_key:
      type: "apiKey"
      name: "x-api-key"
      in: "header"
    oauth-client-credentials:
      type: oauth2
      description: Client credentials flow for system to system authentication
      flows:
        clientCredentials:
          tokenUrl: https://npd.auth.services.health.nz/realms/hnz-integration/protocol/openid-connect/token
          scopes:
            system/Observation.r: Grant read access to Observation resources
            system/Observation.c: Grant create access to Observation resources
            system/Observation.u: Grant update access to Observation resources
            system/Observation.d: Grant delete access to Observation resources
            system/Observation.rs: Grant read and search access to Observation resources
            system/Observation.crus: Grant full permissions to Observation resources

```

#### Responses

`{path}.{http-verb}.responses`

An open API specification path/http-verb **SHOULD** include **ALL** responses by HTTP response code. **MUST** include error responses and where possible **SHOULD** refer to an error schema

|Property|Description|Requirement|
|:---|:---|:---|
|`{path}.{http-verb}.responses.{code}.description`|See [Property Descriptions](#property-descriptions)|**MUST**|
|`{path}.{http-verb}.responses.{code}.content`|The definition of the content that an API Consumer can expect when consuming the API|**MUST**|
|`{path}.{http-verb}.responses.{code}.{media-type}`|The media type(s) that the API COnsumer can expect in the response - e.g. `application/fhir+json`. See also [Accept Headers](../api-development/Synchronous%20APIs/Headers#accept)|**MUST**|
|`{path}.{http-verb}.responses.{code}.{media-type}.schema`|The schema definition associated with the response|**MUST**|

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


API Providers **SHOULD NOT** include a `default` response. Whilst supported by OpenAPI this is discouraged.

Below is an example of a `default` response to illustrate what **SHOULD NOT** be used

```yaml
default:
  description: Error, with details
  content:
    application/fhir+json:
      schema:
        $ref: "#/components/schemas/OperationOutcome"
```

#### Request Body

`{path}.{http-verb}.requestBody`

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

### Components Section

#### Parameters

`components.parameters`

OpenAPI specifications **SHOULD** define reusable parameters here.

e.g.

```yaml
components:
  parameters:
    rid:
      name: rid
      in: path
      description: Unique id of the resource host/path/{resource}/{rid}
      required: true
      allowEmptyValue: false
      style: simple
      schema:
        type: string
```

#### Schemas

`components.schemas`

OpenAPI specifications **SHOULD** use schema references to define content.

API providers **MAY** use nested schema references where reusable schema elements are appropriate.

e.g.

```yaml
components:
  schemas:
    OperationOutcome: 
      description: "A collection of error, warning, or information messages that result from a system action."
      properties: 
        resourceType: 
          description: "This is a OperationOutcome resource"
          default: "OperationOutcome"
        id: 
          description: "The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes."
          $ref: "#/components/schemas/id"
        meta: 
          description: "The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource."
          $ref: "#/components/schemas/Meta"
        text: 
          description: "A human-readable narrative that contains a summary of the resource and can be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it clinically safe for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety."
          $ref: "#/components/schemas/Narrative"
        issue: 
          description: "An error, warning, or information message that results from a system action."
          items: 
            $ref: "#/components/schemas/OperationOutcome_Issue"
          type: "array"
      additionalProperties: false
      required: 
      - "issue"
      - "resourceType"
    id: 
      pattern: "^[A-Za-z0-9-.]{1,64}$"
      type: "string"
      description: "Any combination of letters, numerals, - and ., with a length limit of 64 characters.  (This might be an integer, an unprefixed OID, UUID or any other identifier pattern that meets these constraints.)  Ids are case-insensitive."
```

#### Examples
`components/examples`

OpenAPI specifications **SHOULD** define reusable examples here

```yaml
components:
  examples:
    OperationOutcomeNotFound:
        summary: An example OperationOutcome payload when the requested resource is not found.
        value: {
            "resourceType": "OperationOutcome",
            "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><h1>Operation Outcome</h1><table border=\"0\"><tr><td style=\"font-weight: bold;\">error</td><td>[]</td><td><pre>Resource Observation/aaabbbbcccc is not known</pre></td></tr></table></div>"
            },
            "issue": [
                {
                    "severity": "error",
                    "code": "not-found",
                    "diagnostics": "Resource Observation/aaabbbbcccc is not known"
                }
            ]
        }
```

The example above would be referenced as follows

```yaml
      responses:
        '200':
          description: the resource being returned after being updated
          headers:
            ETag:
              description: Version from Resource.meta.version as a weak ETag
              schema:
                type: string
          content:
            application/fhir+json:
              schema:
                $ref: '#/components/schemas/Observation'
        '404':
          description: Resource not found error, with details
          content:
            application/fhir+json:
              schema:
                $ref: "#/components/schemas/OperationOutcome"
              examples:
                notFound:
                  $ref: "#/components/examples/OperationOutcomeNotFound"
```

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
