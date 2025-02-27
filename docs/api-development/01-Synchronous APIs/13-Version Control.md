---
title: "Versioning APIs"
---



## Semantic Versioning

Many software applications utilise [semantic versioning strategies](https://semver.org/). Consider the following version number `3.2.5`.

- `3` indicates the **MAJOR** version - any changes to this indicates that changes implemented are **BREAKING** for API Consumers
- `2` indicates the **MINOR** version - any changes to this indicates that there has been additional functionality added to the API however they are backward compatible therefore **NON-BREAKING** and there is no impact to API Consumers
- `5` indicates the **PATCH** version - any changes to this indicates that there has been a patch, usually to fix a bug or remediate a security vulnerability in the API. PATCH updates are **NON-BREAKING** and do not introduce any new functionality.

## API Version Control Mechanisms

There are two main API versioning methodologies commonly used. There are
positives and negatives to both approaches and a large amount of debate
over which is the most "RESTful”. Below is a description of each methodology however, for the purposes of this standard, only the URI (Path) based versioning approach is supported.

### URI (Path) Versioning (Supported)

<ApiStandard id="HNZAS_MUST_USE_URL_VERSIONING" type="MUST" toolTip="For URL-based versioning, the URI MUST include /v{N} with the major version (N) and 'v' as a prefix.">For URL-based versioning the [Uniform Resource Identifier (URI)](./URIs) **MUST** include `/v{N}` with the major version (N) and v as a prefix.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_INCLUDE_MINOR_VERSION" type="SHOULD NOT" toolTip="API Providers SHOULD NOT include minor version numbers in the URI. Only the MAJOR version should be represented.">API Providers **SHOULD NOT** include minor version numbers. Considering semantic version description above, only the **MAJOR** version should be represented in the URI.</ApiStandard>

**<span class="smallcaps">Example</span>**

```bash
# Query MAJOR version of version 1 of the search API

GET https://api.example.govt.nz/people/v1/search?first-name=John&last-name=Smith&page-size=10

# Query MAJOR version 2 of the search API

GET https://api.example.govt.nz/people/v2/search?first-name=John&last-name=Smith&page-size=10
```

<ApiStandard id="HNZAS_MUST_INDICATE_MAJOR_VERSION" type="MUST" toolTip="Responses MUST indicate at least the MAJOR version of the API that processed the request, using the Content-Type response header.">The response **MUST** still indicate, at least, the **MAJOR** version of the API that processed the request. This can be done using the [**Content-Type**](./Headers#content-type-response) response header.</ApiStandard>

```bash
Content-Type: application/json; version=v3.2.5
```

In some scenarios there may be some benefit to API Providers to return a customer header that can be used, usually by test applications, to indicate software lifecycle changes. For example, during the lifecycle process there may be a number of alpha or beta releases of the software and test clients could benefit this understanding.

```bash
ORG-CUSTOM-VERSION-HEADER: v3.3.0-alpha
```

### Accept Header Versioning (Not Currently Supported)

This is usually considered the most RESTful way to version APIs because
the resource path remains "pure” and it is possible to provide more
version flexibility for API Consumers. It is, however, technically more
difficult to implement, and in many cases commercial API
management/gateway products do not support or work well with this
approach.

Header based versioning is usually performed using the Accept header
where an API Consumer requests an API version as defined in an
Accept header. Wildcards (\*) are used by the consuming application to
indicate acceptance of the latest major, minor or patch version of an API.

**<span class="smallcaps">Example</span>**

```bash
# Get details for provider id 123435 – latest minor/patch version of the API

GET <https://api.example.govt.nz/providers/12345>
Accept: application/json, version=1.\*
Host: api.example.govt.nz

# Get details for provider id 123435 –version 1.1.2 of the API

GET <https://api.example.govt.nz/providers/12345>
Accept: application/json, version=1.1.2
Host: api.example.govt.nz

# Get details for provider id 123435 – latest version of the API

GET <https://api.example.govt.nz/providers/12345>
Accept: application/json, version=\*
Host: api.example.govt.nz
```

The response should include the version of the API that responded to the
client request in the **Content-Type** header.

**<span class="smallcaps">Example</span>**

`Content-Type: application/json,version=1.1.2`

## When to Version

<ApiStandard id="HNZAS_SHOULD_VERSION_ON_BREAKING_CHANGE" type="SHOULD" toolTip="An API SHOULD be versioned when a change is considered breaking." wrapper='span'>Simply put, an API **SHOULD** be versioned when a change is considered breaking.</ApiStandard> One of the benefits of an API is that, if it is well designed,
there should be fewer breaking changes. However, legislative changes may enforce a new version
of an API and deprecation of all previous versions.

### Breaking Changes

A change is a breaking change if any API Consumer requires
changes to work with the new version. i.e. the new version will not
successfully process messages provided by existing consumers. A breaking
change should be considered as a major version change e.g. 1.3 to 2.0.

Examples of breaking changes include:

- The **removal** of any property from the response representation

- Changing the **datatype** for an **existing property**, or a change from
  **optional** to **required**

- The removal of any resource, or HTTP Verb support

- A change to the way errors are handled

- Any change to existing resource URIs

### Non-Breaking Changes

A change is non-breaking if any message that would have been processed
by the previous version will be successfully processed by the new
version (i.e. backwards compatible). This will enable an existing
consumer of the previous version to work with the new version without
requiring modification. A non-breaking change should be considered as a
minor version change e.g. 1.1 to 1.2.

Such changes include:

- The addition of new properties to the JSON representation

- The addition of new resources

- The addition of support for new HTTP Verbs (new operations) on
  existing resources

- Support for new **optional** custom headers, e.g. for request tracing

## Software Configuration Management

It is important to remember that version control is more than just
versioning the resource. An API will inherently have associated code and
artefacts. <ApiStandard id="HNZAS_SHOULD_MANAGE_API_ARTEFACTS_IN_SCM" type="SHOULD" toolTip="All components of an API comprising a logical artefact SHOULD be stored and managed in an SCM system." wrapper='span'>Consider what comprises an API and include these as a logical artefact stored and managed in a source code management (SCM) system. It is a good idea to try and capture all components in a format that can be controlled by SCM.</ApiStandard>

An API artefact should, where possible, comprise the following:

- Any API code
- API specification (OpenAPI)
- Unit tests
- Integration tests
- Developer documentation
- Continuous integration (pipeline) support files.

## Resource Version Control

As discussed in [HTTP Verbs - PUT](./HTTPVerbs#put) there are some scenarios in REST where an API may be vulnerable to race conditions. This is a situation where an API Consumer and an API Provider become out of sync with regards to their expectations of a resource. <ApiStandard id="HNZAS_MUST_IMPLEMENT_CONCURRENCY_MECHANISM" type="MUST" toolTip="API Providers MUST implement either optimistic or pessimistic concurrency.">There are two common ways of handling this situation and, in the context of these standards, API Providers **MUST** implement one of the two concurrency mechanisms listed below.</ApiStandard>

| Feature | Optimistic Concurrency | Pessimistic Concurrency |
|:---|:---|:---|
| Locks resources before updates | No | Yes |
| Checks for conflicts before updates | Yes | No |
| Performance when conflicts are rare | Good | Bad |
| Performance when conflicts are common | Bad | Good |
| Deadlocks | Fewer | More |

Optimistic and pessimistic concurrency differ in their strategies for preventing data inconsistencies when multiple API consumers or health sector participants attempt to modify the same resource at the same time.

### Optimistic Concurrency

**Assumption:** Concurrency conflicts are rare, and most requests will succeed without conflicting with others.
**Mechanism:** No explicit locking is used before modifying data.
**Validation:** When a request arrives, the server checks if the data has changed since the client retrieved it (e.g., using version numbers or timestamps).
**Conflict Resolution:** If the data has changed, the server returns a conflict error, and the client must retry the operation with the updated data.

#### Optimistic Concurrency Advantages

- Higher performance: No locking overhead, so potentially faster response times.
- Scalability: Handles concurrent requests better in scenarios with low conflict rates.
- Simplicity: Easier to implement for developers.

#### Optimistic Concurrency Disadvantages

- Data inconsistencies can occur if conflicts are not handled properly.
- Requires additional logic for conflict resolution on the server and client.
- May not be suitable for highly contested resources.

### Pessimistic Concurrency

**Assumption:** Concurrency conflicts are frequent, and data needs protection from simultaneous modifications.
**Mechanism:** Explicit locking is used before modifying data.
**Locking:** A client acquires a lock on the resource before making changes. Other clients attempting to access the resource are blocked until the lock is released.
**Validation:** Locking ensures data consistency during the locked period.
**Conflict Resolution:** No conflicts can occur as data is locked during modifications.

#### Pessimistic Concurrency Advantages

- Strong consistency guarantees: No risk of data inconsistencies.
- Predictable behavior: Easier to reason about the state of data.
- Suitable for highly contested resources.

#### Pessimistic Concurrency Disadvantages

- Lower performance: Locking overhead can lead to slower response times and reduced concurrency.
- Scalability challenges: Locking can become a bottleneck in high-traffic scenarios.
- Complexity: Requires additional infrastructure and logic for managing locks.
- Choosing the Right Approach:

The best approach for your API depends on several factors:

- Frequency of concurrent access: If conflicts are rare, optimistic concurrency might be sufficient.
- Acceptable data inconsistency risk: How critical is it to avoid data inconsistencies?
- Performance requirements: Can your system handle the overhead of pessimistic locking?
- Complexity considerations: How easy is it to implement and maintain pessimistic locking in your API?

<ApiStandard id="HNZAS_SHOULD_PREFER_OPTIMISTIC_CONCURRENCY" type="SHOULD" toolTip="APIs SHOULD implement optimistic concurrency." wrapper='span'>Typically, optimistic concurrency is preferred for APIs due to its simplicity and scalability.</ApiStandard>
 <ApiStandard id="HNZAS_MAY_USE_PESSIMISTIC_CONCURRENCY" type="MAY" toolTip="Pessimistic concurrency MAY be used where data consistency is paramount and conflicts are frequent.">However, pessimistic concurrency is necessary for scenarios where data consistency is paramount and conflicts are frequent.</ApiStandard>
