---
title: "Uniform Resource Identifiers (URI)"
---

## URI Construction

URI construction is important in that it is the door through which
consumers enter to obtain API resources. It should be intuitive and
easy to guess what an endpoint does just by looking at the URI and HTTP
verb, without needing to see a query string.

<ApiStandard id="HNZAS_SHOULD_USE_INTUITIVE_ENDPOINTS" type="SHOULD" toolTip="Endpoint purpose SHOULD be intuitive from the URI, avoiding verbs." >Endpoint URLs **SHOULD** advertise resources, and avoid verbs.</ApiStandard>

The table below provides an overview on the elements to be included in the URI.

| Level | Name | Cardinality|
|--------|--------|--------|
| 0 |`[basePath]`| 1..1 MUST be provided | 
| 1 |`protocol\|standard` | 0..1 MUST if the implementation is a FHIR API |
| 2 | `protocol version` | 0..1 SHOULD be provided if protocol\|standard is provided and relevant |
| 3 | `namespace` | 0..1 SHOULD be provided |
| 4 | `version` | 0..1 MAY be provided |
| 5 | `resource`| 1..1 MUST be provided |
| 6 | `resource-id` | 0..1 MUST be provided when interacting with a Resource Instance |
| 7 | `sub-resource` | 0..1 MUST be provided when interacting with a Sub-resource |
| 8 | `sub-resource-id`| 0..1 MUST be provided when interacting with a Sub-resource instance |

**<span class="smallcaps">Examples</span>**

`[basePath]/fhir/r4b/nhi/v1/Patient/ZZZ008`

`[basePath]/fhir/r4b/air/v1/Immunization/_search`

`[basePath]/fhir/r4b/nzps/v1/Patient/$summary`

`[basePath]/contracts/v2/laboratories/33245/locations/P100782`

`[basePath]/v3/vaccinators/43265/certifications/7281`

`[basePath]/openid-connect/token`

