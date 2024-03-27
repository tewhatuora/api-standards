---
title: "Request Reply Pattern"
---

## Asynchronous Request-Reply

The Asynchronous Request-Reply pattern is typically used in Async APIs which are using "Command messages" - messages which specify a function or method that the message sender wants to invoke. When a command message is sent, it often expects a response with a result, or confirmation that the message has been processed.

Example Asynchronous Request-Reply interaction:

```mermaid
---
title: Asynchronous Request
---
flowchart LR
    accTitle: Asynchronous Request diagram
    accDescr: Flow diagram showing the Request-Reply pattern
    A[API Consumer] -->|Publish generate_patient_summary message| C{Message broker}
    C -->|Route message| D[patient_summary_request channel]
    D -->|generate_patient_summary| E[Patient Summary Microservice]
```

<DetailedDescription text="In the diagram, there is an API Consumer, a message broker, and a channel. The API Consumer publishes a generate_patient_summary message to the message broker, and the message broker then routes the message to the patient_summary_request channel.
The patient_summary_request channel is subscribed to by the Patient Summary Microservice. When the Patient Summary Microservice receives the generate_patient_summary message, it will process the message and generate a patient summary."/>

```mermaid
---
title: Asynchronous Reply
---
flowchart RL
    accTitle: Asynchronous Reply diagram
    accDescr: Flow diagram showing the Request-Reply pattern
    E[Patient Summary Microservice] --> |Publish patient_summary_reply message| C{Message broker}
    C --> |Route message| D[patient_summary_reply channel]
    D[patient_summary_reply channel] --> A[API Consumer]
```
<DetailedDescription text="The diagram describes an asynchronous reply pattern and contains two message channels, one for requesting a Patient summary, and one to receive Patient summary response messages. Asynchronous Request
The API Consumer publishes a generate_patient_summary message to the message broker.
The message broker routes the message to the patient_summary_request channel.
The Patient Summary Microservice receives the generate_patient_summary message from the patient_summary_request channel.
Asynchronous Reply
The Patient Summary Microservice processes the generate_patient_summary message and generates a patient summary.
The Patient Summary Microservice publishes a patient_summary_reply message to the message broker.
The message broker routes the patient_summary_reply message to the patient_summary_reply channel.
The API Consumer receives the patient_summary_reply message from the patient_summary_reply channel."/>

In the above example, there are two message channels, one for requesting a Patient summary, and one to receive Patient summary response messages. Although this workflow is similar to a typical REST API interaction, an Asynchronous Request/Reply may be more appropriate if the process of generating a Patient summary may take a long amount of time (perhaps due to complex orchestration of data sources). Rather than the API Consumer waiting for the response, they are able to continue and instead receive messages from the reply channel when the summary is ready.

### When to use this pattern

- When an API is performing logic or calculations which may take longer than the duration of an HTTP request
- When an API is performing intense logic that may not scale well
- When a downstream service is subject to rate limits, so message processing concurrency may be limited
