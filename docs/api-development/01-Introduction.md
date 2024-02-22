---
title: Introduction
---



Digital health can transform the outcomes and experience of health consumers if information is shared seamlessly. When digital products, services and information systems work together in this way, we call it being interoperable.

The [HISO Interoperability Roadmap](https://www.tewhatuora.govt.nz/assets/Our-health-system/Digital-health/Health-information-standards/hiso-10083-2020-interoperability-roadmap-11sept2020.pdf) defines interoperability as a key enabler of the digital health ecosystem. Core to interoperability is the delivery of performant, secure and well documented application programming interfaces (APIs).

The roadmap envisions a future where the health sector in Aotearoa prioritises the creation of open APIs to enable reuse of data, transactions and rules, which, in turn, creates an opportunity for greater cooperation and interoperability between health sector participants to dramatically improve service design and delivery.

The health sector needs focused standards, guidance, approaches and techniques to help increase their knowledge and skills around APIs. There is a wide range in the level of knowledge and skill regarding API design and delivery across the sector. This document tries to offer a balance of guidance for those new to APIs along with quick lookup standards, which should assist sector participants in achieving consistency and commonality in their API deliverables.

## Scope

This document set aims to provide a set of high-level standards with design and implementation guidance, along with low-level API best practices to guide API providers and consumers in their development of APIs.

[**Part A: API Concepts and Management**](/api-concepts)

Part A contains the business context for APIs and their use within Te Whatu Ora. It describes the principles and considerations when producing or consuming APIs, some of the benefits and pitfalls of doing so as well as their value when fostering innovation in the health sector.

[**Part B: API Security**](/api-security)

Part B contains the API security reference architecture and technical details for implementing API security. This section of the standard lays out the minimum security requirements for both API Providers and consumers and gives guidance to organisations on security best practice in relation to APIs.

[**Part C: API Development**](/api-development)

Part C contains technical details for API development, including general API implementation standards for API developers and consuming application developers.

[**Part D: FHIR API Standards**](/fhir-api-standard)

Part D contains standards information and guidance for FHIR APIs

:::info

The decision has been taken to split FHIR API standards into a standalone section - note that there may be some repetition between sections. A FHIR implementer or consumer only needs to comply with the FHIR standards

:::

These standards and guidelines:

- are intended to apply for all API standards and protocols, however much of the guidance is oriented to REST (Representative State Transfer) or FHIR APIs
- use hypothetical or actual use cases with a health context to illustrate practical application of the concepts described. Examples do not represent recommended API design and / or data content requirements for Te Whatu Ora.
  
Applicable technical standards are referenced throughout the document set and are intended to provide detailed guidance for developers of API standards.

## Target Audience

The target audience for this document – Part C Development - is
primarily API designers, [API developers](/api-concepts/ComponentDefinitions#api-developers) and [application developers](/api-concepts/ComponentDefinitions#application-developers) who are working on technology solutions for the health sector in Aotearoa.

Additionally, compliance and assurance personnel may be interested in terms of assessing alignment with the standards and guidelines.

## Definition of API

An API is an interface that enables one software application to communicate with another software application. Typically the communication protocol of APIs is agnostic but the APIs and associated examples in this document are primarily **_Web
APIs_** or APIs that are accessible via the http(s) protocol. An API however should not be confused with a service. It is true that web services are, by definition, APIs however not all APIs are web services.

It is important to stress that for the purposes of this document we are
discussing web APIs that enable interoperability and not software
engineering principles.
