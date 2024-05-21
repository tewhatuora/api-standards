---
title: "Search APIs"
---



Search capability is an important component of many REST APIs. Search is usually used to find resources within a [collection](./Content#singletons-vs-collections) that meet the API Consumers requirements.

There are two common ways to search collections via API:

- GET with query parameters
- POST with query parameters in a request body

Both of the above mechanisms are supported by this standard however there are some considerations when choosing the approach.

| | GET | POST |
|:--|:--|:--|
| **Description** | Retrieve n resources from a collection using the `GET` HTTP method that match parameters provided on in a query string - `GET /groups?status=active` | Retrieve n resources from a collection using the `POST` HTTP method that match parameters provided on in a query string - `POST /groups {"status":"active"}` |
| **Considerations** | <ul><li><ApiStandard id="HNZAS_SHOULD_PREFER_POST_FOR_SEARCH_SECURITY" type="SHOULD" toolTip="APIs SHOULD prefer POST for search requests.">Typically, the `GET` search mechanism is considered less secure than the `POST` mechanism. This is because components in an HTTP(S) interaction can often store URLs e.g. browsers or proxy servers.</ApiStandard></li><li><ApiStandard id="HNZAS_MUST_NOT_INCLUDE_SENSITIVE_INFO_IN_SEARCH_PARAMS" type="MUST_NOT" toolTip="Search query parameters MUST NOT contain personal identifiable or sensitive information.">Search query parameters **MUST NOT** contain personal identifiable or sensitive information e.g. `GET /Patient?lastName=Smith&mobileNumber=022111333`.</ApiStandard></li><li><ApiStandard id="HNZAS_SHOULD_USE_POST_FOR_COMPLEX_SEARCHES" type="SHOULD" toolTip="For extremely complex search APIs that may run into query string or URL length limitations, POST SHOULD be used.">In some circumstances it is possible that an extremely complex search API may run into query string or URL length limitations, although this is probably an indication that the design of the search operation is too complicated. The exact length limit is server and client dependent. For example, the Apache server has a default limit of 8KB, Microsoft IIS has a default of 16KB, and many browsers are limited to around 2KB maximum URL length. In this scenario `POST` **SHOULD** be used.</ApiStandard></li></ul> | <ul><li>Typically considered a more secure search mechanism as parameters in the request body are encrypted when using HTTPS protocol preventing intermediary components decrypting and storing the data. </li><li>Use when the search query contains sensitive or personal identifiable information e.g. `POST /Patient/_search {"lastName:"Smith","mobileNumber":"022111333"}`</li><li><ApiStandard id="HNZAS_MUST_USE_DISTINCT_SEARCH_RESOURCE" type="MUST" toolTip="When using the POST mechanism, the API MUST have a distinct search resource, e.g., /Patient/_search, to distinguish a search from a resource creation.">When using the POST mechanism the API **MUST** have a distinct search resource e.g. `/Patient/_search` as this provides the API with a simple mechanism to distinguish a search from a resource creation.</ApiStandard></li></ul> |

**<span class="smallcaps">Example</span>**

```json
# Get a list of groups that are either active or inactive, sorted by name and status

GET https://api.example.govt.nz/groups?status=active,inactive&sort=name,status

{
  "groups": [
    {
      "id": "0219c539-5885-4ab6-a55b-b0de7537c426",
      "name": "API lovers",
      "status": "active"
    },
    {
      "id": "1219c539-5885-4ab6-a55b-b0de7537c427",
      "name": "Developers",
      "status": "active"
    },
    {
      "id": "7219c539-5885-4ab6-a55b-b0de7537c42c",
      "name": "Risk analysts",
      "status": "active"
    },
    {
      "id": "3219c539-5885-4ab6-a55b-b0de7537c42h",
      "name": "Writers",
      "status": "active"
    },
    {
      "id": "g219c539-5885-4ab6-a55b-b0de7537c425",
      "name": "Authors",
      "status": "inactive"
    }
  ],
  "_links": [
    {
      "rel": "self",
      "href": "https://api.example.govt.nz/groups?sort=status,name"
    },
    {
      "rel": "API Lovers",
      "href": "https://api.example.govt.nz/groups/0219c539-5885-4ab6-a55b-b0de7537c426"
    },
    {
      "rel": "Developers",
      "href": "https://api.example.govt.nz/groups/1219c539-5885-4ab6-a55b-b0de7537c427"
    },
    {
      "rel": "Risk analysts",
      "href": "https://api.example.govt.nz/groups/7219c539-5885-4ab6-a55b-b0de7537c42c"
    },
    {
      "rel": "Writers",
      "href": "https://api.example.govt.nz/groups/3219c539-5885-4ab6-a55b-b0de7537c42h"
    },
    {
      "rel": "Authors",
      "href": "https://api.example.govt.nz/groups/g219c539-5885-4ab6-a55b-b0de7537c425"
    }
  ]
}
```

**<span class="smallcaps">Template</span>**

`POST /{version}/{namespace}/{search-resource}`

**<span class="smallcaps">Example Request</span>**

```json
POST /v1/people/person-search?page=5 HTTP/1.1
Host: www.example.com
Content-Type: application/json

{
  "startDateBefore": "2010-01-01",
  "position": "Manager",
  "businessUnit": "Operations",
  "many other search parameters": ""
}
```

**<span class="smallcaps">Example Response</span>**

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "pageSize": 10,
  "page": 5,
  "totalItems": 77,
  "totalPages": 8,
  "items": [
    "lots of people objects here"
  ],
  "_links": [
    {
      "rel": "first",
      "href": "https://www.example.com/v1/people/person-search?page=1"
    },
    {
      "rel": "prev",
      "href": " https://www.example.com/v1/people/person-search?page=4"
    },
    {
      "rel": "next",
      "href": " https://www.example.com/v1/people/person-search?page=6"
    },
    {
      "rel": "last",
      "href": " https://www.example.com/v1/people/person-search?page=8"
    }
  ]
}
```

Other considerations include special characters or filters that add
additional complexity due to URL encoding requirements. For example, the
search function might need to support "&lt;” or "&gt;” operators, or
special characters for non-English language support. Additionally,
structured query language (SQL) words should be avoided as common threat
detection filters may block requests containing words such as ‘DROP’,
‘ALTER’ or ‘DELETE’ in case they are SQL injection attacks. See
[OWASP XSS Cheat Sheet](https://www.owasp.org/index.php/XSS_Prevention_Cheat_Sheet) and [OWASP SQL Injection Cheat Sheet](https://www.owasp.org/index.php/SQL_Injection_Prevention_Cheat_Sheet) for details.

Paging behaviour for search results should be consistent with the
interaction as described in [Query Arguments](./URIs#query-arguments). Pagination can be implemented as a
page number and page size, offset and limit, or continuation token,
depending on the scale and changeability of the search results.

Note: It is worth pointing out that since the HTTP protocol treats POST
operations as unsafe, the result is not cacheable. This applies even if
the response has a Cache-Control header included, so consider the
performance impacts on the API if this is a high-volume operation.
