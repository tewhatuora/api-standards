---
title: "Security"
---

The [Security section](../../api-security) of these Standards detail the requirements in regards to API security.

In the context of Asynchronous APIs, these Standards must be adhered to, as with other API types such as REST and FHIR.

- The messages used in Asynchronous APIs **MUST** use appropriate transport level encryption, regardless of the protocol being used to interact with the Message Broker
- API Consumers **MUST** be authenticated and authorized using appropriate mechanisms
- Authorization **MUST** be used to restrict access to topics as appropriate
- An appropriate [Message Type](./02-MessageTypes.md) **MUST** be selected to best meet the use case's requirements in combination with privacy requirements and interoperability goals
