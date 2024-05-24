---
title: "Protocols and APIs"
---

There are a number of transport protocols which are commonly used for transporting messages in asynchronous APIs. API Providers **SHOULD** aim to support as many protocols as reasonably possible, to allow API Consumers the freedom to consume messages using the protocol that best suits their own systems infrastructure and use cases. When selecting a message broker technology, the protocols in which clients can connect to the system should be assessed.

### MQTT (Message Queuing Telemetry Transport)

MQTT is a lightweight and efficient protocol designed for low bandwidth, high latency networks, which supports all [Async Patterns](../02-Asynchronous%20APIs/Async%20Patterns/01-Intro.md). This protocol is often used with IoT devices.

<ApiStandard id="HNZAS_SHOULD_SUPPORT_MQTT" type="SHOULD" toolTip="Asynchronous API Providers SHOULD support the use of MQTT (Message Queuing Telemetry Transport)." >API Providers **SHOULD** support the use of this protocol.</ApiStandard>

### AMQP (Advanced Message Queuing Protocol)

AMQP (Advanced Message Queuing Protocol) is an open-standard messaging protocol that enables reliable, high performance and interoperable communication between applications or components, using message brokers to route and manage the flow of messages in a distributed system.

<ApiStandard id="HNZAS_SHOULD_SUPPORT_AMQT" type="SHOULD" toolTip="Asynchronous API Providers SHOULD support the use of AMQP (Advanced Message Queuing Protocol)." >API Providers **SHOULD** support the use of this protocol.</ApiStandard>

### WebSockets

WebSockets is a communication protocol that provides bidirectional communication between a client and a server over a single, long-lived HTTP connection, enabling real-time data exchange, most commonly in web applications.

<ApiStandard id="HNZAS_SHOULD_SUPPORT_WEBSOCKET" type="MAY" toolTip="Asynchronous API Providers MAY support the use of AMQP (Advanced Message Queuing Protocol)." >API Providers **SHOULD** support the use of this protocol.</ApiStandard>

### HTTP

HTTP has limited scalability for handling a large number of connections and is not designed for asynchronous communication. When HTTP is used for Async communication, it moves the API Consumer's long polling behaviour away from polling the API Provider, to instead polling the event broker.

<ApiStandard id="HNZAS_MAY_SUPPORT_ASYNC_HTTP" type="MAY" toolTip="Asynchronous API Providers MAY support the use of AMQP (Advanced Message Queuing Protocol)." >Due to this, HTTP is not recommended as a primary protocol for Async messaging APIs as it cannot deliver the full value of Async APIs, however API Providers **MAY** support the use of this protocol if required to integration legacy systems, or for environments where making required networking updates is challenging.</ApiStandard>

### Proprietary protocols

There are a number of message broker technologies which implement their own protocols such as [Solace Message Format (SMF)](https://docs.solace.com/Messaging/SMF-Topics.htm) or the [Kafka protocol](https://kafka.apache.org/0100/protocol.html). <ApiStandard id="HNZAS_MAY_SUPPORT_ASYNC_PROPRIETARY" type="MAY" toolTip="Asynchronous proprietary protocols MAY be used." >These proprietary protocols **MAY** be used.</ApiStandard>

<ApiStandard id="HNZAS_MUST_NOT_BE_ONLY_PROPRIETARY" type="MAY" toolTip="Asynchronous proprietary protocols MUST NOT be the only protocol offered by the API provider." >Asynchronous proprietary protocols **MUST NOT** be the only protocol offered by the API provider. This is to ensure that API Consumers or Message Producers who may have existing implementations using open protocols do not need to undertake more work to integrate, or become reliant on a particular broker technology.</ApiStandard>

## APIs

### JMS (Java Message Service)

JMS provides a common way for Java applications to create, send, receive, and read an enterprise messaging system's messages. For detailed information on JMS, refer to the [JMS specification](https://jcp.org/en/jsr/detail?id=343).

<ApiStandard id="HNZAS_MAY_ASYNC_JMS" type="MAY" toolTip="API Consumers and Providers MAY choose to publish and consumer messages using the standard JMS interface." >API Consumers and Providers **MAY** choose to publish and consumer messages using the standard JMS interface.</ApiStandard>

## Data serialization

<ApiStandard id="HNZAS_MAY_ASYNC_JSON" type="SHOULD" toolTip="Asynchronous API messages SHOULD be published using JSON" >While there are a number of data serialization formats used within Async APIs such as [JSON](https://datatracker.ietf.org/doc/html/rfc7159), [Protocol Buffers (protobuf)](https://protobuf.dev) and [FlatBuffers](https://flatbuffers.dev), it is **RECOMMENDED** to publish messages using JSON due to a lower barrier to entry for both API Providers and Consumers, as the data is human readable, and easy to use in programming languages that natively support JSON.</ApiStandard>
