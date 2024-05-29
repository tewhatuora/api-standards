---
title: "Message Types"
---

The types of messages in Asynchronous APIs can vary, and the correct choice will depend on the particular use case desired to be achieved.

Event-driven architectures will typically publish domain events or integration events. Domain events are usually private events that are not published for use by external systems - instead they are used for purposes such as communication between microservices. Integration events are intended for consumers external to the API Provider domain and should contain data that external domains can understand and use.

When publishing integration events there is a balance to be achieved between publishing too much, or too little information in them. It can be easy too accidentally expose too much information, or information that contains private implementation details.

## Message body

The message body contains the detail of the event we want to publish.

### Event notification (Thin events)

This message type is often referred to as a `thin` message - as it will contain no data or the minimal amount of data required to inform a consumer of an event that has occurred. If any of the consumers of the message are interested to know further details about this particular event, they are able to contact the API Provider for more information (typically this will be using a REST or FHIR API). These message types are valuable when there is a need to notify other parties that a particular event has taken place, however the API Consumer may not need to know all the details right away.

<ApiStandard id="HNZAS_MAY_INCLUDE_THIN_POINTER" type="MAY" toolTip="Asynchronous thin events MAY include a pointer." >Thin events **MAY** include a pointer (URL or similar identifier) back to the specific resource that initiated the notification.</ApiStandard>

<ApiStandard id="HNZAS_MUST_ALLOW_CHANGE_ONLY_SUBSCRIPTION" type="MUST" toolTip="Asynchronous thin events MUST ensure the data source allows subscribers to query specifically for the resources that have changed.">If a pointer is not supplied, implementations **MUST** ensure the data source allows subscribers to query specifically for the resources that have changed. An example based on time factors would be to query for all resources where `lastUpdatedTime > {last query time}`.</ApiStandard>
Example event notification:

```json
{
  "specversion": "1.0",
  "type": "hospital_admission",
  "source": "citywgtn",
  "subject": "NHI123",
  "id": "5a5c049a-adbc-11ee-a506-0242ac120002",
  "time": "2023-11-05T17:31:00Z",
  "data": {
    "url": "https://example.com/fhir/Encounter/5a5c049a-adbc-11ee-a506-0242ac120002"
  }
}
```

The payload above notifies that a `hospital_admission` has occurred for Patient `NHI123`.

**Characteristics:**

- Minimal information is being transferred which can reduce risk of unauthorised information disclosure
- Less risk of data being out of sync, as the API Consumer fetches the latest data if it is required
- API Consumers may need to fetch the data outside of the Async API if they need to know more about the event
- Smaller contracts and data schemas allow for easier future changes

:::info
A key design consideration for thin events is the potential for traffic to data sources to become volatile as the ecosystem scales. This volatility arises from the likelihood that all subscribers will simultaneously trigger automated workflows to access the data. Ensure that the data source has the correct scale and API gateway policies like Spike Control to take this into account.
:::

<ApiStandard id="HNZAS_SHOULD_USE_THIN_MESSAGES_IN_LOW_TRUST" type="SHOULD" toolTip="Asynchronous thin message types SHOULD be used if the API Consumer/s may not be fully trusted or if re-authentication of the client is mandatory" >This message type **SHOULD** be used if the API Consumer/s may not be fully trusted or if re-authentication of the client is mandatory, which is common when using the [Pub/Sub Pattern](./Async%20Patterns/02-PubSub.md).</ApiStandard>

### Event-Carried State Transfer (Thick events)

This message type is used when you want consumers to have information about the event that has occurred, without them needing to contact the source system for more information. These event types typically contain sufficient current event/domain data necessary to act upon the event without the need to contact the source system, hence the colloquial name "thick events". As they carry the state of a particular point in time, this message type may also be referred to as a "fact" event.

Example event carried state transfer message:

```json
{
  "specversion": "1.0",
  "type": "hospital_admission",
  "source": "citywgtn",
  "subject": "NHI123",
  "id": "5a5c049a-adbc-11ee-a506-0242ac120002",
  "time": "2023-11-05T17:31:00Z",
  "data": {
    "patient": {
      "given": ["John", "Michael"],
      "family": "Doe",
      "id": "NHI123"
    },
    "details": {
      "admissionDatetime": "2024-01-05T19:39:00Z",
      "reason": "Trouble breathing while at home",
      "facility": "citywgtn"
    }
  }
}
```

**Characteristics:**

- Stateful events - all of the event data is contained in the message
- When multiple events for the same subject are processed in order, the consuming application must consider that it may not be using the most up to date data, due to processing delay
- Greater care is required with event versioning and schema changes
- API Consumers are fully decoupled from the API Provider, as they do not need to interact with the Provider directly (they already have all of the data)
- Data is eventually consistent, meaning data may not be perfectly synchronised, but will ultimately become consistent

This message type may be used when it is undesirable or not possible for the API Consumer to perform additional REST API calls back to the Message Producer. A thick event is more suited to an integration using the [Point to Point](./Async%20Patterns/03-PointToPoint.md) pattern where the API Consumer is known and trusted.

### Delta events

