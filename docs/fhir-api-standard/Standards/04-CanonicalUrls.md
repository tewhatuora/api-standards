---
title: "Canonical URLs"
---

:::info
A 'canonical resource' in FHIR is used for definitional or knowledge resources which define things such as terminology, profiles, libraries, and rules. 

All of the [FHIR CanonicalResources](https://hl7.org/fhir/canonicalresource.html#bnr) have a *canonical* URL, also listed in FHIR Implementation Guides as *official URL*s, which should be able to be relied upon to **permanently identify a resource across all contexts of use**.
:::

<ApiStandard id="HNZAS_MUST_USE_CANONICAL_URLS_FOR_RESOURCE_REFERENCES" type="MUST" toolTip="FHIR APIs MUST use canonical URLs to reference canonical resource instances. See Canonical Resource Identity in the FHIR documentation for further information.">FHIR APIs **MUST** use canonical URLs to reference canonical resource instances. See [Canonical Resource Identity](https://hl7.org/fhir/R4B/resource.html#canonical) in the FHIR documentation for further information.</ApiStandard>

Two practical examples where use of a canonical URL is required:

1. When a FHIR API consumer is creating a `QuestionnaireResponse` resource instance and needs to identify the `Questionnaire` which defines the standard questions answered by that response.
2. When a FHIR API designer needs to identify a `ValueSet` resource which specifies codes (aka 'terminology') valid for use in some particular situation.

### Requirements for FHIR APIs

<ol>
<ApiStandard id="HNZAS_MUST_DEFINE_AND_USE_CANONICAL_URLS" type="MUST" toolTip="FHIR API designers MUST define and use recognised canonical URLs in new definitions (profiles and extensions) and terminology (CodeSystems and ValueSets)." wrapper='li'>FHIR API designers **MUST** define and use *canonical URL*s that follow the Canonical URL Naming pattern in new canonical resources (e.g. profiles, extensions,) and terminology (`CodeSystem`s and `ValueSet`s)</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_USE_STANDARDS_DIGITAL_HEALTH_NZ_BASE" type="SHOULD" toolTip="Canonical URLs SHOULD use an fhir-ig.digital.health.nz base for canonical resources defined within an IG hosted at fhir-ig.digital.health.nz." wrapper='li'>Canonical URLs **SHOULD** use a `fhir-ig.digital.health.nz` base for canonical resources defined within a IG hosted at `fhir-ig.digital.health.nz`</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_FOLLOW_CANONICAL_NAMING_PATTERN" type="SHOULD" toolTip="Canonical URLs SHOULD should follow the canonical URL naming pattern when they're defined in an implementation guide hosted using the https://fhir-ig.digital.health.nz URL." wrapper='li'>Canonical URLs **SHOULD** follow the canonical URL naming pattern when they're defined in an implementation guide hosted using the `fhir-ig.digital.health.nz` URL</ApiStandard>
</ol>

#### Canonical URL naming pattern for IG artefacts hosted at https://fhir-ig.digital.health.nz/

Where a canonical resource is created in an implementation guide hosted and published using the Health New Zealand IG publishing infrastructure, the following canonical url pattern should be used (commonly used resource types are listed below, but other canonical resource types should also follow the same pattern):  

| Artifact type | Url naming pattern to use |  
| :---------------- | :--------------------------------------------------------------------------------------- |  
| `Extension` (StructureDefinition) | `https://fhir-ig.digital.health.nz/{{IgName}}/StructureDefinition/{{ExtensionName}}` |
| `Profile` (StructureDefinition) | `https://fhir-ig.digital.health.nz/{{IgName}}/StructureDefinition/{{ProfileName}}` |
| `Questionnaire` | `https://fhir-ig.digital.health.nz/{{IgName}}/Questionnaire/{{QuestionnaireName}}` |
| `CodeSystem` | `https://fhir-ig.digital.health.nz/{{IgName}}/CodeSystem/{{CodeSystemName}}` |
| `ConceptMap` | `https://fhir-ig.digital.health.nz/{{IgName}}/ConceptMap/{{ConceptMapName}}` |
| `ValueSet` | `https://fhir-ig.digital.health.nz/{{IgName}}/ValueSet/{{ValueSetName}}` |

When defined as part of an an implementation guide hosted using the Health NZ IG publishing infrastructure, the canonical URL will resolve to the artefact in question. 

#### Canonical URLs for IG artefacts **NOT** hosted at https://fhir-ig.digital.health.nz/

When not using the Health NZ IG publishing infrastructure, the `standards.digital.health.nz` or `nzhts.digital.health.nz` URLs can be used for defining canonical URLs. 

| Artifact type | Url naming pattern to use |  
| :---------------- | :--------------------------------------------------------------------------------------- |  
| `Extension` (StructureDefinition) | `https://standards.digital.health.nz/fhir/StructureDefinition/{{ExtensionName}}` |
| `Profile` (StructureDefinition) | `https://standards.digital.health.nz/fhir/StructureDefinition/{{ProfileName}}` |
| `CodeSystem` | `https://standards.digital.health.nz/ns/{{CodeSystemName}}-code` |
| `ValueSet` | `https://nzhts.digital.health.nz/fhir/ValueSet/{{ValueSetName}}` |
