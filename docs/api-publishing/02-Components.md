---
title: Publishing Components
---

## API Specification

An API specification acts like a blueprint for an API, outlining how it functions and how applications can interact with it. It is a document or collection of documents that provides both technical details and user-friendly explanations for API Consumer developers who want to integrate with the API.

An API specification is also a key document for API Producers as it can be used as a design, implementation and testing artifact. Given the importance of this document, API Producers **MUST** follow a [Specification-Driven Development Approach](https://apistandards.digital.health.nz/api-development/Synchronous%20APIs/API%20Design#design-driven-development)

See [OpenAPI Specification](./OAS)

## API Documentation

Whilst an API specification goes a long way to provide documentation for an API there is usually contextual information that supports different consumer groups who wish to build experiences that utilise the API.

### Business Context

API Providers **MUST** capture the business context of the published API. The business context of the API helps API Consumers understand how the API fits into the overall business processes and use cases. This information is essential for API Consumers to utilise the API effectively and integrate it with their applications.

Business Context **SHOULD** be available via a web experience.

See [Business Context](./07-BusinessContext.md)

### Use Case Diagrams

API Providers **MUST** capture use case diagrams that describe an API Consumer journey when interacting with the published API.

The API Provider can choose the format that these diagrams are created with however they **SHOULD** be available via a web experience.

See [Use Case Diagrams](./06-UseCaseDiagrams.md)

### Developer Documentation

API Providers **MUST** publish developer documentation that explains the technical constructs of their API.

The documentation **SHOULD** be available via a web experience.


## Terms and Conditions

Terms and Conditions

API Providers **MUST** have a set of terms and conditions that articulate the rules that API Consumers must agree to when using the API.

Terms and conditions **SHOULD** be available via a web experience.


## Developer Onboarding

API consumer application developers 

API Providers **MUST** provide a developer onboarding function that enables API Consumer developers to create and manage their client application credentials and request application level access to API Provider APIs.

API Providers **SHOULD** make this functionality available via an authenticated web experience.

## Service Level Agreements (SLA)

API Providers **MUST** publish service level agreements that define commitments to service by the API Provider as well as service expectations for API Consumers.

SLAs **SHOULD** be available via a web experience.
