---
title: "Canonical URLs"
---



:::info
'Canonical' here means well-known (among consumers of a FHIR API).

Many FHIR resource types define a *canonical* URL, also known in FHIR Implementation Guides as *official URL*s, which API consumers can rely on to **permanently identify a resource across all contexts of use**.
:::

<ApiStandard id="HNZAS_MUST_USE_CANONICAL_URLS_FOR_RESOURCE_REFERENCES" type="MUST" toolTip="FHIR APIs MUST use canonical URLs to reference recognised resource instances. See Canonical Resource Identity in the FHIR documentation for further information.">FHIR APIs **MUST** use canonical URLs to reference recognised resource instances. See [Canonical Resource Identity](https://hl7.org/fhir/R4B/resource.html#canonical) in the FHIR documentation for further information.</ApiStandard>

Two practical examples where use of a canonical URL is crucial:

1. When a FHIR API consumer is creating a `QuestionnaireResponse` resource instance and needs to identify the `Questionnaire` which defines the standard questions answered by that response.
2. When a FHIR API designer needs to identify a `ValueSet` resource which specifies codes (aka 'terminology') valid for use in some particular situation.

### Requirements for FHIR APIs

<ol>
<ApiStandard id="HNZAS_MUST_DEFINE_AND_USE_CANONICAL_URLS" type="MUST" toolTip="FHIR API designers MUST define and use recognised canonical URLs in new definitions (profiles and extensions) and terminology (CodeSystems and ValueSets)." wrapper='li'>FHIR API designers **MUST** define and use recognised *canonical URL*s in new definitions (profiles and extensions) and terminology (`CodeSystem`s and `ValueSet`s)</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_USE_STANDARDS_DIGITAL_HEALTH_NZ_BASE" type="SHOULD" toolTip="Canonical URLs SHOULD use a standards.digital.health.nz base." wrapper='li'>Canonical URLs **SHOULD** use a `standards.digital.health.nz` base</ApiStandard>
</ol>

#### Canonical URL naming pattern

| IG artifact type | Official Url naming pattern to use |  
| :---------------- | :--------------------------------------------------------------------------------------- |  
| `Extension` (StructureDefinition) | `http://standards.digital.health.nz/fhir/StructureDefinition/{{extensionName}}` |
| `CodeSystem` | `http://standards.digital.health.nz/ns/{{CodeSystemName}}` |
| `ValueSet` | `http://nzhts.digital.health.nz/fhir/ValueSet/{{ValueSetName}}` |
