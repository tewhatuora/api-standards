---
title: Publishing Components
---

## API Specification

An API specification acts like a blueprint for an API, outlining how it functions and how applications can interact with it. It is a document or collection of documents that provides both technical details and user-friendly explanations for developers who want to integrate with the API.

An API specification is also a key document for API Producers as it **sSHOULD** be used as a design, implementation and testing artifact.

| Specification | Description | Requirement |
|:---|:---|:---|
| Open API 3.* | A machine readable API specification document that describes the API at a technical level. See [Example](../../api-specifications/example-agency-specification). | **MUST** for REST and FHIR APIs |
| FHIR Profile | A document that describes a specific representation of a FHIR resource. For example a COVID-19 CarePlan and a Rheumatic Fever CarePlan both use the same FHIR resource (CarePlan) however their *representation* is different, each would have it's own FHIR *profile* | **MUST** for all FHIR APIs |
