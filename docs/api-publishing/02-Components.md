---
title: Publishing Components
---

## API Specification

An API specification acts like a blueprint for an API, outlining how it functions and how applications can interact with it. It is a document or collection of documents that provides both technical details and user-friendly explanations for developers who want to integrate with the API.

An API specification is also a key document for API Producers as it **sSHOULD** be used as a design, implementation and testing artifact.

### OpenAPI Specification Structure

| Component | Description | Requirement |
|:---|:---|:---|
| OpenAPI specification | The core specification | All mandatory fields defined in the specification itself |
| Property descriptions | A human readable description of a property defined in an OpenAPI specification. Descriptions should be relatively verbose and provide enough information to enable the reader to understand the purpose of the property being described. | Specification authors **MUST** provide descriptions for all properties |

#### Property Descriptions

Open API property descriptions are intended to be used by API consumer developers to understand the purpose of a specification property. Description fields support [CommonMark Syntax](https://spec.commonmark.org/) which **SHOULD** be used as it enables formatting supported by most rich text OpenAPI tooling.

example





## Documentation

Whilst an API specification goes a long way to provide documentation for an API there is usually contextual information that supports different consumer groups who wish to build experiences that utilise the API.

### Business Context

### Use Case Diagrams

API providers **MUST** capture use case diagrams that describe an API consumer journey when interacting with the published API.

The API provider can choose the format that these diagrams are created with however they **SHOULD** be available via a web experience.

### Developer Documentation

API providers **MUST** publish developer documentation that explains the technical constructs of their API.

The documentation **SHOULD** be available via a web experience.

## Terms and Conditions

API providers **MUST** have a set of terms and conditions that articulate the rules that API consumers must agree to when using the API.

Terms and conditions **SHOULD** be available via a web experience.

## Developer Onboarding

API consumer application developers 

API providers **MUST** provide a developer onboarding function that enables API consumer developers to create and manage their client application credentials and request application level access to API provider APIs.

API providers **SHOULD** make this functionality available via an authenticated web experience

## Service Level Agreements (SLA)

API providers **MUST** publish service level agreements that define commitments to service by the API provider as well as service expectations for API consumers.

SLAs **SHOULD** be available via a web experience.

