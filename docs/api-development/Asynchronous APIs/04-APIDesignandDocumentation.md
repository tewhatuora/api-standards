---
title: "Design and Documentation"
---

import birthEventAsyncAPI from 'raw-loader!../api-specifications/birthevent-asyncapi.yaml';

As previously mentioned in these Standards, the Open API Specification (OAS) is considered the documentation standard for typical REST APIs. This works well for HTTP REST APIs, however when documenting Asynchronous APIs it is common to require different protocols, which may or may not include HTTP. Due to the limitations of OAS in this area, [AsyncAPI](https://www.asyncapi.com) has been developed to extend OAS for Asynchronous APIs.

API Providers of an Asynchronous API **MUST** document the API using a combination of the below documentation standards and tooling.

- [AsyncAPI](#asyncapi) to document API flows, access and behaviours
- [CloudEvents](#cloudevents) to document the message format
- [JSON Schema](#json-schema) to document the custom data structure
- [Event Catalog/Registry](#event-catalogschema-registry) to provide a place for developers to explore APIs
- [FHIR Implementation Guides](#fhir-implementation-guides) to document the FHIR resources when using FHIR Subscriptions

## AsyncAPI

[AsyncAPI](https://www.asyncapi.com) is the preferred documentation standard for Asynchronous APIs published within the New Zealand Health Sector. Version 3 and above of the AsyncAPI specification **SHOULD** be used when using this standard.

An example AsyncAPI spec is displayed below, which demonstrates an Event-Carried State Message using a Pub/Sub pattern. It defines the event by extending the CloudEvents specification, which specifies the custom data contained in the `birthEventMessage` message.

<AsyncApiViewer id="birthEventAsyncAPI" schema={birthEventAsyncAPI} />

<br />

<details>
    <summary>Click to view source code for the above example AsyncAPI specification:</summary>
    <pre>
    <code>
    {birthEventAsyncAPI}
  </code>
  </pre>
</details>

## CloudEvents

[CloudEvents](https://cloudevents.io) is a specification for describing event data in a common way. It is best used **together** with [AsyncAPI](#asyncapi), as opposed to in place of. APIs published within the Health sector are **RECOMMENDED** to use the CloudEvents specification to document message structure when Asynchronous APIs are used for messaging purposes, unless they are using FHIR Messaging (see [FHIR Implementation Guides](#fhir-implementation-guides)). This allows a level of consistency in events to be achieved which allows 100s of events to be published with a lowered barrier to consumption.

Although JSON is a common data exchange format, the use of CloudEvents to define the JSON allows API Consumers and Publishers to design their systems based on an expected message schema, which accelerates the development of both systems due to working with known message attributes such as the `type`, `source` and  `subject`.

## JSON Schema

[JSON Schema](https://json-schema.org/) is the vocabulary that enabled exchange of JSON data in a consistent and documented manner.

The use of JSON Schema to document message data structures allows definition of the expected data and its constraints. There is a large ecosystem of tooling available to work with the JSON Schema specification which can enhance the developer experience for both API Providers and Consumers. For example, an API Provider can (and should) validate the message they are publishing validates against the JSON Schema for the event being published, which can be achieved easily using the tooling existing in the ecosystem.

An example JSON Schema for a Patient admission to hospital event:

```json
{
  "$id": "https://catalog.example.com/patientadmission-v1.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Patient admission data schema",
  "type": "object",
  "properties": {
    "patient": {
      "type": "object",
      "description": "The patient details",
      "properties": {
        "family": {
          "type": "string",
          "example": "Doe"
        },
        "given": {
          "type": "string",
          "example": "John"
        },
        "id": {
          "type": "string",
          "example": "NHI123"
        },
      }
    },
    "details": {
      "description": "The patient admission details",
      "type": "object",
      "properties": {
        "admissionDatetime": {
          "type": "string",
          "example": "2024-01-05T19:39:00Z"
        },
        "reason": {
          "type": "string",
          "example": "Trouble breathing while at home"
        },
        "facility": {
          "type": "string",
          "example": "citywgtn"
        }
      }
    }
  }
}
```

## Event Catalog/Schema registry

An event catalog is a tool to document event-driven architectures - this can include the event schemas, services and event history.
A schema registry is a location where API Provider teams can publish and maintain event schemas.

Both of these pieces of software may be offered by a message broker, however can be implemented regardless of the underlying messaging technology. Often, they will be accessible via an API so they can be used programmatically.

API Providers **MAY** choose to offer an event catalog or schema registry for their API.

## FHIR Implementation Guides

When FHIR Subscriptions are being used, API Providers **MUST** publish a FHIR Implementation guide to detail the Subscription implementation detail.

For more information on FHIR Implementation Guide standards, review [FHIR Implementation Guides.](../../fhir-api-standard/Standards/05-IGInformation.md)
