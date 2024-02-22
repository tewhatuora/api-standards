---
title: "API Deliverables"
---



## FHIR APIs **MUST** deliver the following items

| Check | Required API Item             |  Published form              | Description                                                                                                                                    |
| :---  | :---------------------------- |  :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
|   ▢   | Implementation Guide           |  FHIR IG                     | The Implementation Guide **SHOULD** contain all of the information developers need to consume your FHIR API.                                   |
|   ▢   | Capability Statement          |  FHIR IG                     | Declares the **FHIR resource types** (data types in the bounded context[^1]) and **FHIR Operations** (functions) the FHIR API supports.        |
|   ▢   | Resource Profiles             |  FHIR IG                     | Describes element requirements and constraints applied to FHIR resources to make suitable for the health solution domain.                      |
|   ▢   | Extension Definitions         |  FHIR IG                     | Defines optional or required extensions to resources for additional data capture suitable for the health solution domain.                      |
|   ▢   | Terminology                   |  FHIR IG                     | Declare any `CodeSystems` and `ValueSets` supplying terminology required for your FHIR API                                                    |
|   ▢   | Example Instances             |  FHIR IG                     | Demonstrates your API's request or response payloads which can be a quick way for developers to get started using your API                     |
|   ▢   | Interface Specification       |  OpenAPI 3.\*                | A machine-readable API specification document. See [FHIR Example](/api-specifications/example-agency-specification).                           |
|   ▢   | API Policies                  |  HealthNZ HIRA programme     | A set of policies that are applied to ALL APIs published in the Hira ecosystem.                                                                |
|   ▢   | Tests                         |  Dependent on implementation | A full set of unit, integration and functional tests for the API. These tests **MUST** be automated and a test report available.               |
|   ▢   | Service Level Agreement (SLA) |                          | Defines API availability, throughput/capacity and performance service levels API consumers can expect to obtain.                               |

[^1]: *bounded context*: a term from Domain Driven Design, defined [here by Martin Fowler](https://martinfowler.com/bliki/BoundedContext.html)

:::info
See [these Implementation Guides](/fhir-api-standard/Principles%20and%20Guidelines/ExistingIGs) for examples of required artifact content.
:::
