---
title: "Te Whatu Ora API Standards"
sidebar_position: 1
slug: /
---

:::warning[In Development]
This section is in development and is not complete or ready for review.
:::

Learn about how Te Whatu Ora are implementing APIs to their systems and what the benefits are of doing this.

These standards provide both API Providers and API consumers with context for focused design and implementation as well as API best practices. This is intended to help both producers and consumers achieve a consistent and common approach to developing and delivering APIs.

## Introduction

The guidelines are split into the following 3 parts:

[**Part A: API Concepts and Management**](/api-concepts)

Part A contains the business context for APIs and their use within Te Whatu Ora. It describes the principles and considerations when producing or consuming APIs, some of the benefits and pitfalls of doing so as well as their value when fostering innovation in the health sector.

[**Part B: API Security**](/api-security)

Part B contains the API security reference architecture and technical details for implementing API security. This section of the standard lays out the minimum security requirements for both API Providers and consumers and gives guidance to organisations on security best practice in relation to APIs

[**Part C: API Development**](/api-development)

Part C contains technical details for API development, including general API implementation standards for API developers and consuming application developers.

[**Part D: FHIR API Standards**](/fhir-api-standard)

Part D contains standards information and guidance for FHIR APIs

:::info

The decision has been taken to split FHIR API standards into a standalone section - note that there may be some repetition between sections. A FHIR implementer or consumer only needs to comply with the FHIR standards
:::

:::note
These guidelines:

- are intended to apply for all API standards and protocols, however much of the guidance is oriented to REST (Representative State Transfer) or FHIR APIs
- use hypothetical or actual use cases with a health context to illustrate practical application of the concepts described. Examples do not represent recommended API design and / or data content requirements for Te Whatu Ora.
  :::

## Target audience

### Part A: API concepts and management

The target audience for part A is primarily technical business people who need to understand the value and benefit of APIs and gain an appreciation of what is involved and needs to be in place.

Part A also provides the context for parts B and C for enterprise architects, solution architects and API developers in agencies.

It may be of interest to commercial entities, non-governmental organisations (NGOs) or other third parties who are developing, or planning to develop, applications that use government APIs.

### Part B: API security and Part C: API development

The target audience for parts B and C is primarily solution designers and API developers in agencies and organisations within the public service.

Additionally, compliance and assurance personnel may be interested in terms of assessing alignment with the standards and guidelines.

Application of the guidelines
The main reason for these guidelines is to give agencies and vendors some common, default guidance on API implementation to help accelerate the development of government APIs.

Therefore, most of the specific technical guidance is marked as ‘recommended’ rather than mandatory. Exceptions tend to be in areas of security, authorisation and referenced standards compliance.

It is recognised that many sectors or industries will have existing APIs and associated standards, which may be established and governed outside an agency’s control. In such cases, industry standards will prevail, but agencies are encouraged to review their existing use of APIs against these guidelines and consider whether any discrepancies reflect material business risks.

Agencies that have their own existing APIs will also need to balance the risk and cost of the change against the benefits of conforming with these guidelines — a phased approach may be appropriate.

## Documentation terminology

In order to enhance the precision and consistency of our API standards, we have adopted the terminology defined in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt). This document provides a set of well-defined terms that convey specific meanings when used in requirements and recommendations.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.
