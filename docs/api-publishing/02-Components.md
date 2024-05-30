---
title: Publishing Components
---

## API Specification

An API specification acts like a blueprint for an API, outlining how it functions and how applications can interact with it. It is a document or collection of documents that provides both technical details and user-friendly explanations for API Consumer developers who want to integrate with the API.

An API specification is also a key document for API Producers as it can be used as a design, implementation and testing artifact. Given the importance of this document, API Producers **MUST** follow a [Specification-Driven Development Approach](https://apistandards.digital.health.nz/api-development/Synchronous%20APIs/API%20Design#design-driven-development)

See [OpenAPI Specification](./openapi-specifications)

## API Documentation

Whilst an API specification goes a long way to provide documentation for an API there is usually contextual information that supports different consumer groups who wish to build experiences that utilise the API.

### Business Context

API Providers **MUST** capture the business context of the published API. The business context of the API helps API Consumers understand how the API fits into the overall business processes and use cases. This information is essential for API Consumers to utilise the API effectively and integrate it with their applications.

Business Context **SHOULD** be available via a web experience.

See [Business Context](./07-BusinessContext.md)

### Diagrams

Meaningful diagrams are critical for describing the functionality of an API. As such, API Providers **MUST** provide diagrams that describe an API Consumer journey when interacting with the published API.

The API provider can choose the type of diagram that best represents their API however they **SHOULD** provide UML Sequence Diagrams. See [Diagrams](./Diagrams)

The API Provider can also choose the format that these diagrams are created with however they **SHOULD** be available via a web experience.

### Developer Documentation

API Providers **MUST** publish developer documentation that explains the technical constructs of their API such as instances where developers are required to ensure that API Consumers behave in a certain way when accessing the API.

For example, an API that supports field level encryption should clearly document both the mechanism and the result of applying this encryption.

It is also useful to provide code snippets for developers where complex API Consumer logic is required.

Developer documentation **SHOULD** be available via a web experience.

## Terms and Conditions

API Providers **MUST** have a set of terms and conditions that articulate the rules that API Consumers must agree to when using the API.

Terms and conditions **SHOULD** be available via a web experience.

## Developer Onboarding

API consumer application developers will expect to be able to follow a simple and well documented onboarding process.

API Providers **MUST** provide a developer onboarding function that enables API Consumer developers to create and manage their client application credentials and request application level access to API Provider APIs.

API Providers **SHOULD** make this functionality available via an authenticated web experience.

## Service Level Agreements (SLA)

API Providers **MUST** publish service level agreements that define commitments to service by the API Provider as well as service expectations for API Consumers.

What SLAs are published will vary depending on the implementation, however common SLAs include:

- API availability (i.e., uptime)
- Latency
- Request throughput (number of requests in a given timeframe)

API producer **MAY** provide _SLA Tiering_ in which different SLAs are applied to different clients. For example, a "gold" tier can be applied to a high-value consumer-facing application to grant higher request quotas and faster response times. Conserverly, a "bronze" tier could be applied to a non-critical back-office application consuming the same API.

SLAs **SHOULD** be available via a web experience.
