---
title: "Error Handling"
---



Error handling is important because API consumers see the API as a black
box, and when an error occurs they need to know how to handle it. Hence
error responses need to be informative yet avoid information leakage
about the internals of the back-end system. Errors should be handled in
both a human and machine-consumable way. When an error occurs, the
response body **MUST** contain:

- The HTTP status code
- An API-specific error code, which API support staff will be able to look up to identify what has gone wrong
- A human readable error message (possibly including selective technical details if the API is a development/test release for developer consumption only)

## HTTP Status Codes

RESTful APIs **MUST** always use the standard HTTP error responses when an
error occurs, but different codes may be pertinent depending on the HTTP
verb being used and the quantity of data being retrieved (e.g., single
item vs. list/collection of data).

The following tables give an example of good practice use of HTTP error codes:

### GET Response Status Codes

|**Code**|**Meaning**|**Description**|
|:--:|:--:|:--|
|200|OK|The request was successful, and the response body contains the representation requested|
|302|FOUND|A common redirect response; you can GET the representation at the URI in the Location response header|
|304|NOT MODIFIED|Your client's cached version of the representation is still up to date|
|401|UNAUTHORIZED|The supplied credentials, if any, are not sufficient to access the resource|
|404|NOT FOUND|The requested representation was not found. Retrying this request is unlikely to be successful|
|429|TOO MANY REQUESTS|Your application is sending too many simultaneous requests|
|500|SERVER ERROR|An internal server error prevented return of the representation response|
|503|SERVICE UNAVAILABLE|We are temporarily unable to return the representation. Please wait and try again later|

### POST or PUT Response Status Codes

|**Code**|**Meaning**|**Description**|
|:--:|:--:|:--|
|200|OK|The request was successful, and the resource was updated. The response body contains the updated representation|
|201|CREATED|The request was successful, a new resource was created, and the response body contains the representation|
|204|OK - NO CONTENT|The request was successful, but no content is returned in the response. In reality this is seldom used for REST APIs and more typically for process APIs. Should include a `Location` header indicating the location of an associated relevant resource|
|207|MULTI STATUS|The HTTP 207 Multi-Status response code indicates that there might be a mixture of responses. See [Transactions](./Transactions)|
|400|BAD REQUEST|The data given in the POST or PUT failed validation. Inspect the response body for details|
|401|UNAUTHORIZED|The supplied credentials, if any, are not sufficient to create or update the resource|
|404|NOT FOUND|The endpoint that the API Consumer is attempting to create or update does not exist. Retrying this request is unlikely to be successful|
|405|METHOD NOT ALLOWED|You can't POST or PUT to the resource|
|422|UNPROCESSABLE CONTENT|The server understands the requests content and syntax however it is unable to process the instruction. Retrying this request will not succeed - the request must be modified|
|429|TOO MANY REQUESTS|Your application is sending too many simultaneous requests|
|500|SERVER ERROR|We couldn't create or update the resource. Please try again later|

### DELETE Response Status Codes

|**Code**|**Meaning**|**Description**|
|:--:|:--:|:--|
|204|OK|The request was successful; the resource was deleted|
|401|UNAUTHORIZED|The supplied credentials, if any, are not sufficient to delete the resource|
|404|NOT FOUND| |
|405|METHOD NOT ALLOWED|You can't DELETE the resource|
|429|TOO MANY REQUESTS|Your application is sending too many simultaneous requests|
|500|SERVER ERROR|We couldn't delete the resource. Please try again later|

Where a consumer attempts to call a non-existent API end point, respond
with a **501 Not Implemented** status code.

## API-Specific Error Code

Error responses need to supply enough information to allow the API
consumer to react appropriately to the error, yet not give away too
much. But when a critical error occurs it is important for the API
provider to be able to trace the root cause and fix it as soon as
possible.

One way of achieving this is to return an API-specific error code in the
response to consumer. When the consumer reports the error to the API
support team, the consumer can relate the associated API-specific code.
The support team can then look this code up and ascertain exactly what
has gone wrong and who needs to address it.

## Human-Readable Error Message

The human readable error message should be as informative as is useful
to an end customer, without offering too many technical details (e.g.
"An account with this ID already exists”).

It is important to avoid revealing system information in the human
readable response, such as composition of the backend system (e.g.
component names), as this informs malicious consumers as to what
vulnerabilities and back doors to look for. It is also important not to
confirm or deny sensitive information, such as username in a
username/password combination, as this informs potential attackers which
criteria they have got correct.

In non-production instances of the API it may be appropriate to offer
more verbose error messages with some technical detail (e.g. "Body
should be a JSON object”). However, it is still recommended not to
reveal too much about the internal systems which underpin the API, as
non-production systems still reflect a lot of the composition of
production.

## Error Schema

API Providers **MUST** document their errors in a machine readable schema. This **MUST** be published to API Consumers in the form of an [OpenAPI specification](./API%20Artefacts). See the [example API specification default error](../../api-specifications/example-agency-specification#tag/get-customer-details/paths/~1customers~1%7BcustomerId%7D/get) for an example.

**<span class="smallcaps">Examples</span>**

```json
# HTTP Response Code 400
{
  "errors": [
    {
      "code": 20001,
      "description": "Request validation failed - retrying the request will not succeed. Please contact support"
    },
    {
      "code": 80001,
      "description": "A more detailed description of the error if appropriate"
    }
  ],
  "_links": [
    {
      "href": "<https://support.example.govt.nz>",
      "rel": "support"
    }
  ]
}
```

```json
# HTTP Response Code 500
{
  "errors": [
    {
      "code": 20002,
      "description": "Unhandled exception - retrying the request may succeed."
    },
    {
      "code": 80002,
      "description": "A more detailed description of the error if appropriate. This is a server error so it is important not to bubble the content back to the consumer - e.g. SQL Exception"
    }
  ],
  "_links": [
    {
      "href": "<https://support.example.govt.nz>",
      "rel": "support"
    }
  ]
}

```

```json
# HTTP Response Code 429
{
  "errors": [
    {
      "code": 20003,
      "description": "Too many requests."
    },
    {
      "code": 80002,
      "description": "A more detailed description of the error if appropriate. Do not reveal the throttling configuration of that API as that will inform malicious actors of the parameters that they need to meet in order to circumvent the protection."
    }
  ],
  "_links": [
    {
      "href": "<https://support.example.govt.nz>",
      "rel": "support"
    }
  ]
}
```
