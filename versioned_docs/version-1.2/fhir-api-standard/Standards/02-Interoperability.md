---
title: "Interoperability of NZ FHIR health implementations"
---

:::info
Interoperability here means that ability of two or more independently-developed health applications to exchange information successfully using FHIR APIs backed by a FHIR repository such as the Health NZ FHIR server.
:::

## Requirements

FHIR APIs **MUST** comply with all of the following in the interests of interchangeability of data among New Zealand health applications.

<ol>
<ApiStandard id="HNZAS_SHOULD_BASE_ON_FHIR_R4B" type="SHOULD" toolTip="FHIR APIs SHOULD be based on FHIR Release R4B." wrapper='li'>**SHOULD** be based on FHIR Release R4B</ApiStandard>
<ApiStandard id="HNZAS_MAY_BASE_ON_FHIR_R4" type="MAY" toolTip="FHIR APIs MAY be based on FHIR Release R4; however, plans SHOULD be in place to support FHIR Release 4B or newer." wrapper='li'>**MAY** be based on FHIR Release R4; however, plans **SHOULD** be in place to support FHIR Release 4B or newer</ApiStandard>
<ApiStandard id="HNZAS_MUST_PUBLISH_CAPABILITY_STATEMENT" type="MUST" toolTip="FHIR APIs MUST publish a CapabilityStatement resource at the {{API_URL}}/metadata endpoint." wrapper='li'>**MUST** publish a **CapabilityStatement** resource at the `{{API_URL}}/metadata` endpoint</ApiStandard>
<ApiStandard id="HNZAS_MUST_PUBLISH_IMPLEMENTATION_GUIDE" type="MUST" toolTip="FHIR APIs MUST publish an Implementation Guide at a recognised site/registry." wrapper='li'>**MUST** publish an **Implementation Guide** at a recognised site/registry</ApiStandard>
<ApiStandard id="HNZAS_MUST_SUPPORT_JSON" type="MUST" toolTip="FHIR APIs MUST support JSON, at minimum, for resource representations." wrapper='li'>**MUST** support **JSON**, at minimum, for resource representations</ApiStandard>
<ApiStandard id="HNZAS_MUST_REFERENCE_PUBLISHED_TERMINOLOGY" type="MUST" toolTip="FHIR APIs MUST correctly reference published terminology which is appropriate for the application." wrapper='li'>**MUST** correctly reference **published terminology** which is appropriate for the application</ApiStandard>
<ApiStandard id="HNZAS_MUST_PUBLISH_VALUESET_CODESYSTEM" type="MUST" toolTip="FHIR APIs MUST publish ValueSet and CodeSystem (if applicable) definitions, preferably at a recognised terminology service, or in the Implementation Guide." wrapper='li'>**MUST** publish `ValueSet` and `CodeSystem` (if applicable) definitions, preferably at a recognised terminology service, or in the Implementation Guide</ApiStandard>
</ol>
