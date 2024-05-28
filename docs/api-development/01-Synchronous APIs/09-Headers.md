---
title: "HTTP Headers"
---



## Request Headers

| **Header**                          | **Usage**                                                                                                                                                                      | **GET**                       | **POST**                              | **PUT**                               | **DELETE**                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------------------------------------- | ------------------------------------- | ----------------------------- |
| **Accept**                          | Indicates desired format of the response. If set to a value that cannot be supported by the server, API responds with 406 (not acceptable)                                     | <ApiStandard id="HNZAS_MUST_USE_ACCEPT_HEADER_FOR_GET_REQUEST" type="MUST" toolTip="GET requests MUST use the Accept header.">**MUST**</ApiStandard>                      | <ApiStandard id="HNZAS_MUST_USE_ACCEPT_HEADER_FOR_POST_REQUEST" type="MUST" toolTip="POST requests MUST use the Accept header.">**MUST**</ApiStandard>                               | <ApiStandard id="HNZAS_MUST_USE_ACCEPT_HEADER_FOR_PUT_REQUEST" type="MUST" toolTip="PUT requests MUST use the Accept header.">**MUST**</ApiStandard>                               | N/A                           |
| **Content-Type**                    | Indicates the format of the payload provided on the request. If not supported by the server, API responds with 415 (Unsupported Media Type)                                    | N/A                           | <ApiStandard id="HNZAS_MUST_USE_CONTENT_TYPE_HEADER_FOR_POST_REQUEST" type="MUST" toolTip="POST requests MUST use the Content-type header.">**MUST**</ApiStandard>                               | <ApiStandard id="HNZAS_MUST_USE_CONTENT_TYPE_HEADER_FOR_PUT_REQUEST" type="MUST" toolTip="PUT requests MUST use the Content-type header.">**MUST**</ApiStandard>                              | N/A                           |
| **Authorization**                   | To provide authorization information – type and token, depending on authorization type. If token is not valid for the request, API responds with 401 (Unauthorized)            | <ApiStandard id="HNZAS_MUST_USE_AUTHORIZATION_HEADER_FOR_GET_REQUEST" type="MUST" toolTip="GET requests MUST use the Authorization header, unless a public API.">**MUST**, unless a public API</ApiStandard> | <ApiStandard id="HNZAS_MUST_USE_AUTHORIZATION_HEADER_FOR_POST_REQUEST" type="MUST" toolTip="POST requests MUST use the Authorization header, unless a public API.">**MUST**, unless a public API</ApiStandard>        | <ApiStandard id="HNZAS_MUST_USE_AUTHORIZATION_HEADER_FOR_PUT_REQUEST" type="MUST" toolTip="PUT requests MUST use the Authorization header, unless a public API.">**MUST**, unless a public API</ApiStandard>        | <ApiStandard id="HNZAS_MUST_USE_AUTHORIZATION_HEADER_FOR_DELETE_REQUEST" type="MUST" toolTip="DELETE requests MUST use the Authorization header, unless a public API.">**MUST**, unless a public API</ApiStandard> |
| **Accept-Encoding**                 | Advertises what compression algorithm the consuming application is able to understand. If encoding not supported by the server, API responds with uncompressed response        | <ApiStandard id="HNZAS_SHOULD_USE_ACCEPT_ENCODING_HEADER_FOR_GET_REQUEST" type="MUST" toolTip="GET requests SHOULD use the Accept-Encoding header.">**SHOULD**</ApiStandard>                   | <ApiStandard id="HNZAS_SHOULD_USE_ACCEPT_ENCODING_HEADER_FOR_POST_REQUEST" type="MUST" toolTip="POST requests SHOULD use the Accept-Encoding header.">**SHOULD**, if response body expected</ApiStandard> |<ApiStandard id="HNZAS_SHOULD_USE_ACCEPT_ENCODING_HEADER_FOR_PUT_REQUEST" type="MUST" toolTip="PUT requests SHOULD use the Accept-Encoding header.">**SHOULD**, if response body expected</ApiStandard> | N/A                           |
| **API Key Header**                  | Send the API Keys with every request. If keys are not valid, API response with 401 (Not authorised)                                                                            | <ApiStandard id="HNZAS_MUST_USE_API_KEY_HEADER_FOR_GET_REQUEST" type="MUST" toolTip="GET requests MUST use the API Key header, if issued.">**MUST**, if issued</ApiStandard>           | <ApiStandard id="HNZAS_MUST_USE_API_KEY_HEADER_FOR_POST_REQUEST" type="MUST" toolTip="POST requests MUST use the API Key header, if issued.">**MUST**, if issued</ApiStandard>                   | <ApiStandard id="HNZAS_MUST_USE_API_KEY_HEADER_FOR_PUT_REQUEST" type="MUST" toolTip="PUT requests MUST use the API Key header, if issued.">**MUST**, if issued</ApiStandard>                | <ApiStandard id="HNZAS_MUST_USE_API_KEY_HEADER_FOR_DELETE_REQUEST" type="MUST" toolTip="DELETE requests MUST use the API Key header, if issued.">**MUST**, if issued</ApiStandard>           |
| **If_Modified_Since/If-None-Match** | Makes the request conditional; the server will respond with the resource only if the specified condition is met. If condition is not met, API responds with 304 (Not Modified) | <ApiStandard id="HNZAS_SHOULD_USE_CONDITIONAL_HEADERS_FOR_GET_REQUEST" type="SHOULD" toolTip="GET requests SHOULD use the If_Modified_Since/If-None-Match header.">**SHOULD**</ApiStandard>                    | N/A                                   | N/A                                   | N/A                           |
| **Request tracking Headers**        | Unique identifier that can be used to trace a request throughout its lifecycle                                                                                                 | <ApiStandard id="HNZAS_SHOULD_USE_REQUEST_TRACKING_HEADER_FOR_GET_REQUEST" type="SHOULD" toolTip="GET requests SHOULD use a request tracking header to trace a request throughout its lifecycle.">**SHOULD**</ApiStandard>                    | <ApiStandard id="HNZAS_SHOULD_USE_REQUEST_TRACKING_HEADER_FOR_POST_REQUEST" type="SHOULD" toolTip="POST requests SHOULD use a request tracking header to trace a request throughout its lifecycle.">**SHOULD**</ApiStandard>                            | <ApiStandard id="HNZAS_SHOULD_USE_REQUEST_TRACKING_HEADER_FOR_PUT_REQUEST" type="SHOULD" toolTip="PUT requests SHOULD use a request tracking header to trace a request throughout its lifecycle.">**SHOULD**</ApiStandard>                            | <ApiStandard id="HNZAS_SHOULD_USE_REQUEST_TRACKING_HEADER_FOR_DELETE_REQUEST" type="SHOULD" toolTip="DELETE requests SHOULD use a request tracking header to trace a request throughout its lifecycle.">**SHOULD**</ApiStandard>                    |

