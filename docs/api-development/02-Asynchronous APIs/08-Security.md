---
title: "Security"
---

The [Security section](../../api-security) of these Standards detail the requirements in regards to API security.

In the context of Asynchronous APIs, these Standards must be adhered to, as with other API types such as REST and FHIR.

- <ApiStandard id="HNZAS_MUST_ASYNC_ENCRYP" type="MUST" toolTip="The messages used in Asynchronous APIs MUST use appropriate transport level encryption, regardless of the protocol being used to interact with the Message Broker" >The messages used in Asynchronous APIs **MUST** use appropriate transport level encryption, regardless of the protocol being used to interact with the Message Broker</ApiStandard>
- <ApiStandard id="HNZAS_MUST_ASYNC_AA" type="MUST" toolTip="API Consumers MUST be authenticated and authorised using appropriate mechanisms" >API Consumers **MUST** be authenticated and authorised using appropriate mechanisms</ApiStandard>
- <ApiStandard id="HNZAS_MUST_ASYNC_RESTRICT" type="MUST" toolTip="Authorisation MUST be used to restrict access to topics as appropriate" >Authorisation **MUST** be used to restrict access to topics as appropriate</ApiStandard>
- An appropriate [Message Type](./03-MessageTypes.md) **MUST** be selected to best meet the use case's requirements in combination with privacy requirements and interoperability goals
