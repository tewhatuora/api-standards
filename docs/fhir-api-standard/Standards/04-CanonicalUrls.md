---
title: "Canonical URLs"
---



:::info
The term 'canonical' in FHIR is used for knowledge or definitional resources which define things such as terminology, profiles, libraries, and rules. 

All of the [FHIR CanonicalResources](https://hl7.org/fhir/canonicalresource.html#bnr) have a *canonical* URL, also listed in FHIR Implementation Guides as *official URL*s, which API consumers can rely on to **permanently identify a resource across all contexts of use**.
:::

<ApiStandard id="HNZAS_MUST_USE_CANONICAL_URLS_FOR_RESOURCE_REFERENCES" type="MUST" toolTip="FHIR APIs MUST use canonical URLs to reference canonical resource instances. See Canonical Resource Identity in the FHIR documentation for further information.">FHIR APIs **MUST** use canonical URLs to reference canonical resource instances. See [Canonical Resource Identity](https://hl7.org/fhir/R4B/resource.html#canonical) in the FHIR documentation for further information.</ApiStandard>

Two practical examples where use of a canonical URL is crucial:

1. When a FHIR API consumer is creating a `QuestionnaireResponse` resource instance and needs to identify the `Questionnaire` which defines the standard questions answered by that response.
2. When a FHIR API designer needs to identify a `ValueSet` resource which specifies codes (aka 'terminology') valid for use in some particular situation.

Where Canonical URLs are defined under the https://implementation-guides.digital.health.nz URL as part of an implementation guide, the canonical URL will resolve to the artefact in question. 

### Requirements for FHIR APIs

<ol>
<ApiStandard id="HNZAS_MUST_DEFINE_AND_USE_CANONICAL_URLS" type="MUST" toolTip="FHIR API designers MUST define and use recognised canonical URLs in new definitions (profiles and extensions) and terminology (CodeSystems and ValueSets)." wrapper='li'>FHIR API designers **MUST** define and use *canonical URL*s that follow the Canonical URL Naming pattern in new canonical resources (e.g. profiles, extensions,) and terminology (`CodeSystem`s and `ValueSet`s)</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_USE_STANDARDS_DIGITAL_HEALTH_NZ_BASE" type="SHOULD" toolTip="Canonical URLs SHOULD use an implementation-guides.digital.health.nz base." wrapper='li'>Canonical URLs **SHOULD** use a `implementation-guides.digital.health.nz` base</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_FOLLOW_CANONICAL_NAMING_PATTERN" type="SHOULD" toolTip="Canonical URLs SHOULD should follow the canonical URL naming pattern when they're defined in an implementation guide hosted using the https://implementation-guides.digital.health.nz URL." wrapper='li'>Canonical URLs **SHOULD** follow the canonical URL naming pattern when they're defined in an implementation guide hosted using the `implementation-guides.digital.health.nz` URL</ApiStandard>
</ol>

#### Canonical URL naming pattern

| IG artifact type | Official Url naming pattern to use |  
| :---------------- | :--------------------------------------------------------------------------------------- |  
| `Extension` (StructureDefinition) | `https://implementation-guides.digital.health.nz/{{IgName}}/StructureDefinition/{{ExtensionName}}` |
| `Profile` (StructureDefinition) | `https://implementation-guides.digital.health.nz/{{IgName}}/StructureDefinition/{{ProfileName}}` |
| `Questionnaire` | `https://implementation-guides.digital.health.nz/{{IgName}}/Questionnaire/{{QuestionnaireName}}` |
| `CodeSystem` | `https://implementation-guides/{{IgName}}/CodeSystem/{{CodeSystemName}}` |
| `ConceptMap` | `https://implementation-guides.digital.health.nz/{{IgName}}/ConceptMap/{{ConceptMapName}}` |
| `ValueSet` | `https://nzhts.digital.health.nz/fhir/ValueSet/{{ValueSetName}}` |