## Response Headers

| **Response Headers** | **Usage**                                                                            | **GET**                   | **POST**                            | **PUT**                             | **DELETE** |
| -------------------- | ------------------------------------------------------------------------------------ | ------------------------- | ----------------------------------- | ----------------------------------- | ---------- |
| **Content-Type**     | Indicates the format type of the response                                            | **MUST**                  | <ApiStandard id="HNZAS_MUST_USE_CONTENT_TYPE_HEADER_FOR_POST_RESPONSE" type="MUST" toolTip="POST requests MUST use a Content-type header.">**MUST**, if response body returned</ApiStandard> | <ApiStandard id="HNZAS_MUST_USE_CONTENT_TYPE_HEADER_FOR_PUT_RESPONSE" type="MUST" toolTip="PUT requests MUST use a Content-type header.">**MUST**, if response body returned</ApiStandard> | N/A        |
| **Location**         | Indicates the absolute URI of the newly created resource item                        | <ApiStandard id="HNZAS_MUST_USE_LOCATION_HEADER_FOR_GET_RESPONSE" type="MUST" toolTip="GET requests MUST use a Location header.">**MUST** for 302 redirect</ApiStandard> | <ApiStandard id="HNZAS_SHOULD_USE_LOCATION_HEADER_FOR_POST_RESPONSE" type="SHOULD" toolTip="POST requests SHOULD use a Location header.">**SHOULD**, if resource created</ApiStandard>   | N/A                                 | N/A        |
| **Content-Location** | Indicates the absolute URI of the requested resource                                 | <ApiStandard id="HNZAS_SHOULD_USE_CONTENT_LOCATION_HEADER_FOR_GET_RESPONSE" type="SHOULD" toolTip="GET requests SHOULD use a Content-Location header.">**SHOULD**</ApiStandard>              | <ApiStandard id="HNZAS_SHOULD_USE_CONTENT_LOCATION_HEADER_FOR_POST_RESPONSE" type="SHOULD" toolTip="POST requests SHOULD use a Content-Location header.">**SHOULD**, if resource returned</ApiStandard>    | <ApiStandard id="HNZAS_SHOULD_USE_CONTENT_LOCATION_HEADER_FOR_PUT_RESPONSE" type="SHOULD" toolTip="PUT requests SHOULD use a Content-Location header.">**SHOULD**</ApiStandard>                      | N/A        |
| **Cache-Control**    | Directives to control caching behaviour external to the API layer (e.g. CDN caching) | <ApiStandard id="HNZAS_SHOULD_USE_CACHE_CONTROL_HEADER_FOR_GET_RESPONSE" type="SHOULD" toolTip="GET requests SHOULD use a Cache-Control header.">**SHOULD**</ApiStandard>               | <ApiStandard id="HNZAS_SHOULD_USE_CACHE_CONTROL_HEADER_FOR_POST_RESPONSE" type="SHOULD" toolTip="POST requests SHOULD use a Cache-Control header.">**SHOULD**</ApiStandard>                        | <ApiStandard id="HNZAS_SHOULD_USE_CACHE_CONTROL_HEADER_FOR_PUT_RESPONSE" type="SHOULD" toolTip="PUT requests SHOULD use a Cache-Control header.">**SHOULD**</ApiStandard>                          | N/A        |
| **Expires**          | Used in conjunction with Cache-Control for backwards compatibility                   | <ApiStandard id="HNZAS_SHOULD_USE_EXPIRES_HEADER_FOR_GET_RESPONSE" type="SHOULD" toolTip="GET requests SHOULD use an Expires header.">**SHOULD**</ApiStandard>                | <ApiStandard id="HNZAS_SHOULD_USE_EXPIRES_HEADER_FOR_POST_RESPONSE" type="SHOULD" toolTip="POST requests SHOULD use an Expires header.">**SHOULD**</ApiStandard>                         | <ApiStandard id="HNZAS_SHOULD_USE_EXPIRES_HEADER_FOR_PUT_RESPONSE" type="SHOULD" toolTip="PUT requests SHOULD use an Expires header.">**SHOULD**</ApiStandard>                        | N/A        |
| **ETag**             | Concurrency control header                                                           | <ApiStandard id="HNZAS_SHOULD_USE_ETAG_HEADER_FOR_GET_RESPONSE" type="SHOULD" toolTip="GET requests SHOULD use an ETag header.">**SHOULD**</ApiStandard>                | <ApiStandard id="HNZAS_SHOULD_USE_ETAG_HEADER_FOR_POST_RESPONSE" type="SHOULD" toolTip="POST requests SHOULD use an ETag header.">**SHOULD**</ApiStandard>                         | <ApiStandard id="HNZAS_SHOULD_USE_ETAG_HEADER_FOR_PUT_RESPONSE" type="SHOULD" toolTip="PUT requests SHOULD use an ETag header.">**SHOULD**</ApiStandard>                        | <ApiStandard id="HNZAS_SHOULD_USE_ETAG_HEADER_FOR_DELETE_RESPONSE" type="SHOULD" toolTip="DELETE requests SHOULD use an ETag header.">**SHOULD**</ApiStandard> |

