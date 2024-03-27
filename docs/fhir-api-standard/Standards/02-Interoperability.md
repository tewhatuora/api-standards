---
title: "Interoperability of NZ FHIR health implementations"
---

:::info
Interoperability here means that ability of two or more independently-developed health applications to exchange information successfully using FHIR APIs backed by a FHIR repository such as the Health NZ FHIR server.
:::

## Requirements

FHIR APIs **MUST** comply with all of the following in the interests of interchangeability of data among New Zealand health applications.

1. **SHOULD** be based on FHIR Release R4B,
2. **MAY** be based on FHIR Release R4 however plans **SHOULD** be in place to support FHIR Release 4B or newer,
3. **MUST** publish a **CapabilityStatement** resource at the `{{API_URL}}/metadata` endpoint,  
4. **MUST** publish an **Implementation Guide** at a recognised site/registry,
5. **MUST** support **JSON**, at minimum, for resource representations,  
6. **MUST** correctly reference **published terminology** which is appropriate for the application,  
7. **MUST**  publish `ValueSet` and `CodeSystem` (if applicable) definitions, preferably at a recognised terminology service, or in the Implementation Guide.
