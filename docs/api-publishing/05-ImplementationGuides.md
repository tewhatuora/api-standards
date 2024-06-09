---
title: FHIR Implementation Guides
slug: implementation-guides
---

FHIR Implementation Guides (IGs) are the mechanism that FHIR API Developers and Designers use to explain how to use the FHIR specification to achieve interoperability in a particular space. They use a variety of FHIR resources to express that guidance in a machine readable format and then allow those artifacts to be converted into a rendered web site for easy understanding by API Consumers, Application Developers and others.

The Implementation Guide serves two primary purposes:

- provides a set of human readable business content and representations of FHIR resource profiles
- provides a [FHIR Implementation Guide NPM package](https://hl7.org/fhir/packages.html) which contains machine readable portions of the IG (e.g. `StructureDefinition` resources), along with several other different collateral files that may be useful for implementers using the IG (both the API Provider and Consumers)

When publishing a FHIR API, an associated Implementation Guide **MUST** be published as an unauthenticated web experience and FHIR NPM Package.

## Implementation Guide Website

## Layout and content

The guidance for this section consolidates recommendations for creating IGs that are easy to understand by readers, are consistent with other IGs, and are intended to reduce implementation costs for the sector as a whole. This particular guidance is concerning the readability of the IG by humans.

### Pages and content organisation

The website:

- **MUST** contain an index page, `{root}/index.html` which defines the homepage for the IG, which is accessible from the website navigation menu, labelled `Home`. This page should always start with an explanation of the purpose of the IG
- **MUST** contain a table of contents page, `{root}/toc.html` which lists all of the pages contained within the IG, which is accessible from the website navigation menu, labelled `Table of Contents`
- **MUST** contain a FHIR Artifacts page, `{root}/artifacts.html` which provides a list of **all** the FHIR Artifacts defined as part of the IG, which is accessible from the website navigation menu, labelled `Artifacts`
- **MUST** contain a Business Context page, which provides business context of the problem/s solved through use of the FHIR implementation, which is accessible from the website navigation menu, labelled `Business Context`
- **MUST** contain an API page, which provides information about the FHIR API/s available for consumption. This page **SHOULD** be a visual representation of the `CapabilityStatement` resource/s included in the IG, accessible from the website navigation menu labelled `API` or, `APIs` if there are multiple `CapabilityStatement` resources
- **MUST** contain the ability to download the [FHIR Implementation Guide NPM package](https://hl7.org/fhir/packages.html) for use by API Consumers or Providers
- the order of presentation of the content in the IG **SHOULD** be designed that reading the IG from start to finish will present the information in logical reading order
- individual artifact pages **SHOULD** have intro text that explains what this particular artifact is for, and any additional context that developers may need to know when using the resource
- **MUST** contain a History page, `{root}/history.html` which outlines the prior versions of the IG. The previous versions listed **SHOULD** be hyperlinked and available to view
- **MUST** contain an area which describes the changes which have been made to the IG across versions. This may be on the history page, or a dedicated change log page
- **MUST** contain a security and privacy page which details the API data privacy and security requirements, including patient consent

In addition, every page within the IG website **MUST** clearly show:
  - the IG name and version
  - the FHIR version targetted by the IG

### Other

- diagrams **SHOULD** be used when communicating use cases or data relationships, in addition to text content. These should use a consistent theme/appearance throughout the IG. The authoring tool for diagrams **SHOULD** be one that is free and widely used. The [HL7 FHIR Publisher](https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation) provides support for [PlantUML](https://plantuml.com) in the standard build process so this tool is **RECOMMENDED** for creating diagrams
- the source code to any diagrams or generated images included in the IG **MUST** be available alongside the IG source
- the IG **MUST** contain an OpenAPI specification which represents each `CapabilityStatement` in the Implementation Guide
- when authoring business content, the pages **SHOULD** use hierarchical headings
- profiles included as part of an IG **MUST** have an associated example instance included within the IG. The content of the example resource **MUST** be representative of what the data intended to be shared looks like, as opposed to placeholder values (note that real production data **MUST NOT** be used for this)
- IG content should be authored using `en-NZ` New Zealand English, however, all references to the [FHIR specification **MUST** use the correct `en-US` American English spelling,](https://www.hl7.org/fhir/languages.html#spec) for example `Immunization` should be used when communicating about the FHIR Resource, as opposed to `Immunisation`

### Canonical URL

The Implementation Guide **MUST** nominate a canonical URL. This canonical URL is used throughout most of the generated resources. The canonical URL should point to the current version of the IG that you're publishing, so if someone enters the canonical URL into their browser, they will get the IG home page (for example, `https://implementation-guides.digital.health.nz/fhir-screening`). Selection of an appropriate canonical URL is important as by default this will be used as the base URL for conformance resources which are part of the IG such as `StructureDefinition` resources. This **MAY** be a FHIR Server which can host resources. For example, `https://implementation-guides.digital.health.nz/fhir-screening/StructureDefinition/example` would return an example StructureDefinition instance defined as part of the IG.

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

Each Implementation Guide which is representing a FHIR API Implementation **MUST** include a `CapabilityStatement` resource (or, sometimes multiple `CapabilityStatement` resources) which **MUST** be displayed within the Implementation Guide content. The Capability Statement **MUST** provide detail around which FHIR resource endpoints have been published, and which FHIR operations are available, such as `read`, `search-type`, `create` or any [custom operations](#custom-fhir-operations). 

#### Custom FHIR Operations

When a FHIR API is exposing a custom operation, a corresponding `OperationDefinition` **MUST** be published within the Implementation Guide, and included with the applicable Capability Statement.

## FHIR Publishing tooling

FHIR Implementation Guides can be written by anyone and a wide variety of tooling can be used to both define and publish such guides.

| Publishing method | Description | Usage |
|----------|----------|----------|
| [HL7 FHIR Publisher](https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation) | The publishing tool provided by the HL7 FHIR Project. This tool is well maintained and is well aligned to updates to the base FHIR specification| **RECOMMENDED** - it is recommended to use the official HL7 FHIR Publishing tools which are highly aligned to the FHIR release cadence and community, in addition to being well supported and open source. This is the most commonly used publishing tool in the sector.|
| [Simplifier](https://simplifier.net) | Simplifier is a FHIR Package registry which also provides an online platform for authoring and publishing FHIR data models. | **MAY** - the Simplifier tooling requires accounts to be managed and paid plans for advanced features such as GitHub integration|
| Custom developed | An IG package can be built without using any particular tool | **NOT RECOMMENDED** - to achieve interoperability of FHIR Conformance resources it is encouraged to use a publishing tool which is used by others in the sector, to ensure the output is both machine readable in the correct format, and for developers to easily navigate through various IGs|

## Implementation Guide Source

Implementation Guide FHIR resources and supporting artifacts **SHOULD** be stored in a public git repository such as on [GitHub](https:///github.com). Comments, feedback and suggestions from sector API Consumers on FHIR resources and associated documentation **SHOULD** be managed through raising and tracking issues on the site.
