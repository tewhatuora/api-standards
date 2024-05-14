---
title: Business Context
---

The business context section of an API's documentation details the business outcomes which are achieved through use of the API, the value proposition offered, and higher level context for the developer or integrating parties. It can include historic information about the API which may be useful to consumers. This page will usually link forward to [Use Cases](./use-cases).

### Example

The below is an example of Business Context provided alongside a Shared Care FHIR API.

<blockquote>
This project prototyped and then established the FHIR server to serve as a repository for CarePlan and related resources originating in COVID case management.

The repository stores information for COVID patients needing a planned tailored regime of care.  The information is modelled in FHIR 4.0.1, the main resource types being CarePlan, Encounter, Condition, QuestionnaireResponse and Consent.

CarePlans are authored by practitioners, starting from a standard HNZ base PlanDefinition then tailoring to the specific needs of the patient and the case.

Once stored at the FHIR repository, the CarePlan can then be accessed by other members of the care team as needed, via any system/application client that is authorised to consume the FHIR API.

The initial origin of the FHIR data is HNZ’s CCCM system in which Covid Case management is done.

<img src="/img/content/sharedCarePlan.png" width="100%"/>

</ blockquote>
