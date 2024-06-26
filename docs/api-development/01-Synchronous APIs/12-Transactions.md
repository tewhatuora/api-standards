---
title: "Bulk APIs"
---

## Bulk API Handling

<ApiStandard id="HNZAS_SHOULD_NOT_IMPLEMENT_LARGE_BULK_PAYLOADS" type="SHOULD NOT" toolTip="APIs SHOULD NOT be designed for large bulk handling payloads."  wrapper='span'>APIs **SHOULD NOT** be designed for large payloads i.e. bulk handling for retrieving or uploading batches of data. APIs are geared towards stateless, usually synchronous, web-like Create, Read, Update, Delete (CRUD) requests for individual discrete data transactions.</ApiStandard> <ApiStandard id="HNZAS_MAY_USE_REQUEST_BUNDLING" type="MAY" toolTip="Bulk handling MAY be implemented by bundling multiple sub-requests into the same API invocation." wrapper='span'>However, bulk handling **MAY** be achieved through bundling multiple sub-requests into the same API invocation. This can help achieve logical grouping of similar requests, atomicity of transactions, and recoverability in event of errors.</ApiStandard>

When handling bulk requests, it is important to consider the
troubleshooting and recovery aspects of error handling. This includes
visibility of request progress and the ability to perform root cause analysis. To achieve this, it is
advisable that logging is performed on all sub-requests coming through an API, with accurate timestamping,
so that monitoring tools can visualise transaction progress. <ApiStandard id="HNZAS_MUST_USE_SUB_REQUEST_IDENTIFIERS" type="MUST" toolTip="Sub-request identifiers, as Request Headers, to be built into bulk API calls to ensure the sub-requests are traceable end-to-end.">It is **REQUIRED** that sub-request identifiers (See [Request Headers](./Headers#request-header-detail)), be built into bulk API calls to ensure the sub-requests are traceable end-to-end.</ApiStandard>

In some cases, it may be deemed appropriate to provide an asynchronous batch type capability using an
API. This would usually be implemented in a scenario where legacy system impact is a concern. An
example of this could be a bulk creation of person records in a database based on a
batch event in a consuming legacy application. In such a scenario it
would be preferable for the consuming application to treat each person
as a unique event and to POST to a person API for each new unique
resource. Whilst this may seem like an unnecessary overhead, by
individualising the transactions each success or error scenario can be
handled in its own right, and the consumer can be informed of their
transaction status. If this is not possible, due to some system
restriction, it is possible to asynchronously POST multiple person
details to an API. This type of interaction should not be attempted
synchronously as large batches will tie up HTTP threads and in some
cases require client/server timeout control.

## Transactions vs Batches

Bulk APIs can be transaction-based or batch-based and there are some key differences between them. With transaction APIs, the sub-requests are treated as a single transaction. In the event of a failure of a sub-request, it is typical for all sub-requests to be rolled back to preserve atomicity of the transaction.

With batch APIs, the sub-requests are treated as a collection of operations without dependency on any other sub-request in the request. As such, in the event of a failure with one sub-request, it is typical to continue processing other sub-requests.

## Transactions and Temporary IDs

<ApiStandard id="HNZAS_MUST_USE_SUB_REQUEST_IDENTIFIERS" type="REQUIRED" toolTip="Sub-request identifiers, as Request Headers, to be built into bulk API calls to ensure the sub-requests are traceable end-to-end.">Because sub-requests within a transaction are, by definition, tightly linked it's a common use case for the identifiers or data from a prior request to be used in a subsequent sub-request. In this case, the sub-request identifier **SHOULD** be used for references in other sub-requests.</ApiStandard>

### Examples

The following is an example of a singleton create person request:

```json
# POST https://api.example.govt.nz/v1/people
Accept: application/json,version=1.\*

{
  "names": {
    "firstName": "John",
    "middleName": "Howard",
    "lastName": "Doe",
    "salutation": "Mr John Doe",
    "title": "Mr"
  }
}
```

This is an example of a bulk transaction person create API call:

```json
POST https://api.example.govt.nz/people/bulk-import
Accept: application/json,version=1.\*

{
  "type":"transaction",
  "people": [
    {
      "bulkId": 1,
      "names": {
        "firstName": "John",
        "middleName": "Howard",
        "lastName": "Doe",
        "salutation": "Mr John Doe",
        "title": "Mr"
      },
      "reportsToId":"",
    },
    {
      "bulkId": 2,
      "names": {
        "firstName": "Mary",
        "middleName": "Pauline",
        "lastName": "Smith",
        "salutation": "Ms Mary Smith",
        "title": "Ms"
      },
      "reportsToId": 1,
    },
    {
      ".....lots more people here.....": "..."
    }
  ]
}
```

This is an example of a bulk batch person create API call:

```json
POST https://api.example.govt.nz/people/bulk-import
Accept: application/json,version=1.\*

{
  "type":"batch",
  "people": [
    {
      "batchId": 1,
      "names": {
        "firstName": "John",
        "middleName": "Howard",
        "lastName": "Doe",
        "salutation": "Mr John Doe",
        "title": "Mr"
      },
      "reportsToId":"95dbbf93-5829-46ba-9021-2545a1da3aa5"
    },
    {
      "batchId": 2,
      "names": {
        "firstName": "Mary",
        "middleName": "Pauline",
        "lastName": "Smith",
        "salutation": "Ms Mary Smith",
        "title": "Ms"
      },
      "reportsToId":"95dbbf93-5829-46ba-9021-2545a1da3aa5"
    },
    {
      ".....lots more people here.....": "..."
    }
  ]
}
```

Note that the requests look very similar however the response for the API is the key differentiator.

**<span class="smallcaps">Transaction API Response</span>**

```json
HTTP/1.1 400 BadRequest
Content-Type: application/json

{
    "items": [
        { "bulkId": 1, "id": 1, "status": 201, errors: [] },
        { "bulkId": 2, "id": 2, "status": 400, errors: [{
          "code": 400,
          "description": "Request contains invalid data....."
        }] }
    ]
}

```

**<span class="smallcaps">Batch API Response</span>**

```json
HTTP/1.1 207 Multi-Status
Content-Type: application/json

{
    "items": [
        { "batchId": 1, "id": 1, "status": 201, errors: [] },
        { "batchId": 1, "id": 2, "status": 400, errors: [{
          "code": 400,
          "description": "Request contains invalid data....."
        }] }
    ]
}
```

As can be seen above the transaction API request returns a `400 - BadRequest` if **any** of the sub-requests in the request fail. In this scenario it is the API Provider's responsibility to manage the integrity of the resources. The API Provider returns information indicating that the entire bulk job has failed as well as enough data to allow the API Consumer to find and fix the erroneous components of the payload. The API Consumer is required to resubmit the entire request once the erroneous record(s) are fixed.

In the batch scenario some resources in the payload were processed successfully and some were not. In this scenario it is the API Consumers responsibility to maintain the integrity of the resources. In this hypothetical example the API Consumer would be required to resubmit `"batchId":2` as this was not processed however the other transaction was.

Another point to note within the example is the differing use of sub-request identifiers. Within the transaction example, `"bulkId":1` is used as a reference in the `"reportsToId"` for the second person. This is telling the API Producer the relationship between the two records even though the identifier of the first sub-request is not known. In practice the server will replace the sub-request identifier with the server-side resource identifier once created. In the batch example, the `"reportsToId"` is the server issued identifier and is therefore required to be known ahead of time.

## Asynchronous Transactions

<ApiStandard id="HNZAS_SHOULD_SUPPORT_JSON_SEQ_FOR_LARGE_PAYLOADS" type="SHOULD" toolTip="For large payloads, the API SHOULD support the 'application/json-seq' Content-Type to allow asynchronous processing." wrapper='span'>In many cases, where bulk processing is required, the intended payloads may be too large for timely synchronous processing. In these scenarios, it is appropriate for the API to support the `application/json-seq` Content-Type. When an API Consumer sends this content type it informs the API that the JSON payload provided is a sequenced data set.</ApiStandard> <ApiStandard id="HNZAS_SHOULD_PROVIDE_JSON_SEQ_STATUS_IN_LOCATION" type="SHOULD" toolTip="The API SHOULD respond asynchronously to a request using 'application/json-seq' with a 'Location' header for transaction status." wrapper='span'>The API can process each record individually and respond asynchronously to the client with a `Location` header indicating the location of the transaction process detail/status.</ApiStandard>
