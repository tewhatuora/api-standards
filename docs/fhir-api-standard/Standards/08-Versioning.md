---
title: "Versioning"
---

:::tip[Status]
Ready for review
:::

:::info
FHIR distinguishes [three different types of versioning](https://build.fhir.org/resource.html#versions) summarized here as follows.

| Version kind | Version describes..                      | How represented in the FHIR resource..  |
| :----------- | :--------------------------------------- | :-------------------------------------- |
| *Record*     | Each time the resource changes (usually managed by a server) | In the resource's metadata `meta.versionId` |
| *Business*   | Each time the content in the resource changes (controlled by an author or business policy) | In the resource's `version` element (only in certain resource types)  |
| *FHIR*       | The version of FHIR the resource is based on eg. `R4B` | Appears in the Implementation Guide (IG) |

In this standard we aim to avoid ambiguous use of term *FHIR resource* meaning either a *type* or an *instance* of something.
:::

## Business versioning in resource profiles and definitions

In all parts of an API where FHIR supports it:

1. API items **MUST** define **business version**, and
1. API items **SHOULD** assign a `"date"` element reflecting the date of last update.

These requirements apply to all of the following parts of a FHIR API:

1. The **Implementation Guide** for the API, and
1. Any **Resource Profile** (Note: Profiles generally take the version number of the *Implementation Guide* they appear in.), and
1. Any published **definitional resource** instances (for examples of FHIR `Questionnaire`, `PlanDefinition`, `ActivityDefinition` and `ValueSet`).

:::info
A definitional resource is any instance representation that the API designer/implement intends to be commonly available for used by all consumers of the FHIR API.  These are also known as 'canonical' or well-known instances.

Not all base resource types can officially form definitions in FHIR.  For example `Questionnaire`, `PlanDefinition`, `ActivityDefinition` and `ValueSet` resource types do support definition, but `Encounter` and `Condition` do not.
:::

### Publishing of FHIR examples and instances which do not support business version

Where a FHIR API specification declares well-known or canonical resource instances of types which do not support **business version** (that is, no `"date"` element) API consumers **SHALL** take the business version to be the **version of the IG** in which those instances are defined.

---

## Versioning of canonical references

References to definitional resource types **SHOULD** express the **business version** of the target using FHIR [versioned Canonical Urls](https://build.fhir.org/references.html#canonical).

### Example

A QuestionnaireResponse containing answers to version 2.0 of a *Follow-Up* `Questionnaire` definition (JSON):

```json
  {
    "resourceType": "QuestionnaireResponse",
    "questionnaire": "https:/example.org/ig/Questionnaire/FollowUpQuestionnaire|2.0",
    ...
  }
```

Or in FHIR shorthand:

```fsh
  Instance: FollowUpExample1
  InstanceOf: FollowUpQuestionnaire
  Usage: #definition

  * questionnaire = CanonicalFollowUpQuestionnaire|2.0)
  
  // ...
```

---

## Versioned FHIR searching

### Resource retrieval by version

As described in [FHIR searching](https://build.fhir.org/search.html#versions) FHIR APIs **SHOULD** let consumers retrieve a specific version of a resource using the following syntax:

```http
http://example.org/fhir/questionnaire/patient-intake|1.0
```

### Canonical resource retrieval below version

As described in [FHIR searching](https://build.fhir.org/search.html#versions) FHIR APIs **SHOULD** be able to process versioned queries for canonical resources using the *below:* syntax to obtain all resources at or below the specified version.

For example, API consumers that issue a query for resources like

```http
GET [base]/QuestionnaireResponse?questionnaire:below=http://example.org/fhir/questionnaire/SomeYeahNahQuestions|2
```

**SHOULD** expect to get back all QuestionnaireResponse instances for Questionnaire versions at or below version 2, for example:

```http
  http://example.org/fhir/questionnaire/SomeYeahNahQuestions|2
  http://example.org/fhir/questionnaire/SomeYeahNahQuestions|1.2
  http://example.org/fhir/questionnaire/SomeYeahNahQuestions|1.1
```

---
