---
title: FHIR Implementation Guides
slug: implementation-guides
---

FHIR Implementation Guides (IGs) are the mechanism that FHIR API Developers and Designers use to explain how to use the FHIR specification to achieve interoperability in a particular space. They use a variety of FHIR resources to express that guidance in a machine readable format and then allow those artifacts to be converted into a rendered web site for easy understanding by API Consumers, Application Developers and others.

The Implementation Guide serves two primary purposes:

- provides a set of human readable business content and representations of FHIR resource profiles
- provides a [FHIR Implementation Guide NPM package](https://hl7.org/fhir/packages.html) which contains machine readable portions of the IG (e.g. `StructureDefinition` resources), along with several other different collateral files that may be useful for implementers using the IG (both the API Provider and Consumers)

<ApiStandard id="HNZAS_MUST_PROVIDE_FHIR_IG" type="MUST" toolTip="API Producers of FHIR APIs MUST provide a FHIR IG.">When publishing a FHIR API, an associated Implementation Guide **MUST** be published as an unauthenticated web experience and FHIR NPM Package.</ApiStandard>

## Implementation Guide Website

## Layout and content

The guidance for this section consolidates recommendations for creating IGs that are easy to understand by readers, are consistent with other IGs, and are intended to reduce implementation costs for the sector as a whole. This particular guidance is concerning the readability of the IG by humans.

### Pages and content organisation

The website:

<ApiStandard id="HNZAS_MUST_IG_INDEX" type="MUST" toolTip="A FHIR IG MUST contain an index page." wrapper="li">**MUST** contain an index page, `/index.html` which defines the homepage for the IG, which is accessible from the website navigation menu, labelled `Home`. This page should always start with an explanation of the purpose of the IG</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_TOC" type="MUST" toolTip="A FHIR IG MUST contain a TOC page." wrapper="li">**MUST** contain a table of contents page, `/toc.html` which lists all of the pages contained within the IG, which is accessible from the website navigation menu, labelled `Table of Contents`</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_ARTIFACTS" type="MUST" toolTip="A FHIR IG MUST contain an artifacts page." wrapper="li">**MUST** contain a FHIR Artifacts page, `/artifacts.html` which provides a list of **all** the FHIR Artifacts defined as part of the IG, which is accessible from the website navigation menu, labelled `Artifacts`</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_BUSINESS_CONTEXT" type="MUST" toolTip="A FHIR IG MUST contain a business context page." wrapper="li">**MUST** contain a Business Context page, which provides business context of the problem/s solved through use of the FHIR implementation, which is accessible from the website navigation menu, labelled `Business Context`</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_API" type="MUST" toolTip="A FHIR IG MUST contain an API page." wrapper="li">**MUST** contain an API page, which provides information about the FHIR API/s available for consumption. This page **SHOULD** be a visual representation of the `CapabilityStatement` resource/s included in the IG, accessible from the website navigation menu labelled `API` or, `APIs` if there are multiple `CapabilityStatement` resources</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_DOWNLOAD" type="MUST" toolTip="A FHIR IG MUST provide a download capability." wrapper="li">**MUST** contain the ability to download the [FHIR Implementation Guide NPM package](https://hl7.org/fhir/packages.html) for use by API Consumers or Providers</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_IG_USE_LOGICAL_READING_ORDER" type="SHOULD" toolTip="A FHIR IG SHOULD be authored in logical reading order" wrapper="li">the order of presentation of the content in the IG **SHOULD** be designed that reading the IG from start to finish will present the information in logical reading order</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_IG_INTRO_TEXT" type="SHOULD" toolTip="A FHIR IG profile page SHOULD provide overview text" wrapper="li">individual artifact pages **SHOULD** have intro text that explains what this particular artifact is for, and any additional context that developers may need to know when using the resource</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_HISTORY_PAGE" type="MUST" toolTip="A FHIR IG MUST contain a history page." wrapper="li">**MUST** contain a History page, `/history.html` which outlines the prior versions of the IG. The previous versions listed **SHOULD** be hyperlinked and available to view</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_CHANGELOG" type="MUST" toolTip="A FHIR IG MUST contain a changelog page." wrapper="li">**MUST** contain an area which describes the changes which have been made to the IG across versions. This may be on the history page, or a dedicated change log page</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_SECURITY_PAGE" type="MUST" toolTip="A FHIR IG MUST contain a security and privacy page." wrapper="li">**MUST** contain a security and privacy page which details the API data privacy and security requirements, including patient consent</ApiStandard>

<br />
In addition, every page within the IG website **MUST** clearly show:
<ApiStandard id="HNZAS_MUST_IG_NAME_AND_VERSION" type="MUST" toolTip="A FHIR IG MUST show the IG name and version on all pages." wrapper="li">the IG name and version</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_FHIR_VERSION" type="MUST" toolTip="A FHIR IG MUST show the target FHIR version on all pages." wrapper="li">the FHIR version targetted by the IG</ApiStandard>

### Other

<ApiStandard id="HNZAS_SHOULD_IG_DIAGRAMS" type="SHOULD" toolTip="A FHIR IG SHOULD provide diagrams to communicate use cases" wrapper="li">diagrams **SHOULD** be used when communicating use cases or data relationships, in addition to text content. These should use a consistent theme/appearance throughout the IG. The authoring tool for diagrams **SHOULD** be one that is free and widely used. The [HL7 FHIR Publisher](https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation) provides support for [PlantUML](https://plantuml.com) in the standard build process so this tool is **RECOMMENDED** for creating diagrams</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_DIAGRAMS_SOURCE" type="MUST" toolTip="A FHIR IG MUST provide diagram source" wrapper="li">the source code to any diagrams or generated images included in the IG **MUST** be available alongside the IG source</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_OPENAPI" type="MUST" toolTip="A FHIR IG MUST provide an OpenAPI specification" wrapper="li">the IG **MUST** contain an OpenAPI specification which represents each `CapabilityStatement` in the Implementation Guide</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_IG_HEADINGS" type="SHOULD" toolTip="A FHIR IG SHOULD use hierarchical heading" wrapper="li">when authoring business content, the pages **SHOULD** use hierarchical headings</ApiStandard>
<ApiStandard id="HNZAS_MUST_IG_EXAMPLES" type="MUST" toolTip="A FHIR IG MUST provide profile examples" wrapper="li">profiles included as part of an IG **MUST** have an associated example instance included within the IG. The content of the example resource **MUST** be representative of what the data intended to be shared looks like, as opposed to placeholder values (note that real production data **MUST NOT** be used for this)</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_IG_NZ_ENGLISH" type="SHOULD" toolTip="A FHIR IG SHOULD use New Zealand English" wrapper="li">IG content should be authored using `en-NZ` New Zealand English, however, all references to the [FHIR specification **MUST** use the correct `en-US` American English spelling,](https://www.hl7.org/fhir/languages.html#spec) for example `Immunization` should be used when communicating about the FHIR Resource, as opposed to `Immunisation`</ApiStandard>

### Canonical URL

<ApiStandard id="HNZAS_MUST_IG_NOMINATE_CANONICAL_URL" type="MUST" toolTip="A FHIR IG MUST nominate a canonical URL">The Implementation Guide **MUST** nominate a canonical URL.</ApiStandard>

This canonical URL is used throughout most of the generated resources. The canonical URL should point to the current version of the IG that you're publishing, so if someone enters the canonical URL into their browser, they will get the IG home page (for example, `https://fhir-ig.digital.health.nz/fhir-screening`). Selection of an appropriate canonical URL is important as by default this will be used as the base URL for conformance resources which are part of the IG such as `StructureDefinition` resources. This **MAY** be a FHIR Server which can host resources. For example, `https://fhir-ig.digital.health.nz/fhir-screening/StructureDefinition/example` would return an example StructureDefinition instance defined as part of the IG.

### FHIR Artifacts

Depending on the particular interoperability use case which the FHIR implementation is attempting to solve, a number of FHIR Artifacts are likely to be included as part of the IG. These may include, but are not limited to:

- FHIR Profiles, to constrain the base FHIR resources for a particular use case
- FHIR extensions, to extend FHIR resources to include new elements where required
- Definitional resources such as ActivityDefinition or PlanDefinition resources

#### Authoring

The **RECOMMENDED** way to author these FHIR resources is by using [FHIR Shorthand](https://build.fhir.org/ig/HL7/fhir-shorthand/index.html) and its associated tooling. FHIR Shorthand (FSH) is a domain specific language for defining FHIR Artifacts involved in the creation of IGs, which is typically used alongside the [SUSHI](https://fshschool.org/docs/sushi) compiler.

Both the HL7 Publisher and Simplifier support seamless processing of `.fsh` files into FHIR Artifacts as part of their IG build processes.

Once authored, all artifacts **MUST** pass validation before being published in an IG, so the build time validation provided by FSH and SUSHI is advantageous.

#### Capability Statement

<ApiStandard id="HNZAS_MUST_IG_CAPABILITY_STATEMENT" type="MUST" toolTip="A FHIR IG MUST provide a CapabilityStatement">Each Implementation Guide which is representing a FHIR API Implementation **MUST** include a `CapabilityStatement` resource (or, sometimes multiple `CapabilityStatement` resources) which **MUST** be displayed within the Implementation Guide content.</ApiStandard>

The Capability Statement **MUST**:

<ApiStandard id="HNZAS_MUST_CAPABILITY_STATEMENT_ENDPOINTS" type="MUST" toolTip="A CapabilityStatement MUST detail endpoints" wrapper="li">provide detail around which FHIR resource endpoints have been published, and which FHIR operations are available, such as `read`, `search-type`, `create` or any [custom operations](#custom-fhir-operations)</ApiStandard>
<ApiStandard id="HNZAS_MUST_CAPABILITY_STATEMENT_SECURITYDETAILS" type="MUST" toolTip="A CapabilityStatement MUST detail security" wrapper="li">include [rest security details](https://hl7.org/fhir/capabilitystatement-definitions.html#CapabilityStatement.rest.security) for REST APIs.</ApiStandard>

<br />

<ApiStandard id="HNZAS_SHOULD_CAPABILITYSTATEMENT_SCOPES" type="SHOULD" toolTip="A CapabilityStatement SHOULD indicate security scopes">The Capability Statement **SHOULD** provide documentation indicating authorisation scopes required to consume the API.</ApiStandard>

#### Custom FHIR Operations

<ApiStandard id="HNZAS_MUST_OPERATION_DEFINITION" type="MUST" toolTip="A FHIR IG MUST provide an OperationDefinition of any custom operations">When a FHIR API is exposing a custom operation, a corresponding `OperationDefinition` **MUST** be published within the Implementation Guide, and included within the applicable Capability Statement.</ApiStandard>

## FHIR Publishing tooling

FHIR Implementation Guides can be written by anyone and a wide variety of tooling can be used to both define and publish such guides.

| Publishing method | Description | Usage |
|----------|----------|----------|
| [HL7 FHIR Publisher](https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation) | The publishing tool provided by the HL7 FHIR Project. This tool is well maintained and is well aligned to updates to the base FHIR specification| <ApiStandard id="HNZAS_SHOULD_USE_HL7_PUBLISHER" type="SHOULD" toolTip="A FHIR IG SHOULD be published using the official HL7 Publisher">**RECOMMENDED** - it is recommended to use the official HL7 FHIR Publishing tools which are highly aligned to the FHIR release cadence and community, in addition to being well supported and open source. This is the most commonly used publishing tool in the sector.</ApiStandard> |
| [Simplifier](https://simplifier.net) | Simplifier is a FHIR Package registry which also provides an online platform for authoring and publishing FHIR data models. | <ApiStandard id="HNZAS_MAY_USE_SIMPLIFIER" type="MAY" toolTip="A FHIR IG MAY be published using Simplifier">**MAY** - the Simplifier tooling requires accounts to be managed and paid plans for advanced features such as GitHub integration</ApiStandard> |
| Custom developed | An IG package can be built without using any particular tool | <ApiStandard id="HNZAS_SHOULD_NOT_CUSTOM_DEVELOP_IG" type="SHOULD NOT" toolTip="A FHIR IG SHOULD NOT be custom developed">**NOT RECOMMENDED** - to achieve interoperability of FHIR Conformance resources it is encouraged to use a publishing tool which is used by others in the sector, to ensure the output is both machine readable in the correct format, and for developers to easily navigate through various IGs</ApiStandard> |

## Implementation Guide Source

<ApiStandard id="HNZAS_SHOULD_USE_GITHUB" type="SHOULD" toolTip="A FHIR IG SHOULD be stored in GitHub">Implementation Guide FHIR resources and supporting artifacts **SHOULD** be stored in a public git repository such as on [GitHub](https:///github.com).</ApiStandard><ApiStandard id="HNZAS_SHOULD_USE_GITHUB_FOR_FEEDBACK" type="SHOULD" toolTip="A FHIR IG SHOULD use GitHub for comments and feedback">Comments, feedback and suggestions from sector API Consumers on FHIR resources and associated documentation **SHOULD** be managed through raising and tracking issues on the site.</ApiStandard>
