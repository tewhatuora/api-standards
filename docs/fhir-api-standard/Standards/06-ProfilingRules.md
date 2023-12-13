---
title: "Resource profiling"
---

## Rules for resource profiling

:::tip[Status]
Ready for review
:::

### Requirements

1. FHIR APIs **MUST** use FHIR resources and elements for their **HL7-intended purposes**,

1. FHIR APIs **MUST NOT** extend FHIR's primitive data types,

1. When a required terminology binding needs expanding, a FHIR API **SHOULD** [define an Extension](https://www.hl7.org/fhir/r4b/defining-extensions.html) for this purpose. (APIs **MUST NOT** use other mechanisms to extend terminology bindings).

1. FHIR APIs **MUST** use [Identifiers](https://mohits.atlassian.net/wiki/spaces/HIRA/pages/3523117763/FHIR+API+Standard#1.5.4.-----Extensions) that are [standard in New Zealand](https://standards.digital.health.nz/).  

:::warning
A FHIR API that uses any of the following tricks will be viewed as violating this standard.
:::

1. Defines new primitive data types,
1. Misuses FHIR resource references for linkage other than what HL7 intended,
1. Evades FHIR design work or payload schema validation by 'shoehorning' or encoding data in places where it cannot be validated nor recognised by API consumers.  This means not just schoolboy tricks like encoding data in `Annotation` or `text` elements but also more sneaky attempts to hide business data in `contained` instances or instance *metadata*,
1. Introduces resource profiles that *cross* several base FHIR resources (mongrel).
