---
title: Mapping Standards Components to API Security Framework
---
:::tip[Status]
Ready for review
:::

API Concepts section of this standard define the following components

- API Provider
- API Consumer
- Health Sector Participants (human)
- Health Sector Organisation
- Health Workers
- API Designers
- API Developers

The two standards that Health NZ SHOULD use to protect and secure API resources are **OAuth 2** and **OpenID Connect**.

OpenID Connect adds Identity to the mix and is built on OAuth 2 but uses a different naming standard to define similar capabilities.

This section captures the key components of these standards to help clarify the similarities and differences between the two standards.

On top of these, additional standards have been defined that focus on additional security features and enhancements.

## OAuth 2.0

### Overview

The fundamental components of a solution using the OAuth 2.0 framework are illustrated below.

<img src="/img/content/image20.png" alt="Diagram of OAuth 2.0 framework components"/>

<span id="_Toc74234876" class="anchor"></span>Figure 24: OAuth 2.0 Components

### Applicability

The OAuth 2 standard defines a **foundation** for delegated authority which designers/implementers of health sector API solutions **SHOULD** build on.  It is important to note that OAuth 2 leverages external authentication and authorisation services to enable mobile / web applications to act with the *delegated authority* of a user.  OAUTH 2.0 uses security tokens (and information related to the token) to authorise access to a protected resource, without requiring the owner of the data (e.g. a patient and their records) to have to share their sensitive credentials.

OAuth 2.0 provides a more comprehensive and extensible approach to security than some of the basic authentication and authorisation mechanisms.

Although OAuth 2 is used in consent and delegation flows it expects the following two areas to be covered outside the OAuth 2 standard:

1. Authentication of the End User / Resource Owner when they login (using their credentials) to provide consent, normally delivered  via a redirect
2. Capturing and Management of the consent request and approval process or the consent itself which defines specific permissions (e.g. read) to the client (application) that wants access a resource API

Other API Security Standards are layer on top of OAuth 2 to provide additional functionality or features to address security concerns. This can increase the complexity and performance of the solution therefore it is important to select the required API security architecture to:

1. Match the type of resource, for example a Patient records or a list of GP in Wellington
2. The risk involved (Exposure of personal data)
3. The application architecture from which the API is being called, e.g. Mobile, Native or Web application

### OAUTH versions

Designers and implements of APIs **SHOULD** follow the recommendations in the table below when considering the OAUTH version to use.

| OAUTH version | Summary                                           | When to use                                       |
| :------------ | :------------------------------------------------ | :------------------------------------------------ |
| *1.0a*  | OAuth 1.0a is derived from the original OAuth 1.0 specification (RFC 5849) which provided a method for client applications to access resources on behalf of a resource owner. It forms an authentication framework for exchange of signed tokens. | This version was made obsolete by OAuth 2.0. and **SHOULD NOT** be used by NZ health sector APIs |
| *2.0*   | OAuth 2.0 is an open standard framework for *delegated authorisation*, based on token exchange.  It is not backward-compatible with OAuth 1.0, the primary difference being that it secures tokens by mandating TLS on all communication connections (RFC 6749) (instead of OAUTH 1 digital signatures) | This is the current standard but is being superceded by version 2.1. NZ health sector APIs **SHOULD** use this standard as the base framework for their API security architecture     |
| *2.1* | This update to OAuth 2.0 tightens the supported flows and applies additional security. | This is expected to become the standard and NZ health sector APIs **SHOULD** therefore review and support this specification.  If misalignment with OAuth 2.0 or ambiguity arises, API designers/developers are advised to implement the OAuth 2.1 recommendations. |

## OpenID Connect

OpenID Connect is the recommended security profile for the use of OAuth 2.0 authentication security tokens when an API requires more secure authentication e.g. when data is a two-way flow between the consuming application and the API. (e.g. read and write). It introduces the concept of Identity in the form of an ID Token that can contain information about the end user which can be used to:

1. Enhance the process and user experience during the onboarding process

2. Provide an SSO capability

3. Secure transfer of user data

4. Enrich the user experience

5. Provides a trust framework \[integrity\] for Service and Identity Providers to share consented user data

OpenID Connect's fundamental security components are similar to OAuth 2, just having different names.  The only significant difference from OAuth 2.0 is the ID token as highlighted in the diagram below.

<img src="/img/content/image44.png" alt="Diagram of OpenID Connect components, showing similarity to OAuth framework"/>

<span id="_Toc74234876" class="anchor"></span>Figure 25: OpenID Connect
<p class="small-text">
|Oauth 2 Component|OpenID Connect Component| API Standards Component| Description|
|---|---|---|---|
|Resource Owner| End User/Customer|-   Health Sector Participant<br/>-  Health Worker |-    The person who has the right to grant a third party (e.g. a consuming application) access to a protected resource (e.g. information about themselves).<br/>- the resource owner can be the customer.<br/>-  In OIDC this human is the entity for whom identity information is being requested or provided ho has the right to grant a Relying party (e.g. a consuming application)access to a protected resource (e.g. information about themselves). |
|Client (Application)| Relaying Party | API Consumer | A consuming / 3rd Party application requesting access to a protected resource on behalf of the resource owner with their consent e.g. a mobile application on a user’s (third party) smartphone or a web application accessed via a browser. The client application that supports OAuth 2 and relies on the OpenID provider to authenticate the user and request claims about the user, to request access to a protected resource on behalf of a third party e.g. a mobile application on a user’s (third party) smartphone or a web application accessed via a browser. (or Cloud app) |
|OAuth 2 Server Authorisation Server|OpenID Provider Server  Authorisation Server | | provides a Security Token Server / Infrastructure for managing tokens. It is responsible for issuing and tracking: (Token Management)<br/>- Authorisation (code) grant – approval tokens driven by Resource Owner approval<br/>- Access tokens used by the API to authorise access - prove that the resource owner authorised the client to act of their behalf over a specific resource for a limited period of time<br/>- Refresh tokens which allow new access tokens to be requested by the client and re-issued within a specified timeframe<br/>- ID Token which are digital signed JWT that contain additional information about the end user and the signing  and encrypted of the JWT can add additional security capability|
|Authentication Server|Authentication Server | Owned by a Health Sector Organisation |This is not a component of OAuth 2.0 / OpenID Connect, or defined by OAuth 2 / OpenID Connect, but needs to be considered when defining a complete OAuth 2.0/OpenID Connect framework. This could be a simple login capability or managed by an Identity Service Provider. It is responsible for:<br/>- Login Page and capture of credentials<br/>- Consent capture and Management|
|Resource Server/ Provider|Resource Server/ Provider|API Provider|This hosts the protected resources (APIs & backend applications) which only allow authenticated and authorised clients by:<br/>- Checking the access token in each incoming API request<br/>- Validating the access token against the Authorisation Server and the permitted access rights
</p>
