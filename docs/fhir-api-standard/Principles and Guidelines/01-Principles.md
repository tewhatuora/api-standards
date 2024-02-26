---
title: "FHIR API Design Principles"
---



:::info
**Contribute to this section**  
For information about how to contribute please see the [collaboration guidelines](/community/introduction).
:::

This section contains **RECOMMENDED** principles (this page) and guidelines (other pages) for all designers and implementers of Aotearoa New Zealand HL7 FHIR-based APIs.

### Design principles for HL7 FHIR APIs

We encourage all designers and developers to strive for these principles to create quality FHIR-based APIs.

| Principle for API design quality  | How designers and developers of FHIR-based APIs can apply        |
| :-----------------------------------------------------  | :----------------------------------------------------- |  
| **A published API must be documented for developers to understand, and as machine-readable definitions**  | Produce a FHIR IG that is helpful for developers, sufficiently-detailed and definitive where it's needed.   |
| **A published API must make it clear where its data representation departs from existing, accepted standards**   |  The designer/developer is expected to make good use of FHIR's Profile (StructureDefinition), Extension and Terminology mechanisms |
| **Do not introduce proprietary concepts in public APIs**   |  FHIR APIs **SHALL**  NOT introduce data representations for the sole for the benefit of parties integrating commercial / proprietary data, where such items would have no discernible benefit for **ALL** New Zealand health applications that could consume the API. |
| **Build on existing resources**   |  FHIR APIs **SHOULD**  exploit or beneficially extend existing data definition and other published work done in other FHIR Implementation Guides.  FHIR APIs **SHOULD**  NOT undermine or spoil existing work already published in other FHIR Implementation Guides. |
| **Focus on one domain of information management**   |  A FHIR API **SHOULD**  focus on supporting one bounded context[^1] or region of health information sharing/storage. |
| **Consider investment made to consume an API**  |  Designers/developers of a FHIR API **MUST** recognise that other parties invest substantial time and effort to develop a health application which consumes a FHIR API, and that those parties expect to depend on the continuing functioning of the API to operate their business activities and processes. |
| **Avoid breaking change**   |  Designers/developers of a FHIR API **MUST** recognise the substantial investment by parties to develop applications which consume that API, and can depend on its continuing availability to operate their business processes.   FHIR API designers/developers should strive to avoid disruption to existing health applications consuming prior versions of a published FHIR API by preferably avoiding all breaking changes[^2].  Where breaking change is unavoidable, the rules of the required [Public API Compatibility Standard](../Standards/CompatibilityRules) come into play. |
| **Start small.  Avoid exposing detail that will have to change**   |  Designers of new FHIR APIs **MUST** exercise moderation and resist publishing facets applications will come to depend upon, but in which further change is foreseeable and inevitable. |
| **Don't 'shoehorn' data to avoid proper FHIR mapping** | FHIR designers recognise it takes time, effort and experience to produce a well-considered FHIR mapping.  A designer should deploy FHIR resources and elements the way the community expects these to be used.  Designers must not evade good data design practices by doing things like encoding health data into text strings/annotations or forcing it into resource metadata or contained instances. |

---

[^1]: *Bounded Context*: a term from Domain Driven Design, defined [here by Martin Fowler](https://martinfowler.com/bliki/BoundedContext.html)
[^2]: *Breaking change*: anything that causes existing applications using the API to break.  This [definition of breaking change](https://docs.github.com/en/rest/overview/breaking-changes?apiVersion=2022-11-28#about-breaking-changes-in-the-rest-api) by GitHub is useful (concepts apply generally to any published API.)
