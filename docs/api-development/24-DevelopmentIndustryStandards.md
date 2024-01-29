---
title: API Development Industry Standards
---

:::warning[Status]
Content is draft and in review – this content may change until review is complete and formally published.
:::

## Standards for Developing APIs

In addition to the standards captured in [API Design](./API%20Design#standards-based) and [API Security Standards](../api-security/StandardsforSecuringRESTful%20APIs) the table below
captures (current) API and web standards that should be considered as part of any API Strategy.

| Standard or Standards Organisation | Description |
|---|---|
| **OpenAPI** | The OpenAPI Specification defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. |
| **AsyncAPI** | AsyncAPI is an open source initiative that seeks to improve the current state of Event-Driven Architectures (EDA). Their long-term goal is to make working with EDAs as easy as it is to work with REST APIs. |
| **HTTP** | HTTP stands for Hyper Text Transfer Protocol. Communication between client computers and web servers is done by sending HTTP Requests and receiving HTTP Responses. In practice, most RESTful APIs use HTTP as a transport layer and rely on the use of HTTP verbs, like POST, GET, PUT and DELETE. |
| **OAuth2/OIDC** | The OAuth 2.0 Authorization Framework (OAuth2) is an industry standard framework that enables third parties limited access to protected resources and is commonly used authorisation approach for APIs. Open ID Connect (OIDC) is an identity layer on top of OAuth2 that allows consuming applications to request information about authenticated sessions and end users. |
| **JSON/JSON Schema** | JavaScript Object Notation (JSON) is an open standard for a lightweight format for storing and transporting data. It is a "self-describing" notation and is easy for both humans and computers to understand. |
| **JWT/JWS/JWE/JWK/JWA** | These are a set of open standards for securely transmitting information between systems using JSON. They include the data structure a web token (JWT), how to sign a JWT (JWS), how to encrypt a JWT (JWE), and some JSON cryptography practices (JWK and JWA) |
| **Fast Healthcare Interoperability Resources (FHIR)** | FHIR is a an industry standard for exchanging healthcare information electronically. It was developed by the HL-7 standards organisation. |
| **Payments New Zealand (PNZ) API Centre Standards** | The PNZ API Centre standards is an industry standard for Open Banking. The security profile is quite interesting in regards to capturing customer consent for third parties to act on their behalf. |
| **SOAP** | This standard is Deprecated for NZ Government - GEAG has determined that the standard should not be used for new work, but may still be in use for existing APIs. |
| **Financial Grade API (FAPI) Security Profile** | Another industry standard for the financial sector. It is an example of good security profile practices. |
| **Pan European Public Procurement Online (Peppol)** | Peppol is a global standardised framework that enables businesses to exchange procurement documents electronically. To do this, Peppol provides and maintains artefacts and specifications to make it possible for businesses using different systems to ‘speak’ to each other. The use of Peppol is governed by a multi-lateral agreement structure, owned and maintained by OpenPeppol. |
| **Internet Engineering Task Force (IETF)** | The IETF is a large open international community concerned with the evolution of the Internet architecture and the smooth operation of the Internet. Their mission is to make the Internet work better by producing high quality, relevant technical documents that influence the way people design, use, and manage the Internet. Many of the standards listed above were developed through the IETF. |
| **Standards New Zealand** | A business unit within the Ministry of Business, Innovation and Employment, which specialises in managing the development of standards. They also publish and sell NZ, joint Australia-NZ, and international standards. |
| **Stats NZ: Standards and classifications** | Information about the standards and classifications Stats NZ use and maintain, news about reviews, and tools to help classify and code responses. |
| **Health Information Standards Organisation (HISO)** | This organisation supports and promotes the development and adoption of fit-for-purpose health information standards for the NZ health system. |
| **Data Content Requirements** | There is a documented set of government data content requirements - [https://www.data.govt.nz/manage-data/data-content-standardisation/register-of-government-data-content-requirements/] |
