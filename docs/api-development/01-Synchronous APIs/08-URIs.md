---
title: "Uniform Resource Identifiers (URI)"
---

## URI Construction

URI construction is important in that it is the door through which
consumers enter to obtain API resources. It should be intuitive and
easy to guess what an endpoint does just by looking at the URI and HTTP
verb, without needing to see a query string. As basic guidance, endpoint
URLs should advertise resources, and avoid verbs.

In some situations an implemented standard may define the URI structure
for you. A good example of this is [Fast Health Interoperability Resources (FHIR)](https://www.hl7.org/fhir/resource.html). For additional guidance on the use of FHIR see [Part D: FHIR API Design and Development Standards](../../fhir-api-standard/)

### API Offering

Is it recommended that the URL makes it clear that it
is an API:

**<span class="smallcaps">Examples</span>**

[https://**api**.example.govt.nz]

[https://example.govt.nz/**api**]

### Version

APIs should have a clear indication of the version, so that application
developers can ensure they are using the appropriate version for their
consuming application.

Header-based versioning is recommended (see section [API Version Control](./Version%20Control)); however, it is recognised
that some API infrastructure does not readily support header-based versioning.

URL-based versioning is a viable alternative, as the version number in the URL should only change when major revisions have been made and the interface has changed substantially without backwards compatibility. For URL-based versioning the URI should include /vN with the major version (N) and v as a prefix. APIs should not include minor version numbers
when using version numbers in the path.

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

API Providers may hold multiple responsibilities which can result in overlapping resource naming (for example "supplier" could be used in both pharmacy/contracts and laboratory/contracts). It is recommended that namespaces be used to avoid
any ambiguity. The namespace would be the first noun in the URI and
should reflect the function of government being offered by this API.
Namespaces may be singular or plural, depending on the situation.

**<span class="smallcaps">Template</span>**

`/{version}/{namespace}/`

**<span class="smallcaps">Example</span>**

`/v1/laboratories/`

### Resources and Sub-resources

Resource names should be noun-based, and collection resource names
should be plural nouns, e.g. /laboratories in lower case. Resource naming
should be short, simple and clearly understandable. It should also be
human-guessable, avoiding technical or specialist terms where possible.

Sub-resources must appear under the resource they relate to, but should
go no more than three deep i.e.
/resource/id/sub-resource/id/sub-sub-resource. If you reach a third
level of granularity (sub-sub-resource), it may be worth reviewing your
resource construction to see if it is actually a combination of multiple
first or second level resources.

The URI references for resources should consistently use the same path
structure to refer to resources. Sub-namespace or sub-folders should be
avoided, to maintain path consistency. This allows application
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

Therefore, in order to keep URLs consistently formatted, path and query
string parameters should be lower case with hyphen separators for
multiword names.

**<span class="smallcaps">Example</span>**

`https://api.example.govt.nz/v1/example-service/search?sort-order=asc`

### Query Arguments

Query arguments should be used to filter a response i.e. modify a
returning result set.

The general rule is:

- If it changes the behaviour of the result set then it should be a query argument

- If it changes the behaviour of the API then it should be in the path

Query arguments are generally used for:

- Sorting or ordering the result set - e.g. sort-order=ascending or sort-order=descending

- Pagination - pagination is a query argument because it effectively
  acts as a filter and limits the result set returned. This is
  particularly useful with large response data sets. When using
  pagination it is a good idea to inform the consumer where they can
  find previous and subsequent result sets using hypermedia as
  discussed in [the HATEOS](./Content#hateoas) section of this document.

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

- Limiting the result set - e.g. by specifying which fields to return.
  This approach can be complicated and is often a decision based on
  functionality vs complexity. For example, it may be desirable to be
  able to filter a result set to a specific set of objects. Whilst
  this is possible, it is not a recommended approach. If this kind of
  flexibility is required in an API it could be a good time to
  consider the use of [Open Data Protocol (OData)](http://www.odata.org/) or [GraphQL](./API%20Design#types-of-api).

- In cases where response filtering is used, providers should ensure
  that they use a JSON schema by default so that consumers have the
  ability to understand the entire resource and do not need to query
  the resource for the message structure.

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
```

## Summary

URI Conformance standards.

- <ApiStandard id="C-2.1" type="SHOULD" text="endpoint URLs **SHOULD** advertise resources, and avoid verbs" extendedText="It should be intuitive and easy to guess what an endpoint does just by looking at the URI and HTTP verb, without needing to see a query string" />
- <ApiStandard id="C-2.2" type="SHOULD" text="URL **SHOULD** include 'api'" extendedText="It should be intuitive and easy to guess what an endpoint does just by looking at the URI and HTTP verb, without needing to see a query string" />
- <ApiStandard id="C-2.3" type="SHOULD" text="endpoint URLs **SHOULD** use Header-based versioning" extendedText="When using URL-versioning, the version number in the URL should only change when major revisions have been made" />
- <ApiStandard id="C-2.4" type="SHOULD" text="URL versioning **SHOULD** be based on major version only" extendedText="For URL-based versioning the URI should include /vN with the major version (N) and v as a prefix. APIs should not include minor version numbers when using version numbers in the path" />
