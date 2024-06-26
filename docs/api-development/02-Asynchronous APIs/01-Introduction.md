---
title: "Introduction"
---

A key indicator to interoperability within digital health is the ease and efficiency in which data sharing can occur across multiple distributed systems within the sector. Utilising event-driven, Asynchronous API architectures can significantly enhance interoperability by providing sector API Consumers with benefits which can include:

- **Near realtime communication** - as soon as an update or event occurs in one domain, the relevant information can be shared with interested API Consumers without significant delay
- **Decoupled systems** - each API Provider and Consumer can operate independently, so changes to integrated systems generally do not require other systems to be aware of changes made to the other
- **Scalability** - a large number of new API Providers or Consumers can be added without any performance impacts or changes in message publishing
- **Elimination of polling** - unlike REST APIs that rely on polling to check for updates, Asynchronous APIs eliminate the need for constant polling, as systems are instead notified when events that interest them occur
- **Unified records** - when updates to information such as a patient's record occurs, each system with a copy of this can immediately receive the updated information, which can enhance patient care and outcomes

## What is an Asynchronous API

Asynchronous APIs are a type of API which allow for non-blocking communication within systems, without the limitations of a typical synchronous request-reply API. Synchronous APIs typically return or generate data when it is requested by a client, however the use of Asynchronous APIs allows generated data to be transmitted and received, potentially by several other software components supporting Async APIs, immediately after the data changes, or an event has taken place.

These APIs are usually used in [Patterns](./Async%20Patterns/01-Intro.md) describing interactions by several software components supporting different Asynchronous APIs suited to their role in the Pattern (and potentially augmented by some Synchronous APIs). This means that the interactions in an Asynchronous API moves from the single client and single server relationship pattern in synchronous APIs where the client initiates the request, and waits for a response, to one in which APIs are supported by multiple software components. Though dependent on the pattern selected, this will typically include a Message Producer, Message Broker and API Consumer/s.

In addition, although the non-blocking nature of Asynchronous APIs can be supported over HTTP/TCP/IP like REST, this is less efficient than the use of a range of [network protocols](04-Protocols.md), middleware, and interaction styles that are referred to "asynchronous", "message-based", "event driven" and so forth. These are non-blocking, and offer a range of guarantees about delivery and the order of delivery, and this section discusses their suitability for various application types.

Asynchronous APIs have many uses, such as realtime (in human terms) chat applications, software developed using the [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html), remote procedure invocation and messaging/data sharing. The primary focus of these standards focus on the messaging and data sharing use cases for Async APIs.

## When to choose an Asynchronous API

Asynchronous APIs are appropriate to use when designing an API to meet any of the below criteria:

- When there is a preference to notify one or many consumers of a change in resource state, rather than having the consumer query the resource state
- When performing a request that may take a long period of time, such as large data exports, human task interrupted workflows or analytic workloads
- When timeliness of state changes are critical for the use case, such as near-real-time updates from IoT devices
- When designing a decoupled system, such as in a microservices environment
- When it is important for the API Consumer to use the most up to date version of a resource, as they can be notified of a change, rather than querying the source system each time it is used

Once an Asynchronous API has been selected as the desired API type, there are certain architectural decisions which need to be made in order to publish the API, which these Standards offer guidance on.

### Identify and design

- Choose a [message type](./03-MessageTypes.md) - how the event payload will be structured
- Choose the supported [message protocols](./04-Protocols.md) - which protocol/s the API Consumer will use to receive the event

### Design and documentation

- Choose an [Async Pattern](./Async%20Patterns/01-Intro.md) that is suited to the desired API interactions
- Defining the event payload
- [Documenting the API and it's event data](./06-APIDesignandDocumentation.md)

### Evolution

- Managing changes to events and channels

### Data consistency

- Understanding the consistency level requirements for the different use-cases of the data, such as [eventual vs strong consistency](07-DataConsistencyModels.md)

An overview of these decisions and the preferred options are detailed throughout these standards.