A delta event details the changes between one state and another. The contents of a delta event typically includes information about the fields that have changed, the new values for those fields, and may also include the reason for the change. Delta events do not include information about data that hasn’t changed.

Example delta event message:

```json
{
  "specversion": "1.0",
  "type": "patient_nextofkin_updated",
  "source": "citywgtn",
  "subject": "NHI123",
  "id": "5a5c049a-adbc-11ee-a506-0242ac120002",
  "time": "2023-11-05T17:31:00Z",
  "data": {
    "oldNextOfKin": {
      "given": ["John", "Michael"],
      "family": "Roberts",
      "relation": "Spouse"
    },
    "currentNextOfKin": {
      "given": ["Kaia"],
      "family": "Nash",
      "relation": "Mother"
    }
  }
}
```

**Characteristics:**

- Details the change between prior and current states
- Can reduce complexity in API Consumers needing to find out what state change has occurred, if they do not have knowledge of the prior state themselves

Delta Events may be used when it is desired to reduce processing by the API Consumer/s, or to reduce the size of message payloads (when compared to a thick event).

### FHIR Subscriptions

The Subscriptions Framework in FHIR is a mechanism used to send event notifications from a FHIR API Provider to API Consumers based on activity occurring on resources in the server.

#### FHIR R4B Subscriptions

When using FHIR R4B Subscriptions, there are two possible message types sent in the notification payload, which is selected when creating the `Subscription` resource:

