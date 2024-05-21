---
title: "API Deliverables"
---



## FHIR APIs **MUST** deliver the following items

| Required API Item             |  Published form              | Description                                                                                                                                    |
| :---------------------------- |  :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Implementation Guide           |  FHIR IG                     | <ApiStandard id="HNZAS_MUST_PROVIDE_IMPLEMENTATION_GUIDE_FOR_FHIR" type="MUST" toolTip="The Implementation Guide MUST be provided and SHOULD contain all of the information developers need to consume your FHIR API." wrapper='span'>The Implementation Guide **SHOULD** contain all of the information developers need to consume your FHIR API.</ApiStandard>                                   |
| Capability Statement          |  FHIR IG                     | <ApiStandard id="HNZAS_MUST_PROVIDE_CAPABILITY_STATEMENT_FOR_FHIR" type="MUST" toolTip="FHIR APIs MUST provide a capability statement which declares the FHIR resource types and FHIR Operations the API supports." wrapper='span'>Declares the **FHIR resource types** (data types in the bounded context[^1]) and **FHIR Operations** (functions) the FHIR API supports.</ApiStandard>        |
| Resource Profiles             |  FHIR IG                     | <ApiStandard id="HNZAS_MUST_PROVIDE_RESOURCE_PROFILES_FOR_FHIR" type="MUST" toolTip="FHIR APIs MUST provide resource profiles which describe element requirements and constraints applied to FHIR resources." wrapper='span'>Describes element requirements and constraints applied to FHIR resources to make suitable for the health solution domain.</ApiStandard>                      |
| Extension Definitions         |  FHIR IG                     | <ApiStandard id="HNZAS_MUST_DEFINE_EXTENSIONS_FOR_FHIR" type="MUST" toolTip="FHIR APIs MUST define optional or required extensions to resources for additional data capture." wrapper='span'>Defines optional or required extensions to resources for additional data capture suitable for the health solution domain.</ApiStandard>                      |
| Terminology                   |  FHIR IG                     | <ApiStandard id="HNZAS_MUST_DECLARE_CODE_SYSTEMS_FOR_FHIR" type="MUST" toolTip="FHIR APIs MUST declare any CodeSystems and ValueSets supplying terminology required." wrapper='span'>Declare any `CodeSystems` and `ValueSets` supplying terminology required for your FHIR API.</ApiStandard>                                                    |
| Example Instances             |  FHIR IG                     | <ApiStandard id="HNZAS_MUST_PROVIDE_EXAMPLES_FOR_FHIR" type="MUST" toolTip="FHIR APIs MUST provide examples which demonstrate your API's request or response payloads." wrapper='span'>Demonstrates your API's request or response payloads which can be a quick way for developers to get started using your API.</ApiStandard>                     |
| Interface Specification       |  OpenAPI 3.\*                | <ApiStandard id="HNZAS_MUST_PROVIDE_MACHINE_READABLE_SPECIFICATION_FOR_FHIR" type="MUST" toolTip="FHIR APIs MUST provide a machine-readable API specification document." wrapper='span'>A machine-readable API specification document. See [FHIR Example](../../api-specifications/example-agency-specification).</ApiStandard>                           |
| API Policies                  |  HealthNZ HIRA programme     | <ApiStandard id="HNZAS_MUST_APPLY_API_POLICIES_FOR_FHIR" type="MUST" toolTip="FHIR APIs MUST provide a set of API policies." wrapper='span'>A set of policies that are applied to ALL APIs published in the Hira ecosystem.</ApiStandard>                                                                |
| Tests                         |  Dependent on implementation | <ApiStandard id="HNZAS_MUST_HAVE_AUTOMATED_TESTS_FOR_FHIR" type="MUST" toolTip="FHIR APIs MUST provide a full set of unit, integration, and functional tests for the API. These tests MUST be automated and a test report available." wrapper='span'>A full set of unit, integration and functional tests for the API. These tests **MUST** be automated and a test report available.</ApiStandard>               |
| Service Level Agreement (SLA) |                          | <ApiStandard id="HNZAS_MUST_DEFINE_SLA_FOR_FHIR" type="MUST" toolTip="FHIR APIs MUST provide an SLA which defines API availability, throughput/capacity and performance service levels API consumers can expect to obtain." wrapper='span'>Defines API availability, throughput/capacity and performance service levels API consumers can expect to obtain.</ApiStandard>                               |

[^1]: *bounded context*: a term from Domain Driven Design, defined [here by Martin Fowler](https://martinfowler.com/bliki/BoundedContext.html)

:::info
See [these Implementation Guides](/fhir-api-standard/Principles%20and%20Guidelines/ExistingIGs) for examples of required artifact content.
:::
