---
title: "Health New Zealand | Te Whatu Ora API Standards"
sidebar_position: 1
slug: /
---



Learn about how Health NZ are implementing application programming interfaces (APIs) to their systems and what the benefits are of doing this.

These standards provide both API Providers and API consumers with context for focused design and implementation as well as API best practices. This is intended to help both producers and consumers achieve a consistent and common approach to developing and delivering APIs.

:::info
These standards have been approved by the Health Information Standards Organisation (HISO).

Please see the [list of approved HISO standards](https://www.tewhatuora.govt.nz/health-services-and-programmes/digital-health/data-and-digital-standards/approved-standards/).
:::

## Introduction

The standards and guidelines are split into the following 3 parts:

[**Part A: API Concepts and Management**](/api-concepts)

Part A contains the business context for APIs and their use within Health NZ. It describes the principles and considerations when producing or consuming APIs, some of the benefits and pitfalls of doing so as well as their value when fostering innovation in the health sector.

[**Part B: API Security - HISO 10107**](/api-security)

Part B contains the API security reference architecture and technical details for implementing API security. This section of the standard lays out the minimum security requirements for both API Providers and consumers and gives guidance to organisations on security best practice in relation to APIs

[**Part C: API Development - HISO 10109**](/api-development)

Part C contains technical details for API development, including general API implementation standards for API developers and consuming application developers.

[**Part D: HL7 FHIR API Standards - HISO 10110**](/fhir-api-standard)

Part D contains standards information and guidance for HL7 FHIR APIs

[**Part E: API Publishing Standards - HISO 10108**](/api-publishing)

Part E contains standards information and guidance for publishing APIs

:::info

The decision has been taken to split FHIR API standards into a standalone section - note that there may be some repetition between sections. A FHIR implementer or consumer only needs to comply with the FHIR standards
:::

:::note
These standards and guidelines:

- are intended to apply for all API standards and protocols, however much of the guidance is oriented to REST (Representative State Transfer) or FHIR APIs
- use hypothetical or actual use cases with a health context to illustrate practical application of the concepts described. Examples do not represent recommended API design and / or data content requirements for Health NZ.
  :::

## Target audience

### Part A: API concepts and management

The target audience for part A is primarily technical business people who need to understand the value and benefit of APIs and gain an appreciation of what is involved and needs to be in place.

Part A also provides the context for parts B and C for enterprise architects, solution architects and API developers.

It may be of interest to commercial entities, non-governmental organisations (NGOs) or other third parties who are developing, or planning to develop, applications that use government APIs.

### Part B: API security and Part C: API development

The target audience for parts B and C is primarily solution designers and API developers in organisations within the Aotearoa health sector. Additionally, compliance and assurance personnel may be interested in terms of assessing alignment with the standards and guidelines.

The main reason for these standards and guidelines is to give organisations some common, default guidance on API implementation to help accelerate the development of their APIs.

Therefore, most of the specific technical guidance is marked as ‘recommended’ rather than mandatory. Exceptions tend to be in areas of security, authorisation and referenced standards compliance.

It is recognised that many sectors or industries will have existing APIs and associated standards, which may be established and governed outside an organisation's control. In such cases, industry standards will prevail, but organisations are encouraged to review their existing use of APIs against these guidelines and consider whether any discrepancies reflect material business risks.

Organisations that have their own existing APIs will also need to balance the risk and cost of the change against the benefits of conforming with these guidelines — a phased approach may be appropriate.

### Part E: API Publishing

The target audience for part E is primarily API Providers and provides guidance and standards for appropriate API publication.

## Documentation terminology

In order to enhance the precision and consistency of our API standards, we have adopted the terminology defined in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt). This document provides a set of well-defined terms that convey specific meanings when used in requirements and recommendations.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.
