---
title: "Related Internet and NZ standards"
---

:::warning[Status]
Content is draft and in review – this content may change until review is complete and formally published.
:::

## Current Internet standards (IETF RFC) relating to OAuth 2.0 security

| RFC number | Title | Description|
| :-- | :----- | :------------------------------------------------ |
| [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749) | OAuth 2.0 Authorization Framework | The core OAuth 2.0 RFC defining the authorisation framework.|
| [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) | OAuth 2.0 Authorisation Framework: Bearer Token Usage | How to use bearer tokens in HTTP requests to access OAuth 2.0 protected resources. Any party bearing a token (a "bearer token") can get access to the associated resources (without demonstrating possession of a cryptographic key). |
| [RFC 6819](https://datatracker.ietf.org/doc/html/rfc6819) | OAuth 2.0 Threat Model and Security Considerations | Introduces a comprehensive threat model for the OAuth 2.0 protocol. |
| [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009) | Token Revocation | Defines a means for clients (consuming applications) to revoke their own access or refresh tokens. This is essential should a token get into the wrong hands and be used for malicious purposes. |
| [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519) | JSON Web Token (JWT) | A simple means for parties to exchange claims representations. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encryption. |
| [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) | JSON Web Token Best Current Practices | This document updates RFC 7519 to provide actionable guidance leading to secure implementation and deployment of JWTs. |
| [RFC 7521](https://datatracker.ietf.org/doc/html/rfc7521) | Assertion Framework for OAuth 2.0 Client Authentication and Authorisation Grants| Common framework for OAuth 2.0 to interact with other identity systems using an assertion and to provide alternative client authentication mechanisms.|
| [RFC 7522](https://datatracker.ietf.org/doc/html/rfc7522) | Security Assertion Markup Language (SAML) 2.0 Profile for OAuth 2.0 Client Authentication and Authorization Grants | The use of a Security Assertion Markup Language (SAML) 2.0 Bearer Assertion as a means for requesting an OAuth 2.0 access token as well as for client authentication. |
| [RFC 7523](https://datatracker.ietf.org/doc/html/rfc7523) | JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants | Use of a JSON Web Token (JWT) Bearer Token as a means for requesting an OAuth 2.0 access token as well as for client authentication. |
| [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591) | OAuth 2.0 Dynamic Client Registration Protocol | Mechanisms for dynamically registering OAuth 2.0 clients with authorisation servers. |
| [RFC 7592](https://datatracker.ietf.org/doc/html/rfc7592) | OAuth 2.0 Dynamic Client Registration Management Protocol | Methods for the management of OAuth 2.0 dynamic client registrations for use cases in which the properties of a registered client may need to be changed during the lifetime of the client. |
| [RFC 7662](https://datatracker.ietf.org/doc/html/rfc7662) | OAuth 2.0 Token Introspection|Method for a protected resource to query an OAuth 2.0 authorisation server to determine the active state of an OAuth 2.0 token and to determine meta-information about this token. Provides authorisation context of the token from the authorisation server to the protected resource. |
| [RFC 7800](https://datatracker.ietf.org/doc/html/rfc7800) | Proof-of-Possession Key Semantics for JSON Web Tokens (JWTs)|How to declare in a JSON Web Token (JWT) that the presenter of the JWT possesses a particular proof-of-possession key and how the recipient can cryptographically confirm proof of possession of the key by the presenter. |
| [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636) | Proof Key for Code Exchange by OAuth Public Clients | OAuth 2.0 public clients utilising the Authorisation Code Grant are susceptible to the authorisation code interception attack. This specification describes the attack as well as a technique to mitigate against the threat through the use of Proof Key for Code Exchange. |
| [RFC 8176](https://datatracker.ietf.org/doc/html/rfc8176) | Authentication Method Reference Values | Establishes a registry of authentication methods (including, for example, facial recognition, fingerprints, proof of possession of a hardware key, etc.) |
| [RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252) | OAuth 2.0 for Native Apps|This RFC recommends external user-agents like in-app browser tabs as the only secure and usable choice for OAuth, rather than embedded user-agents.|
| [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414) | OAuth 2.0 Authorization Server Discovery Metadata|This defines how an OAuth 2.0 Client can interact with an authorisation server by providing a discovery endpoint that provides the endpoints and authorisation server capability.|
| [RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628) | OAuth 2.0 Device Authorization Grant | Enables OAuth clients to obtain user authorisation on devices where user input is constrained or impractical (like smart TVs, media consoles, digital printers). |
| [RFC 8693](https://datatracker.ietf.org/doc/html/rfc8693) | OAuth 2.0 Token Exchange| Defines a protocol for a lightweight HTTP and JSON based Security Token Service (STS) – covering requests of tokens from an Authorisation Server.|
| [RFC 8705](https://datatracker.ietf.org/doc/html/rfc8705) | OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens | Describes OAuth client authentication and certificate-bound access and refresh tokens using mutual Transport Layer Security (TLS) authentication with X.509 certificates. |
| [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) | Resource Indicators for OAuth 2.0 | Specifies an extension to the OAuth 2.0 Authorisation Framework defining request parameters that enable a client to explicitly signal to an authorisation server about the identity of the protected resource(s) to which it is requesting access. |
| [RFC 6755](https://datatracker.ietf.org/doc/html/rfc6755) | An IETF URN Sub-Namespace for OAuth|This document establishes an IETF URN Sub-namespace for use with OAuth-related specifications. |
| [RFC 9449](https://datatracker.ietf.org/doc/html/rfc9449) | OAuth 2.0 Demonstrating Proof-of-Possession at the Application | This specification describes a mechanism for sender-constraining OAuth 2.0 tokens via a proof-of-possession mechanism on the application level and enables a client to demonstrate proof-of-possession of a public/private key pair by including a "DPoP" header (JWT) in an HTTP request, that enables the authorisation server to bind issued tokens to the public part of a client's key pair. This mechanism allows for the detection of replay attacks with access and refresh tokens.|
| [RFC 9126](https://datatracker.ietf.org/doc/html/rfc9216) | OAuth 2.0 Pushed Authorization Requests | Pushed authorization requests (PAR)enable OAuth Clients to push the payload of an authorisation request directly to the authorisation server in exchange for a request URI value, which is used as reference to the authorisation request payload data in a subsequent call to the authorisation endpoint via the user-agent.|
| [RFC 9396](https://datatracker.ietf.org/doc/html/rfc9396) | OAuth 2.0 Rich Authorization Requests | This document specifies a new parameter "authorization_details" that is used to carry fine grained authorisation data in the OAuth authorisation request. |
| [RFC 9101](https://datatracker.ietf.org/doc/html/rfc9101) | The OAuth 2.0 Authorization Framework: JWT-Secured Authorization Request (JAR) | Introduces the ability to send request parameters in a JSON Web Token (JWT) instead, which allows the request to be signed with JSON Web Signature (JWS) and encrypted with JSON Web Encryption (JWE) so that the integrity, source authentication and confidentiality property of the Authorization Request is attained. |
| [RFC 9207](https://datatracker.ietf.org/doc/html/rfc9207) | OAuth 2.0 Authorization Server Issuer Identification | Specifies an additional parameter "iss" that explicitly identifies the issuer as the authorisation server in the authorisation flow. If implemented correctly, the "iss" parameter serves as an effective countermeasure to "mix-up attacks" which are aimed to steal an authorisation code or access token by tricking the client into sending the authorisation code or access token to the attacker instead of the honest authorisation or resource server. |
| [RFC 9068](https://datatracker.ietf.org/doc/html/rfc9068) | JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens | This specification defines a profile for issuing OAuth 2.0 access tokens in JSON web token (JWT) format. Authorisation servers and resource servers from different vendors can leverage this profile to issue and consume access tokens in an interoperable manner. |

---

## HISO standards

The requirements in these standards are derived in part where applicable from the following HISO standards.

**HISO 10029:2022** Health Information Security Framework (HISF)

- *HISO 10029.1:2023 Health Information Security Framework Guidance for Hospitals*
- *HISO 10029.2:2023 Health Information Security Framework Guidance for Micro to Small Organisations*
- *HISO 10029.3:2023 Health Information Security Framework Guidance for Medium to Large Organisations*
- *HISO 10029.4:2023 Health Information Security Framework Guidance for Suppliers*

### Key points in relation to HISO standards

- All personal health information is treated as MEDICAL IN CONFIDENCE and given an equal level of protection unless otherwise classified.
- From a practitioner viewpoint, IN CONFIDENCE mirrors doctor patient confidentiality and means that a person’s health information won’t be disclosed unless consented to or authorised by that person (eg, through a privacy fact sheet), by another authorised person, under statutory authority or by a legal instrument (eg, an Approved Information Sharing Agreement).
- Hospitals are to make use of developed and configured APIs for secure transfer of health information between different cloud components.
- Organisations are to make use of developed and configured APIs for secure transfer of information between different cloud components.

---

## Emerging Internet standards

The following are RFCs are pertinent to consider but not yet formally endorsed for use.

|Description|High Level view|
| :--- | :--- |
| JWT Response for OAuth Token Introspection | The introspection response, as specified in OAuth 2.0 Token is a plain JSON object. This specification extends the token introspection endpoint with the capability to return responses as JWTs.|
| The OAuth 2.1 Authorization Framework | This is an in-progress update to version 2.0, Key points to note are:<br/>PKCE is required for all OAuth clients using the authorization code flow Redirect URIs must be compared using exact string matching The following grants are omitted:<br/><br/>The Implicit grant<br/><br/>The Resource Owner Password Credentials<br/><br/>Bearer token usage omits the use of bearer tokens in the query string of URIs<br/><br/>Refresh tokens for public clients must either be sender-constrained or one-time use
| OAuth 2.0 Security Best Current Practice | This document describes best current security practice for OAuth 2.0. It updates and extends the OAuth 2.0 Security Threat Model to incorporate practical experiences gathered since OAuth 2.0 was published and covers new threats relevant due to the broader application of OAuth2.0.
| OAuth 2.0 for Browser-Based Apps | This specification describes the current best practices for implementing OAuth 2.0 authorization flows in applications executing in a browser.<br/><br/>An application that is dynamically downloaded and executed in a web browser, usually written in JavaScript. Also, sometimes referred to as a "single-page application", or "SPA".<br/><br/>One of the key recommendations is the use of PKCE.|
| BCP195 | Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)
| BCP212 | OAuth 2.0 for Native Apps
| JARM | Financial-grade API: JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)
| OIDC | OpenID Connect Core 1.0 incorporating errata set 1
| OIDD | OpenID Connect Discovery 1.0 incorporating errata set 1
| RFC6125 | Representation and Verification of Domain-Based Application Service Identity within Internet Public Key Infrastructure Using X.509 (PKIX) Certificates in the Context of Transport Layer Security (TLS)
| RFC7231 | Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
| X.1254 | Entity authentication assurance framework

---