In some situations an implemented standard may define the URI structure
for you. A good example of this is [Fast Health Interoperability Resources (FHIR)](https://www.hl7.org/fhir/resource.html). For additional guidance on the use of FHIR see [Part D: FHIR API Design and Development Standards](../../fhir-api-standard/).

### API Offering

<ApiStandard id="HNZAS_SHOULD_INCLUDE_API_SUBDOMAIN" type="SHOULD" toolTip="URL SHOULD include 'api' as sud-domain e.g. https://api.example.govt.nz or context, e.g. https://example.govt.nz/api." >It is **RECOMMENDED** that the URL makes it clear that it is an API:</ApiStandard>

**<span class="smallcaps">Examples</span>**

[https://**api**.example.govt.nz]

[https://example.govt.nz/**api**]


### Version

APIs should have a clear indication of the version, so that application
developers can ensure they are using the appropriate version for their
consuming application.

<ApiStandard id="HNZAS_SHOULD_INCREMENT_ON_MAJOR_REVISION" type="SHOULD" toolTip="When using URL-versioning, the version number in the URL SHOULD only change when major revisions have been made">Header-based versioning is **RECOMMENDED** (see section [API Version Control](./Version%20Control)); however, it is recognised
that some API infrastructure does not readily support header-based versioning, URL-based versioning is a viable alternative, as the version number in the URL should only change when major revisions have been made and the interface has changed substantially without backwards compatibility.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_USE_VERSION_FORMAT" type="SHOULD" toolTip="URL version SHOULD be of the format /vN, where 'N' in the major version number, e.g. /v1">For URL-based versioning the URI **SHOULD** include /vN with the major version (N) and v as a prefix.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_INCLUDE_MINOR_VERSIONS" type="SHOULD NOT" toolTip="For URL-based versioning, minor version numbers SHOULD NOT be included, e.g. /v1.0.1, should be /v1" >APIs **SHOULD NOT** include minor version numbers when using version numbers in the path.</ApiStandard>

**<span class="smallcaps">Template</span>**

`/v{version}/`

**<span class="smallcaps">Example</span>**

```bash
# Get details for provider id 123435 – version 1 of the API

GET https://api.example.govt.nz/v1/providers/12345
Accept: application/json
Host: api.example.govt.nz
```

```bash
# Get details for provider id 123435 – version 2 of the API

GET https://api.example.govt.nz/v2/providers/12345
Accept: application/json
Host: api.example.govt.nz
```

### Namespaces

API Providers may hold multiple responsibilities which can result in overlapping resource naming (for example "supplier" could be used in both pharmacy/contracts and laboratory/contracts).

<ApiStandard id="HNZAS_SHOULD_USE_NAMESPACES" type="SHOULD">It is **RECOMMENDED** that namespaces be used to avoid any ambiguity.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_REFLECT_FUNCTION_IN_NAMESPACE" type="SHOULD" toolTip="Namespace SHOULD be the first noun in the URI and reflect the government function.">The namespace **SHOULD** be the first noun in the URI and **SHOULD** reflect the function of government being offered by this API.</ApiStandard>

<ApiStandard id="HNZAS_MAY_USE_PLURAL_SINGULAR_NAMESPACES" type="MAY" toolTip="Namespaces MAY be singular or plural based on context.">Namespaces **MAY** be singular or plural, depending on the situation.</ApiStandard>

**<span class="smallcaps">Template</span>**

`/{version}/{namespace}/`

**<span class="smallcaps">Example</span>**

`/v1/laboratories/`

### Resources and Sub-resources

<ApiStandard id="HNZAS_SHOULD_USE_NOUNS" type="SHOULD" toolTip="Resource names SHOULD be nouns, collections plural, like 'laboratories'.">Resource names **SHOULD** be noun-based, and collection resource names **SHOULD** be plural nouns, e.g. /laboratories in lower case.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NAME_RESOURCES_SIMPLY" type="SHOULD" toolTip="Resource names SHOULD be short, simple, and guessable, avoiding complex terms.">Resource naming **SHOULD** be short, simple, and clearly understandable. It **SHOULD** also be human-guessable, avoiding technical or specialist terms where possible.</ApiStandard>

<ApiStandard id="HNZAS_MUST_NEST_SUBRESOURCES" type="MUST" toolTip="Sub-resources MUST appear under the resource they relate to.">Sub-resources **MUST** appear under the resource they relate to, i.e. /resource/id/sub-resource/id</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_LIMIT_SUBRESOURCE_DEPTH" type="SHOULD" toolTip="Sub-resources SHOULD not exceed three levels deep in the hierarchy.">Sub-resources **SHOULD** go no more than three deep i.e. /resource/id/sub-resource/id/sub-sub-resource.</ApiStandard>

If you reach a third
level of granularity (sub-sub-resource), it may be worth reviewing your
resource construction to see if it is actually a combination of multiple
first or second level resources.

<ApiStandard id="HNZAS_SHOULD_MAINTAIN_PATH_CONSISTENCY" type="SHOULD" toolTip="URI paths SHOULD be consistent, avoiding sub-namespaces or sub-folders.">The URI references for resources **SHOULD** consistently use the same path structure to refer to resources. Sub-namespace or sub-folders **SHOULD** be avoided, to maintain path consistency.</ApiStandard>

This allows application
developers to have a predictable experience in case they are building
URIs in code.

**<span class="smallcaps">Template</span>**

`/{version}/{namespace}/{resource}/{resource-id}/{sub-resource}/{sub-resource-id}`

`/{version}/{resource}/{resource-id}/{sub-resource}/{sub-resource-id}`

**<span class="smallcaps">Example</span>**

`<https://api.example.govt.nz/v2/contracts/laboratories/33245/locations/P100782>`

`<https://api.example.govt.nz/v2/vaccinators/43265/certifications/7281>`

### Word Separation

Hyphens have traditionally been used as word separators in URLs, as
search engines (particularly Google) prefer a hyphen to split words
because a hyphen is not a word character (as defined in regular
expression language). This has led to hyphens, or kebab-case, being the
de facto standard in the interests of readability and Search Engine
Optimization (SEO).

<ApiStandard id="HNZAS_SHOULD_USE_LOWER_CASE_HYPHENS" type="SHOULD" toolTip="URLs SHOULD use lowercase and hyphens for multiword names to ensure format consistency.">Therefore, in order to keep URLs consistently formatted, path and query string parameters **SHOULD** be lower case with hyphen separators for multiword names.</ApiStandard>

**<span class="smallcaps">Example</span>**

`https://api.example.govt.nz/v1/example-service/search?sort-order=asc`

### Query Arguments

Query arguments should be used to filter a response i.e. modify a
returning result set.

The general rule is:

- <ApiStandard id="HNZAS_SHOULD_USE_QUERY_FOR_BEHAVIOR" type="SHOULD" toolTip="Use query arguments for any behavior-affecting changes to result sets.">If it changes the behaviour of the result set then it **SHOULD** be a query argument.</ApiStandard>

- <ApiStandard id="HNZAS_SHOULD_INCLUDE_API_CHANGES_IN_PATH" type="SHOULD" toolTip="Include changes affecting API behavior directly in the path.">If it changes the behaviour of the API then it **SHOULD** be in the path.</ApiStandard>

Query arguments are generally used for:

- Sorting or ordering the result set - e.g. sort-order=ascending or sort-order=descending

- Pagination - pagination is a query argument because it effectively
  acts as a filter and limits the result set returned. This is
  particularly useful with large response data sets.
  
  <ApiStandard id="HNZAS_SHOULD_GIVE_PAGINATION_LINKS" type="SHOULD" toolTip="Response SHOULD detail locations of previous and next result sets using hypermedia (HATEOS).">When using pagination, the response **SHOULD** inform the consumer where they can find previous and subsequent result sets using hypermedia as discussed in [the HATEOS](./Content#hateoas) section of this document.</ApiStandard>

**<span class="smallcaps">Example</span>**

```json
"_links": [
  {
    "rel": "next",
    "href": "https://api.example.govt.nz/v2.3/transactions?page=3"
  },
  {
    "rel": "prev",
    "href": "https://api.example.govt.nz/open-banking-nz/v2.3/transactions?page=1"
  },
  {
    "rel": "self",
    "href": "http://api.example.govt.nz/open-banking-nz/v2.3/transactions?page=2"
  },
  {
    "rel": "last",
    "href": "http://api.example.govt.nz/open-banking-nz/v2.3/transactions?page=10"
  }
],
"meta": {
    "totalPages": 10
}
```

- <ApiStandard id="HNZAS_MAY_LIMIT_RESULT_FIELDS_WITH_QUERY_ARGUMENT" type="MAY" toolTip="Result sets MAY be limited with query arguments, where justified.">Limiting the result set - e.g. by specifying which fields to return. This approach can be complicated and is often a decision based on functionality vs complexity. For example, it may be desirable to be able to filter a result set to a specific set of objects.</ApiStandard> Whilst
  this is possible, it is not a recommended approach. If this kind of
  flexibility is required in an API it could be a good time to
  consider the use of [Open Data Protocol (OData)](http://www.odata.org/) or [GraphQL](./API%20Design#types-of-api).

- <ApiStandard id="HNZAS_SHOULD_USE_JSON_SCHEMA_FOR_RESPONSE_FILTERING" type="SHOULD" toolTip="Use a JSON schema where response filtering is used, so consumers understand the entire resource without extra queries.">In cases where response filtering is used, providers should ensure that they use a JSON schema by default so that consumers have the ability to understand the entire resource and do not need to query the resource for the message structure.</ApiStandard>

**<span class="smallcaps">Example</span>**

```bash
# Get a filtered result set for a vaccinator (REST)
GET https://api.example.govt.nz/v2/vaccinators/33245?fields=firstName,lastName,dateOfBirth
```

```json
{
  "firstName": "Mary",
  "lastName": "Contrary",
  "dateOfBirth": "12-01-1974",
  "_links": [
    {
      "rel": "self",
      "href": "https://api.example.govt.nz/v2/vaccinators/33245?fields=firstName,lastName,dateOfBirth"
    }
  ]
}
```

```json
# Get a filtered result set for a Patient (GraphQL)
# POST https://api.example.govt.nz/$graphql
query {
  Patient(id:"03cb8799-bfbd-40fa-9ea8-96114cf1fec1") {
      name {family, given}
      birthDate
  }
}

{
    "data": {
        "Patient": {
            "name": [
                {
                    "family": "DuBuque",
                    "given": [
                        "Calvin"
                    ]
                }
            ],
            "birthDate": "2012-10-09"
        }
    }
}
