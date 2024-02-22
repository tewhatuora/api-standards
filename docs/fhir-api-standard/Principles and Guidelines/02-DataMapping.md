---
title: "Agree Data Mapping"
---

## Agree data mapping with business stakeholders before committing FHIR API design



### Recommendations

1. Designers of new FHIR APIs should expect to prepare a *Data Mapping*  that describes how data is translated between the health application "business" domain and FHIR-based data representations.  
1. Business Data Mappings should be made available for review with stakeholders in the API stakeholders, **before** the FHIR API Design is finalised.

### Rationale

Creating new FHIR representations of existing health information requires translation to and from the data models used in health applications to be FHIR-integrated.

This requires the API Designer to make nuanced decisions about:

- The scope of health information to be handled, sometimes referred to as the *bounded context*[^1]
- What information to actually represent in FHIR (some information can stay in the solution domain and doesn't need to be interchanged via FHIR),  
- Which FHIR resource types and elements to use,  
- When to use an existing element and whether to profile,  
- How to transform between an element in the solution domain and one (or more) elements involved on the FHIR side,  
- Whether to apply NZ existing concepts and terminology or introduce new terminology.

To organise these decisions and assure sufficient consideration of each aspect, the API Designer should expect to produce a **Data Mapping**.  This benefits all the stakeholders in the FHIR API because it helps keep track of all the data translation issues, any compromises considered and decisions taken.

### What goes into a good Data Mapping?

A good *FHIR API Data Mapping* usually focuses on one solution domain -- the primary health application(s) being integrated using FHIR.

It should include:

1. Definitions of all data items that *need* to be translated to/from FHIR.  Typically these items are tabulated, and it helps to categorise by information *subject* and *class* (aka type or entity).

1. For each item, define its data type and cardinality, both in the solution domain and the FHIR architecture.

1. Describe any mapping logic, default rules, grouping requirements, coding etc. needed to convert data between solution domain and FHIR representation.

1. Consider scenarios for how other FHIR applications update resources and allow suitable two-way transformation from FHIR back to the solution domain.

### Availability and format of Data Mapping

This standard expects that the API Designer will make available a Data Mapping for review by all key stakeholders in a new FHIR API, before the API design is finalised and integration work begins.

As Data Mappings benefit from involvement of stakeholders from the health application (clinical) domain as well as FHIR expertise and architects of integrated systems, experience shows that it is helpful to develop the Data Mapping using a collaborative tool that supports review comment/discussion and version control.  

The following tools are recommended for collaborative development of a DataMapping assuming that appropriate access can be arranged for all participants:

- Te Whatu Ora Confluence  
- Te Whatu Ora GitHub repository
- Te Whatu Ora Microsoft Sharepoint  

---

[^1]: *Bounded Context*: a term from Domain Driven Design, defined [here by Martin Fowler](https://martinfowler.com/bliki/BoundedContext.html)
