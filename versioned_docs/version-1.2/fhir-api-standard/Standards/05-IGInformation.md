---
title: "Implementation Guide (IG) Readability"
---



## Requirements

<ApiStandard id="HNZAS_MUST_INCLUDE_DOCUMENTATION_IN_FHIR_IG" type="MUST" toolTip="A FHIR implementation guide MUST include documentation that helps people understand the API.">A FHIR implementation guide **MUST** include documentation that helps people understand the API.</ApiStandard>

---

An Implementation Guide **SHOULD** have the following:

### Home page

<ApiStandard id="HNZAS_SHOULD_HAVE_HOME_PAGE_IN_FHIR_IG" type="SHOULD" toolTip="A FHIR IG should have a home page with a clear high level description of the implementation." wrapper='span'>A clear high level description of the implementation</ApiStandard>, including:

- The name of the system
- Who created it
- What it’s for
- Who is expected to use it
- What data is involved at a high level
- What FHIR resources are used (unless this is a large list e.g. the IPS, then this detail should be left to another page)
- A description of the tabs/other pages available in the IG
- Contact details for responsible parties

### Health information context

<ApiStandard id="HNZAS_SHOULD_PROVIDE_HEALTH_INFORMATION_CONTEXT_IN_FHIR_IG" type="SHOULD" toolTip="A FHIR IG SHOULD provide health information context." wrapper='span'>A FHIR IG **SHOULD** provide Health Information Context:</ApiStandard> This describes the 'business' view for an IG and should contain content that describes the set of informational concerns or problems that the implementation is trying to address. It should include the relevant history, context, and description of the problem domain and solution.

### Use cases

<ApiStandard id="HNZAS_SHOULD_DEMONSTRATE_USE_CASES_IN_FHIR_IG" type="SHOULD" toolTip="A FHIR IG SHOULD demonstrate use cases." wrapper='span'>A FHIR IG **SHOULD** demonstrate Use Cases:</ApiStandard> In this context use cases means user and system interactions that surround or motivate **integration** between a health application and the FHIR API. At minimum integration use cases can simply be described, or may be illustrated using UML sequence diagrams where orchestration involves multiple health systems and the FHIR API.

### Onboarding

<ApiStandard id="HNZAS_SHOULD_DOCUMENT_ONBOARDING_IN_FHIR_IG" type="SHOULD" toolTip="A FHIR IG should document onboarding processes." wrapper='span'>This section describes how consumers of the implementation can gain access to the API, and should include at least the following:</ApiStandard>

- Who is eligible
- What is the process for onboarding
- How to start that process
- Links to required information or services involved in the process
- Any compliance or conformance testing required for service consumers
- Contact information

### Profiles

<ApiStandard id="HNZAS_SHOULD_DOCUMENT_PROFILES_IN_FHIR_IG" type="SHOULD" toolTip="A FHIR IG should contain all resource profiles used by the API." wrapper='span'>Your profile page **SHOULD** contain a comprehensive description of the resource and how it is used in this implementation.</ApiStandard> This should include a high-level description of the information it contains and the boundaries (what it might not contain) and its relationship to other resources in the implementation (where there are references or otherwise).

### Must Support

<ApiStandard id="HNZAS_SHOULD_DOCUMENT_MUST_SUPPORT_IN_FHIR_IG" type="SHOULD" toolTip="Where a FHIR API has profiled 'Must Support' fields, the IG SHOULD have a visible page describing what it means to support the element or resource type in this solution domain." wrapper='span'>Where your API has profiled 'Must Support' fields, you **SHOULD** have a visible page (ideally in the top level of the menu) describing what it means to "support" the element or resource type in this solution domain.</ApiStandard> Any instances of the following requirements **MUST** be made clear in this section:

- The system must be able to store and retrieve the element.
- The system must display the element to the user for clinical safety reasons.
- The system must allow submission of the element in an update or resource create to meet business or regulatory requirements.
- The element must be taken into account when performing clinical decision support, calculations or other processing.

### Extensions

<ApiStandard id="HNZAS_SHOULD_LIST_EXTENSIONS_IN_FHIR_IG" type="SHOULD" toolTip="A FHIR IG SHOULD contain a list of extensions introduced by this implementation." wrapper='span'>A list of *Extensions* introduced by this implementation, with clear description of any **modifier extensions** (which by definition can change the meaning of the element they extend).</ApiStandard>

### Identifiers

<ApiStandard id="HNZAS_SHOULD_LIST_IDENTIFIERS_IN_FHIR_IG" type="SHOULD" toolTip="A FHIR IG SHOULD list important identifiers used by the API." wrapper='span'>A list of important identifiers used in the IG, with the NamingSystem resources that define them (where applicable).</ApiStandard>