- No payload - an empty body, where API Consumers must query the FHIR Server to retrieve the updates from the FHIR Server using search parameters `&_since=:last` (where `:last` is replaced by the time at which the API Consumer last checked). This message type is configured when the Subscriber omits the `Subscription.channel.payload` [attribute](https://www.hl7.org/fhir/r4b/subscription-definitions.html#Subscription.channel.payload). This is a [thin event](#event-notification-thin-events).
- a FHIR Resource - the full FHIR resource is sent, similar to an update operation. This is when the subscriber sets the `Subscription.channel.payload` attribute to MIME types of `application/fhir+json` or `application/fhir+xml`. This is a [thick event](#event-carried-state-transfer-thick-events).

**Example using the full FHIR Resource:**

```json
{
  "resourceType": "Patient",
  "identifier": [
    {
      "use": "usual",
      "value": "12345"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Chalmers",
      "given": [
        "Peter",
        "James"
      ]
    },
    {
      "use": "usual",
      "given": [
        "Jim"
      ]
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "deceasedBoolean": false
}
```

#### FHIR R5 Subscriptions

When using **FHIR R5 Subscriptions**, the message contains a FHIR Bundle resource of type `subscription-notification`. There are three options for what is contained within the Bundle which is selected when creating the `Subscription`:

- [empty](#empty)
- [id-only](#id-only-example)
- [full-resource](#full-resource)

#### Empty

In this message type, the FHIR API Consumer receives an empty notification, where they will now query the FHIR server (generally using search parameters such as `_lastUpdatedAt`) to retrieve the new resources. This mitigates many security concerns by both removing most PHI from the notification and allows servers to consolidate authorisation and authentication logic.

```json
{
  "resourceType" : "Bundle",
  "id" : "9601c07a-e34f-4945-93ca-6efb5394c995",
  "type" : "subscription-notification",
  "timestamp" : "2020-04-17T10:24:13.1882432-05:00",
  "entry" : [{
    "fullUrl" : "urn:uuid:b21e4fae-ce73-45cb-8e37-1e203362b2ae",
    "resource" : {
      "resourceType" : "SubscriptionStatus",
      "id" : "b21e4fae-ce73-45cb-8e37-1e203362b2ae",
      "status" : "active",
      "type" : "event-notification",
      "eventsSinceSubscriptionStart" : "2",
      "notificationEvent" : [{
        "eventNumber" : "2",
        "timestamp" : "2020-04-17T10:20:00.0000000-05:00"
      }],
      "subscription" : {
        "reference" : "http://example.org/FHIR/R5/Subscription/123"
      }
    }
  }]
}
```

#### Id-only example

In this message type, the notification contains the resource type and id `Encounter/2`. This allows API Providers to consolidate authorization and authentication logic, while removing the need for expensive queries by API Consumers.

```json
{
  "resourceType" : "Bundle",
  "id" : "3945182f-d315-4dbf-9259-09d863c7e7da",
  "type" : "subscription-notification",
  "timestamp" : "2020-04-17T10:24:13.1882432-05:00",
  "entry" : [{
    "fullUrl" : "urn:uuid:c144782b-da2f-4125-a9e2-9fa4b9085a40",
    "resource" : {
      "resourceType" : "SubscriptionStatus",
      "id" : "c144782b-da2f-4125-a9e2-9fa4b9085a40",
      "status" : "active",
      "type" : "event-notification",
      "eventsSinceSubscriptionStart" : "2",
      "notificationEvent" : [{
        "eventNumber" : "2",
        "focus" : {
          "reference" : "http://example.org/FHIR/R5/Encounter/2"
        }
      }],
      "subscription" : {
        "reference" : "http://example.org/FHIR/R5/Subscription/123"
      },
      "topic" : "http://example.org/FHIR/R5/SubscriptionTopic/admission"
    }
  },
  {
    "fullUrl" : "http://example.org/FHIR/R5/Encounter/2",
    "request" : {
      "method" : "PUT",
      "url" : "Encounter/2"
    },
    "response" : {
      "status" : "201"
    }
  }]
}
```

#### Full resource

In this message type, the full FHIR resource targeted by the notification is sent in the payload.

```json
{
  "resourceType" : "Bundle",
  "id" : "00b99077-2bda-436e-98cc-a4f65d6c2fe0",
  "type" : "subscription-notification",
  "timestamp" : "2020-04-17T10:24:13.1882432-05:00",
  "entry" : [{
    "fullUrl" : "urn:uuid:d195d9b8-6f78-4d71-9d22-3c1a923bfea5",
    "resource" : {
      "resourceType" : "SubscriptionStatus",
      "id" : "d195d9b8-6f78-4d71-9d22-3c1a923bfea5",
      "status" : "active",
      "type" : "event-notification",
      "eventsSinceSubscriptionStart" : "2",
      "notificationEvent" : [{
        "eventNumber" : "2",
        "focus" : {
          "reference" : "http://example.org/FHIR/R5/Encounter/2"
        }
      }],
      "subscription" : {
        "reference" : "http://example.org/FHIR/R5/Subscription/123"
      },
      "topic" : "http://example.org/FHIR/R5/SubscriptionTopic/admission"
    }
  },
  {
    "fullUrl" : "https://example.org/FHIR/R5/Encounter/2",
    "resource" : {
      "resourceType" : "Encounter",
      "id" : "2",
      "meta" : {
        "versionId" : "1",
        "lastUpdated" : "2019-08-07T10:49:22Z"
      },
      "status" : "in-progress",
      "subject" : {
        "reference" : "Patient/ABC"
      }
    },
    "request" : {
      "method" : "PUT",
      "url" : "Encounter/2"
    },
    "response" : {
      "status" : "201"
    }
  }]
}
```

<ApiStandard id="HNZAS_SHOULD_CONSIDER_PHI_SECURITY_IN_FHIR_SUBSCRIPTIONS" type="SHOULD" toolTip="Asynchronous FHIR R5 Subscriptions requests SHOULD consider both ease of processing and security of PHI." >When deciding which payload type to request, systems **SHOULD** consider both ease of processing and security of PHI. To mitigate the risk of information leakage, systems **SHOULD** use the minimum level of detail consistent with the use case. In practice, id-only provides a good balance between security and performance for many real-world scenarios.</ApiStandard>

Note that this is not an exhaustive list of all possible message types, but these are considered most relevant to the use cases in the New Zealand Health Sector.

## Message header fields

Message headers, referred to as message metadata in some implementations, is used to store information about the message. Message headers enable Message Broker implementations to perform actions such as routing and logging without needing to inspect the full message payload. API Consumers and Message Producers can also use these for the similar purposes.

When using the [CloudEvents](./06-APIDesignandDocumentation.md#cloudevents) specification when describing event data, metadata is referred to as [Context Attributes](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#context-attributes). Some context attributes are mandatory to conform to the specification - `id`, `source` and `specversion` and `type`, each with further constraints and data types. Dependent on the particular [protocol/s](./04-Protocols.md) used for message transport, the corresponding CloudEvents protocol binding defines how the CloudEvent is bound to the protocols's transform frame.

For example, in the [CloudEvents MQTT Protocol Binding](https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/mqtt-protocol-binding.md#2-use-of-cloudevents-attributes) the `datacontenttype` attribute is mapped to the MQTT PUBLISH `Content Type` field. The [CloudEvents HTTP Protocol Binding](https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/http-protocol-binding.md#21-datacontenttype-attribute) maps attributes to HTTP headers prefixed by `ce-` - for example `ce-id` for the `id` context attribute.

When using FHIR Subscriptions, the framework supports the use of the [R4 - Subscription.channel.header](https://www.hl7.org/fhir/r4/subscription-definitions.html#Subscription.channel.header) or the [R5 - Subscription.parameter](https://hl7.org/fhir/subscription-definitions.html#Subscription.parameter) for API Consumer defined headers.

### Suggested headers

When not following a specification that defines mandatory event metadata such as CloudEvents, the below are suggested as a minimal set of headers which allow all parties in the integration to reliably troubleshoot and log interactions.

| Header name   | Value example | Description |
| ----------- | ----------- | --- |
| Content-Type      | `application/json`   | Indicates the content type of the message |
| Correlation-Id   | `63841126-0aba-4e21-adbe-fa21279e83b2`  | Unique identifier for the interaction |
| Event-Id | `54e7587e-5a38-4c85-94cb-96cc9570a19f` | Unique identifier for this event, used for idempotency |

For further reading on message types, please refer to:

- [Martin Fowler's "What do you mean by Event-Driven?"](https://martinfowler.com/articles/201701-event-driven.html)
- [Event-Driven architecture event types](https://serverlessland.com/event-driven-architecture/visuals/event-types)