## Custom X-HTTP Headers

<ApiStandard id="HNZAS_SHOULD_NOT_USE_X_HEADERS" type="SHOULD_NOT" toolTip="'X-' notation headers SHOULD NOT be used as per RFC6648.">X- notation headers have been deprecated as per [RFC6648](https://tools.ietf.org/html/rfc6648) and **SHOULD NOT** be used, if possible.</ApiStandard> This standard appreciates that `X-` notation headers are widely
used however this document recommends that the `X-` notation not be used when defining your own custom headers and instead define
a custom header notation that is relevant. For example, _X-Request-Id_ could be redefined as _Request-Id_.

## Request Header Detail

Request headers are supplied by the consuming application and **MUST** include the following elements:

- <ApiStandard id="HNZAS_MUST_INCLUDE_REQUEST_ACCEPT_HEADER" type="MUST" toolTip="Request headers from consuming applications MUST include 'Accept'.">Accept</ApiStandard>

- <ApiStandard id="HNZAS_MUST_INCLUDE_REQUEST_CONTENT_TYPE_HEADER" type="MUST" toolTip="Request headers from consuming applications MUST include 'Content-Type'.">Content-Type</ApiStandard>

- <ApiStandard id="HNZAS_MUST_INCLUDE_REQUEST_AUTHORIZATION_HEADER" type="MUST" toolTip="Request headers from consuming applications MUST include 'Authorization'.">Authorization.</ApiStandard>

For many years Header definitions could be found in [RFC2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html). RFC2616 is now obsolete and has been superseded by a series of RFC documents RFC9110-RFC9114. For specific HTTP header information you should refer to [RFC9110 - HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110.html)

### Accept

<ApiStandard id="HNZAS_MUST_INCLUDE_REQUEST_ACCEPT_HEADER" type="MUST" toolTip="Request headers from consuming applications MUST include 'Accept'.">**MUST**</ApiStandard>

<ApiStandard id="HNZAS_MUST_USE_ACCEPT_HEADER" type="MUST" toolTip="The 'Accept' header MUST be specified to indicate the desired data format (e.g., JSON, XML).">An Accept header is **REQUIRED** to indicate what format the consuming application wants the information to be returned as (e.g. JSON or XML).</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_SPECIFY_RESPONSE_TYPE" type="SHOULD" toolTip="Consuming applications SHOULD specify the expected response content type.">It is preferable for the consuming application to specify the response content type that they expect.</ApiStandard>
<ApiStandard id="HNZAS_MAY_USE_Q_PARAMETER" type="MAY" toolTip="It is acceptable to use the 'q' parameter to specify the quality of support for response content-type.">However it is acceptable to use the _‘q’_ parameter to specify the quality of support.</ApiStandard>

**<span class="smallcaps">Example</span>**

```bash
# Accept JSON and latest version
Accept: application/json,version=\*

# Prefer JSON, Accept XML and latest version 1 release
Accept: application/json;q=1.0,application/xml;q=0.8,version=1.\*

#Accept XML only and version 1.2 only
Accept: application/xml;q=1.0,application/json;q=0.0,version=1.2
```

<ApiStandard id="HNZAS_MUST_RETURN_406_IF_UNSUPPORTED" type="MUST" toolTip="If the API's formats aren't supported as specified by the Accept header, the server MUST return HTTP 406 Not Acceptable.">If the client has specified via the Accept header that it doesn’t support any formats provided by the API, the server **MUST** return an HTTP 406 Not Acceptable response.</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_INCLUDE_LINK_HEADER_WITH_406_RESPONSE" type="SHOULD" toolTip="406 responses SHOULD include a Link header to documentation or help on supported formats.">The response **SHOULD** also include a Link header with a link to documentation or help on supported formats.</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_INCLUDE_ERROR_MESSAGE_IN_406_RESPONSE" type="SHOULD" toolTip="The body of a 406 response SHOULD include an error message in human readable plain text or HTML.">The body of the representation **SHOULD** include an error message in human readable plain text or HTML.</ApiStandard>
**<span class="smallcaps">Example Response</span>**

```bash
# Response that indicates the request failed due to the client not supporting any response formats provided by the API
HTTP/1.1 406 Not Acceptable
Content-Type: text/plain

This API does not support any of the requested content types specified
in the HTTP Accept header. Please see
<http://www.example.com/api/documentation/widgetservice> for details on
the supported content types.
```

The Accept header is required, however the _‘version’_ and _‘q’_ are
recommended as this will depend on a provider’s implementation and in
some cases technology choice.

### Content-Type (Request)

**<span class="smallcaps">Required</span>**

The Content-Type header is required for all requests that include a
request body i.e. <ApiStandard id="HNZAS_MUST_USE_CONTENT_TYPE_HEADER_FOR_POST_REQUEST" type="MUST" toolTip="POST requests MUST use the Content-type header." wrapper="span">POST</ApiStandard>, <ApiStandard id="HNZAS_MUST_USE_CONTENT_TYPE_HEADER_FOR_PUT_REQUEST" type="MUST" toolTip="PUT requests MUST use the Content-type header." wrapper="span">PUT</ApiStandard>, <ApiStandard id="HNZAS_MUST_USE_CONTENT_TYPE_HEADER_FOR_DELETE_REQUEST" type="MUST" toolTip="DELETE requests MUST use the Content-type header." wrapper="span">DELETE</ApiStandard>.

**<span class="smallcaps">Example</span>**

```json
# PUT <https://api.example.govt.nz/v2/vaccinators/33245>
Accept: application/json,version=1.\*
Content-Type: application/json
Authorization: Bearer x6TLB4JaomezC5rJ3CIl3KxxNinq

{
  "id": "33245",
  "names": {
    "firstName": "John",
    "middleName": "Howard",
    "lastName": "Doe",
    "salutation": "Mr John Doe",
    "title": "Mr"
  },
  "addresses": [
    {
      "type": "home",
      "address1": "1 Some Street",
      "address2": "Some Suburb",
      "address3": "Some City",
      "address4": null,
      "country": "New Zealand",
      "postcode": 1111
    },
    {
      "type": "business",
      "address1": "2 Work Street",
      "address2": "Work Suburb",
      "address3": "Work City",
      "address4": null,
      "country": "New Zealand",
      "postcode": 2222
    }
  ],
  "certifications": [
    {
      "id": "1a4rf54ee345",
      "type": "Some type",
      "provider": "University of life",
      "providerId": "0o9i8u7y6tt"
    },
    {
      "id": "8u7y6t5r4ee",
      "type": "Another type",
      "provider": "School xyz",
      "providerId": "1q2w3e4r5tt"
    }
  ]
}
```

### Authorization

**<span class="smallcaps">MUST</span>**

Most API requests will be authorised. The Authorization header should be used for this purpose and no other.

<ApiStandard id="HNZAS_MUST_USE_AUTH_TOKEN_FOR_IDENTITY_IF_NO_API_KEY" type="MUST" toolTip="If an API Key Header is not used, the Authorization token MUST be used to identify the API Consumer using an attribute within the token.">If an [API Key Header](#api-key-header) is not used, then the Authorization token **MUST** be used to identify the API Consumer using an attribute within the token.</ApiStandard>

Note that the Authorization header is not the best place for an API Key.

The Authorization header is comprised of a type and a token depending on
the authorization type.

Note that `Bearer` tokens can be opaque (understood only by the server) or client based JSON Web Tokens (JWT).

**<span class="smallcaps">Example</span>**

<!--- cspell:disable -->

```bash
# OAuth 2.0 Access Token (Opaque)
Authorization: Bearer x6TLB4JaomezC5rJ3CIl3KxxNinq

# OAuth 2.0 Access Token (Client Based)
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL2lkcC5leGFtcGxlLmNvbSIsImlhdCI6MTcwMDE2NzAxMCwiZXhwIjozODE0NDYxNDIwLCJhdWQiOiJodHRwczovL2V4YW1wbGUtYXBpLWNvbnN1bWVyLnNlY3Rvci5jb20iLCJzdWIiOiIwMDlhYTFkOC1kZjA1LTRlZjgtYjRiNi04MzQwMjY0Y2VlOTAiLCJHaXZlbk5hbWUiOiJKb2hubnkiLCJTdXJuYW1lIjoiRG9lIiwiRW1haWwiOiJqZG9lQGV4YW1wbGUuY29tIiwic2NvcGVzIjpbIlBhdGllbnQuciIsIkNhcmVQbGFuLnIiXX0.X4NQziHnQ68ygniCWoKFDcKHdy7DfrAYDUaJfKUB4cRZ7FPTq-64DxxhjcQz8GuJRkuEj9aYgMNCdY0m0BUqow

# HTTP Basic
Authorization: Basic c29tZXVzZXI6c29tZSBwYXNzd29yZA==
```
<!--- cspell:enable -->

### Accept-Encoding

**<span class="smallcaps">SHOULD</span>**

In some cases, especially where API responses are very large, it may be
worth compressing HTTP responses. (Note: where possible it is best to
avoid large payloads in API responses; however, this may not always be
possible.) An Accept-Encoding value of gzip instructs a provider that
supports HTTP compression that the consuming application supports
compressed responses.

**<span class="smallcaps">Example</span>**

`Accept-Encoding: gzip,deflate`

### API Key Header

**<span class="smallcaps">MUST</span>**

<ApiStandard id="HNZAS_MUST_SEND_API_KEY_IF_USED_FOR_IDENTITY" type="MUST" toolTip="An API key issued to a consuming application MUST be sent with every request if the API uses this mechanism to identify the client.">An API key issued to a consuming application **MUST** be sent with every request made to the API, if the API uses this mechanism to identify the client.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_USE_X_HEADERS" type="SHOULD_NOT" toolTip="'X-' notation headers SHOULD NOT be used as per RFC6648.">The name of the header is up to the API provider, but it **SHOULD NOT** be an `X-` prefixed header as this use is deprecated.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_USE_API_KEYS_IN_URIS" type="SHOULD_NOT" toolTip="API keys SHOULD NOT be passed in URIs as it is not considered best practice.">Sometimes API keys are passed in URIs; however, this is not considered best practice and **SHOULD NOT** be done.</ApiStandard>

**<span class="smallcaps">Example</span>**

`KeyID: pX680LyiKasUBWLuZJ8AVBHVQK03Ghtr`

### If-Modified-Since/If-None-Match

**<span class="smallcaps">SHOULD</span>**

The If-Modified header is a pre-condition header used to instruct a
client on the validity of the resource requested.

<ApiStandard id="HNZAS_SHOULD_CONSIDER_PRECONDITION_HANDLING" type="SHOULD" toolTip="Pre-condition If-Modified-Since/If-None-Match handling is not required but SHOULD be considered where appropriate.">Note that pre-condition handling is not required, but where appropriate **SHOULD** be considered.</ApiStandard>

Pre-condition control can be a complex topic so in some
cases the complexity may eclipse the value.

Conditional header standards are available in [Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests RFC9110](https://www.rfc-editor.org/rfc/rfc9110.html#name-conditional-requests)

A consuming application can specify an If-Modified-Since header with a
date and time. The server checks the resource to see the last modified
time. If the last modification was before the date/time specified in the
header, the server will respond with an HTTP 304 status code telling the
consuming application that the resource they requested has not changed
and therefore there is no need to return the full payload in the
response.

<ApiStandard id="HNZAS_SHOULD_IMPLEMENT_ETAG_WITH_IF_MODIFIED" type="SHOULD" toolTip="When using If-Modified headers, you SHOULD also implement ETag as discussed in the ETag section.">When using If-Modified headers you should also implement ETag as
discussed in the [ETag section](#etag-entity-tag).</ApiStandard>

**<span class="smallcaps">Example</span>**

```bash
# Request with If-Modified-Since and If-None-Match headers

If-Modified-Since: Wed, 18 Jun 2016 22:00:00 GMT
If-None-Match: "686897696a7c876b7e"
```

The If-None-Match header indicates to the provider the ETag for the
resource that it currently holds for that resource.

**<span class="smallcaps">Example Response</span>**

```bash
# Response that indicates the client’s current representation is still valid

HTTP/1.1 304 Not Modified
ETag: "686897696a7c876b7e"
Content-Length: 0
```

### Request tracking headers

**<span class="smallcaps">MUST</span>**

<ApiStandard id="HNZAS_MUST_USE_TRANSACTION_ID" type="MUST" toolTip="To support tracking of API requests, you MUST apply a transaction ID header for tracing requests throughout their lifecycle.">To support the tracking of API requests it is a good idea to apply a transaction ID header that will enable analysts to trace a request throughout its lifecycle.</ApiStandard> Note: there is no set naming standard for a
transaction ID header.

There are two common approaches to this: one is to request that the
consuming application generate a unique transaction ID and the provider
will capture it and respond with a corresponding correlation ID; the
second is to allow the provider to generate the transaction ID as close
to the edge of its domain as possible, and respond to the consuming
application with that transaction ID. In this case a consuming
application administrator or developer should capture and log that
transaction ID for audit purposes so that it can be relayed to agency
analysts if required.

Note that the Payments New Zealand API Centre Standard specifies the use of the `x-fapi-interaction-id` header - see [FAPI Protected Resource Provisions](https://openid.net/specs/openid-financial-api-part-1-1_0.html#protected-resources-provisions) and [FAPI Client Provisions](https://openid.net/specs/openid-financial-api-part-1-1_0.html#client-provisions)

**<span class="smallcaps">Example Request</span>**

```bash
# Request that includes a consuming application generated transaction ID

Interaction-Id: c188cb0e-1a09-4184-890c-0f0bb2255425
```

**<span class="smallcaps">Example Response</span>**

```bash

Interaction-Id: c188cb0e-1a09-4184-890c-0f0bb2255425
```

## Response Header Detail

Response headers are supplied by the API Provider:

### Content-Type (Response)

**<span class="smallcaps">MUST</span>**

<ApiStandard id="HNZAS_MUST_RETURN_CONTENT_TYPE" type="MUST" toolTip="The Content-Type header MUST be returned in the response, indicating the format type of the response content.">The Content-Type **MUST** be returned in the response, and indicate the format type the response content is in e.g. Content-Type: application/json.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_INCLUDE_API_VERSION_IN_CONTENT_TYPE" type="SHOULD" toolTip="The Content-Type header SHOULD include the API version that processed the request, e.g., application/json,version=1.1.">The Content-Type header **SHOULD** also include the version of the API that processed the request e.g. Content-Type: application/json,version=1.1.</ApiStandard>

### Location

**<span class="smallcaps">MUST (201, 30X)</span>**

<ApiStandard id="HNZAS_MUST_RETURN_LOCATION_WITH_201" type="MUST" toolTip="When a new resource is created (POST), the server MUST respond with a 201 Created status and a Location header indicating the URI of the new resource.">Where a new resource item has been created (POST), the server **MUST** respond with a 201 Created HTTP header and a Location header indicating the URI of the newly created resource item.</ApiStandard>

E.g: `Location: https://api.example.govt.nz/v1/alerts/198373`

<ApiStandard id="HNZAS_MUST_RETURN_LOCATION_WITH_30X" type="MUST" toolTip="A Location header MUST be returned by a server when it sends a 30X HTTP response, indicating a temporary or permanent redirection.">A Location header **MUST** also be returned by a server when it sends a 30X HTTP response, indicating a temporary or permanent redirection.</ApiStandard>

<ApiStandard id="HNZAS_MUST_USE_ABSOLUTE_LOCATION_HEADER" type="MUST" toolTip="A Location header MUST be absolute, e.g., Location: https://api.example.govt.nz/v1/alerts/198373.">A location header **MUST** be absolute e.g: `Location: https://api.example.govt.nz/v1/alerts/198373`.</ApiStandard>

Location headers should not be relative e.g: `Location: /v1/crown-property/198373`

### Content-Location

**<span class="smallcaps">SHOULD</span>**

<ApiStandard id="HNZAS_SHOULD_USE_CONTENT_LOCATION" type="MUST" toolTip="The Content-Location header SHOULD indicate the absolute location of the requested resource.">The Content-Location header **SHOULD** indicate the location of the requested resource and be an absolute link.</ApiStandard>

**<span class="smallcaps">Example</span>**

```json
# GET https://api.example.govt.nz/v1/crown-property/198373

Content-Type: application/json
Content-Location: https://api.example.govt.nz/v1/alerts/198373

{
  "id": 12345,
  "address1": "1 Some Street",
  "address2": "Some Suburb",
  "address3": "Some City",
  "address4": null,
  "country": "New Zealand",
  "postcode": 1111,
  "type": "outbreak"
}
```

### Cache-Control

**<span class="smallcaps">MUST</span>**

<ApiStandard id="HNZAS_MUST_USE_CACHE_CONTROL" type="MUST" toolTip="The Cache-Control header MUST be used to ensure APIs can perform at scale.">To ensure that the APIs you build can perform at scale, the Cache-Control header **MUST** be used.</ApiStandard>

The Cache-Control header is
only concerned with caching that occurs externally to the API layer.
Common examples may be client-side caching or caching within a Content
Delivery Network (CDN). This header should not be concerned with caching
mechanisms within the API layer such as response caches or object
caches, which require a different caching strategy.

The Cache-Control header is comprised of the following:

- **private|public**: This indicates if the cache is specific to the
  consumer or not – a setting of private will prevent the cache from
  being persisted in a public cache.

- **no-cache:** This instructs a cache to revalidate the resource
  every time**.**

- **no-store:** This instructs a cache not to store the response. It
  also ensures that no part of the request is stored too.

- **max-age:** This instructs the cache on expiry time. This can be
  used but it makes more sense to use the Expires header discussed
  below.

- **s-max-age:** Similar to the above, however it refers to a shared
  cache hence only relevant to CDNs and other intermediary caches.

- **must-revalidate:** This instructs the client to resend request
  headers and receive confirmation that the resource has not changed.

- **proxy-revalidate:** Similar to the above, however specific to
  shared caches.

**<span class="smallcaps">Example</span>**

```bash
# Example caching response
HTTP/1.1 200 OK
Date: Wed, 06 Jul 2016 21:14:52 GMT
Expires: Wed, 06 Jul 2016 22:14:52 GMT
Cache-Control: private,max-age=14400,must-revalidate
Content-Type: application/json
```

Care should be taken when using caches, especially shared or public
caches. In some cases it may be more prudent to use the no-cache
directive to ensure that content is not cached outside your network.
This does not rule out caching within your API layer. For more
information on API caching please see [Caching](./Caching).

HTTP Cache Control standards can be found in [Hypertext Transfer Protocol (HTTP/1.1): Caching RFC7234](https://tools.ietf.org/html/rfc7234)

### Expires

**<span class="smallcaps">SHOULD</span>**

<ApiStandard id="HNZAS_SHOULD_INCLUDE_EXPIRES_WITH_CACHE_CONTROL" type="SHOULD" toolTip="When using Cache-Control, you SHOULD include an Expires header in the response for backward compatibility.">When using Cache-Control you **SHOULD** include an Expires header in the response for backward compatibility.</ApiStandard>

### ETag (Entity Tag)

**<span class="smallcaps">SHOULD</span>**

The ETag header is a concurrency control header, and when in a response
it is a tag that the consuming application can use when making a
subsequent request to a resource. Note that pre-condition handling is
not required, but where appropriate, should be considered. Pre-condition
control can be a complex topic so in some cases the complexity may
eclipse the value.

```bash
# Response with ETag Header
# Consuming application would send this ETag in an If-None-Match request header

ETag: "686897696a7c876b7e"
```

## Custom X- HTTP Headers

<ApiStandard id="HNZAS_SHOULD_NOT_USE_X_HEADERS" type="SHOULD_NOT" toolTip="'X-' notation headers SHOULD NOT be used as per RFC6648.">X- notation headers have been deprecated as per [RFC6648](https://tools.ietf.org/html/rfc6648) and **SHOULD NOT** be used, if possible.</ApiStandard> This is because the `X-` name often became a standard, making the
`X-notation` inaccurate (e.g. `x-gzip` became `gzip`) and requiring support
for both the `X-` and the `non-X-` notation. Common uses of the `X-` headers
are examples such as the `X-HTTP-Method-Override` header or the
`X-Forwarded-*` headers.

If a custom header is required that is not available within the current HTTP standard then a custom header
can be used without the X- prefix - e.g. `X-Request-Id` could be simply `Request-Id`.
