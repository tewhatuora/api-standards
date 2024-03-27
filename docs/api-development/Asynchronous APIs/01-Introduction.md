---
title: "Introduction"
---

A key indicator to interoperability within digital health is the ease and efficiency in which data sharing can occur across multiple distributed systems within the sector. Utilising event-driven, Asynchronous API architectures can significantly enhance interoperability by providing sector API Consumers with:

- **Realtime communication** - when an update or event occurs in one domain, the relevant information can be shared with interested API consumers in realtime
- **Decoupled systems** - each API Provider and Consumer can operate independently, so changes to integrated systems generally do not require other systems to be aware fo change
- **Scalability** - a large number of new API Providers or Consumers can be added without any performance impacts or changes in message publishing
- **Elimination of polling** - unlike REST APIs that rely on polling to check for updates, Asynchronous APIs eliminate the need for constant polling, as systems are instead notified when events that interest them occur
- **Unified records** - when updates to information such as a patient's record occurs, each system with a copy of this can immediately receive the updated information, which can enhance patient care and outcomes

## What is an Asynchronous API

Asynchronous APIs are a type of API which allow for non-blocking communication within systems, without the limitations of a typical synchronous request-reply API. These APIs include the range of protocols and styles that are referred to "asynchronous", "message-based", "event driven" and so forth.

Synchronous APIs typically return or generate data when it is requested by a client, however Asynchronous APIs generate or receive data when the data changes, or an event has taken place. This means that the interactions in an Asynchronous API moves from the single client and single server relationship in synchronous APIs where the client initiates the request, to the API Provider publishing events which one or many API Consumers may consume.

Asynchronous APIs have many uses, such as realtime chat applications, software developed using [CQRS](https://martinfowler.com/bliki/CQRS.html) and remote procedure invocation and messaging/data sharing. The primary focus of these standards focus on the messaging and data sharing use cases for Async APIs.

## When to choose an Asynchronous API

Asynchronous APIs are appropriate to use when designing an API to meet any of the below criteria:

- When there is a requirement to notify one or many consumers of a change in resource state
- When performing a request that may take a long period of time, such as large data exports, human task interrupted workflows or analytic workloads
- When data must be sent or received in realtime, such as from IoT devices
- When designing a decoupled system, such as in a microservices environment
- When there is a requirement to use/display the most up to date copy of data

Once an Asynchronous API has been selected as the desired API type, there are certain architectural decisions which need to be made in order to publish the API, which these Standards offer guidance on.

### Identify and design

- Choose a [message type](./02-MessageTypes.md) - how the event payload will be structured
- Choose the supported [message protocols](./03-Protocols.md) - which protocol/s the API Consumer will use to receive the event

### Design and documentation

- Choose an [Async Pattern](./Async%20Patterns/01-Intro.md) that is suited to the desired API interactions
- Defining the event payload
- [Documenting the API and it's event data](./05-APIDesignandDocumentation.md)

### Evolution

- Managing changes to events and channels

### Data consistency

- Understanding the consistency level requirements for the different use-cases of the data, such as [eventual vs strong consistency](06-DataConsistencyModels.md)

An overview of these decisions and the preferred options are detailed throughout these standards.
