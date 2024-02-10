---
title: "Versioning"
---

:::warning[Status]
Content is draft and in review – this content may change until review is complete and formally published.
:::

:::info
FHIR distinguishes [three different types of versioning](https://build.fhir.org/resource.html#versions) summarised here as follows.

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
1. Any **Resource Profile**, and
1. Any published **definitional resource** instances (for examples of FHIR `Questionnaire`, `PlanDefinition`, `ActivityDefinition` and `ValueSet`).

:::info
A definitional resource is any instance representation that the API designer/implement intends to be commonly available for used by all consumers of the FHIR API.  These are also known as 'canonical' or well-known instances.

Not all base resource types can officially form definitions in FHIR.  For example `Questionnaire`, `PlanDefinition`, `ActivityDefinition` and `ValueSet` resource types do support definition, but `Encounter` and `Condition` do not.
:::

### Managing versions of specific FHIR IG artefacts

By default, the ig-template-base template, on which almost all FHIR IG templates are based, sets the business version of a profile or definitional resource to the version of the *Implementation Guide* it appears in.

However, the API designer may wish to clearly signal specific artefacts have actually been updated whereas others have not. To do this the IG **SHOULD** set a specific business version in each API artefact and use FHIR semantic versioning to signal to consumers when an artefact undergoes a significant update.

:::info
**Implementation note**: IGs built from FHIR shorthand (FSH) by the FHIR IG Publisher will need two parameters set in `sushi-config.yaml` to get artefact-specific versioning in the IG:

```yaml
# The parameters property represents IG.definition.parameter
# ref https://confluence.hl7.org/display/FHIR/Implementation+Guide+Parameters
#
parameters:
  apply-version: false        # Stops publisher from overwriting artefact-specific versions
  default-version: true       # Lets canonical artefacts specify their own business versions
  ...
```

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

  * questionnaire = Canonical(FollowUpQuestionnaire|2.0)
  
  // ...
```

---

## Versioned FHIR searching

### Resource retrieval by business version

As described in [FHIR searching](https://build.fhir.org/search.html#versions) FHIR APIs **SHOULD** let consumers retrieve a specific business version of a resource using the following query syntax:

```http
http://example.org/fhir/questionnaire/patient-intake|1.0
```

### Canonical resource retrieval below business version

As described in [FHIR searching](https://build.fhir.org/search.html#versions) FHIR APIs **SHOULD** be able to process queries for canonical resources using the *below:* syntax to obtain all resources at or below the specified business version.

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

## Versioned FHIR reads

### Resource retrieval by record version

As described in [FHIR RESTFul API](https://build.fhir.org/http.html#vread), FHIR APIs **SHOULD** let consumers retrieve a specific record version of a resource using the vread operation:

```http
GET [base]/Patient/012ee654-07e5-422e-ad21-3aa563642c04/_history/3
```

---
