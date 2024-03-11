---
title: "Message Types"
---

The types of messages in Asynchronous APIs can vary, and the correct choice will depend on the particular use case desired to be achieved.

Event-driven architectures will typically publish domain events or integration events. Domain events are usually private events that are not published for use by external systems - instead they are used for purposes such as communication between microservices. Integration events are intended for consumers external to the API Provider domain and should contain data that external domains can understand and use.

When publishing integration events there is a balance to be achieved between publishing too much, or too little information in them. It can be easy too accidentally expose too much information, or information that contains private implementation details.

## Event notification (Thin events)

This message type is often referred to as a `thin` message - as usually it will only contain the minimal amount of data required to inform a consumer of an event that has occurred. If any of the consumers of the message are interested to know further details about this particular event, they are able to contact the API Provider for more information(this may be using a REST API). These message types are valuable when there is a need to notify other parties that a particular event has taken place, however the consumer may not need to know all the details right away.

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
    "url": "https://example.com/fhir/Encouter/5a5c049a-adbc-11ee-a506-0242ac120002"
  }
}
```

The payload above notifies that a `hospital_admission` has occurred for Patient `NHI123`.

**Characteristics:**

- Minimal information is being transferred which can reduce risk
- Less risk of data being out of sync, as the API Consumer fetches the latest data if it is required
- API Consumers may need to fetch the data outside of the Async API if they need to know more about the event
- Smaller contracts and data schemas allow for easier future changes

This message type **SHOULD** be used if the API Provider does not have full control or knowledge of the event data being sent.

## Event-Carried State Transfer (Fat/Thick events)

This message type is used when you want consumers to have information about the event that has occurred, without them needing to contact the source system for more information. These event types typically contain ALL the current event/domain data, hence the colloquial name "fat events".

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
- Higher risk of data getting out of sync between systems
- Greater care is required with event versioning and schema changes
- API Consumers are fully decoupled from the API Provider, as they do not need to interact with the Provider directly (they already have all of the data)
- Data is eventually consistent, meaning data may not be perfectly synchronised, but will ultimately become consistent

## Delta events

This message type sends both the current state of the event subject, as well as the prior state.

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

- Stores the difference between prior and current states
- Can reduce complexity in API Consumers needing to find out what state change has occurred, if they do not have knowledge of the prior state themselves

## FHIR Subscriptions

The Subscriptions Framework in FHIR is a mechanism used to send event notifications from a FHIR API Provider to API Consumers based on activity occurring on resources in the server.

### FHIR R4B Subscriptions

When using FHIR R4B Subscriptions, there are two possible message types sent in the notification payload, which is selected when creating the `Subscription`:

- No payload - an empty body, where API Consumers must query the FHIR Server to retrieve the actual updates from the FHIR Server using search parameters such as `_lastUpdatedAt`

- a FHIR Resource - the full FHIR resource is sent, similar to an update operation

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

### FHIR R5 Subscriptions

When using **FHIR R5 Subscriptions**, the message contains a FHIR Bundle resource of type `subscription-notification`. There are three options for what is contained within the Bundle which is selected when creating the `Subscription`:

- [empty](#empty)
- [id-only](#id-only-example)
- [full-resource](#full-resource)

#### Empty

In this message type, the FHIR API Consumer receives an empty notification, where they will now query the FHIR server (generally using search parameters such as `_lastUpdatedAt`) to retrieve the new resources. This mitigates many security concerns by both removing most PHI from the notification and allows servers to consolidate authorization and authentication logic.

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

When deciding which payload type to request, systems **SHOULD** consider both ease of processing and security of PHI. To mitigate the risk of information leakage, systems **SHOULD** use the minimum level of detail consistent with the use case. In practice, id-only provides a good balance between security and performance for many real-world scenarios.

Note that this is not an exhaustive list of all possible message types, but these are considered most relevant to the use cases in the New Zealand Health Sector.

For further reading, please refer to:

- [Martin Fowler's "What do you mean by Event-Driven?"](https://martinfowler.com/articles/201701-event-driven.html)
- [Event-Driven architecture event types](https://serverlessland.com/event-driven-architecture/visuals/event-types)
