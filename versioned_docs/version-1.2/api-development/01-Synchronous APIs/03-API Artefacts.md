---
title: API Artefacts
---



> <ApiStandard id="HNZAS_MUST_TRACK_ARTEFACT_CHANGES" type="MUST" toolTip="All API artefacts MUST be maintained in a system capable of tracking changes.">All of the artefacts listed below **MUST** be maintained in a system that is able to support change tracking.</ApiStandard>

| API Artefact | Requirement Level | Format | Description |
| :---------------------------- | :---------------- | :-------------------------- | :-------------- |
| Interface Specification       | **MUST**          | OpenAPI 3.\*  | A machine readable API specification document that describes the API at a technical level. See [Example](../../api-specifications/example-agency-specification). |
| Published documentation | **MUST** |  | Human readable documentation that describes the technical aspects of the API, example use cases involving the API and any supporting business documentation for the API. This documentation **MUST** be published via an easily consumable mechanism, preferably http(web). |
| API Policies                  | **MUST**          |   | A set of policies that are applied to ALL APIs published in the Digital Services Hub or equivalent health sector capability. |
| Tests                         | **MUST**          | Dependant on implementation | A full set of unit, integration and functional tests for the API. These tests **MUST** be automated and a test report available. |
| Service Level Agreement (SLA) | **MUST**          |                         | An approved service level agreement defining minimum availability and performance service levels for the API that is accessible vie the Digital Services Hub or equivalent health sector capability. |
