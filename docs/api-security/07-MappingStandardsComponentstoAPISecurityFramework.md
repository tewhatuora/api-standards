---
title: Mapping Standards Components to API Security Framework
---


API Concepts section of this standard define the following components

- API Provider
- API Consumer
- Health Sector Participants (human)
- Health Sector Organisation
- Health Workers
- API Designers
- API Developers

The two standards that Te Whatu Ora **SHOULD** use to protect and secure API resources are **OAuth 2.0** and **OpenID Connect**.

OpenID Connect adds Identity to the mix and is built on OAuth 2.0 but uses a different naming standard to define similar capabilities.

This section captures the key components of these standards to help clarify the similarities and differences between the two standards.

On top of these, additional standards have been defined that focus on additional security features and enhancements.

## OAuth 2.0

### Overview

The fundamental components of a solution using the OAuth 2.0 framework are illustrated below.

<img src="/img/content/oidc-no-id-token.png" alt="Diagram of OAuth 2.0 framework components"/>

<DetailedDescription text="The diagram depicts a typical OpenID Connect authentication and authorization flow, where a user grants approval to an oidc provider, which then redirects to an authentication server. After successful authentication, tokens are issued and used by a client application to access protected resources."/>

### Applicability

The OAuth 2.0 standard defines a **foundation** for delegated authority which designers/implementers of health sector API solutions **SHOULD** build on.  It is important to note that OAuth 2.0 leverages external authentication and authorisation services to enable mobile / web applications to act with the *delegated authority* of a user.  OAuth 2.0 uses security tokens (and information related to the token) to authorise access to a protected resource, without requiring the owner of the data (e.g. a patient and their records) to have to share their sensitive credentials.

OAuth 2.0 provides a more comprehensive and extensible approach to security than some of the basic authentication and authorisation mechanisms.

Although OAuth 2.0 is used in consent and delegation flows it expects the following two areas to be covered outside the OAuth 2.0 standard:

1. Authentication of the End User / Resource Owner when they login (using their credentials) to provide consent, normally delivered  via a redirect
2. Capturing and Management of the consent request and approval process or the consent itself which defines specific permissions (e.g. read) to the client (application) that wants access a resource API

Other API Security Standards are layers on top of OAuth 2.0 to provide additional functionality or features to address security concerns. This can increase the complexity and performance of the solution therefore it is important to select the required API security architecture to:

1. Match the type of resource, for example a Patient record or a list of GPs in Wellington
2. The risk involved (Exposure of personal data)
3. The application architecture from which the API is being called, e.g. Mobile, Native or Web application

### OAuth 2.0 versions

Designers and implements of APIs **SHOULD** follow the recommendations in the table below when considering the OAuth 2.0 version to use.

| OAuth 2.0 version | Summary                                           | When to use                                       |
| :------------ | :------------------------------------------------ | :------------------------------------------------ |
| *1.0a*  | OAuth 1.0a is derived from the original OAuth 1.0 specification (RFC 5849) which provided a method for client applications to access resources on behalf of a resource owner. It forms an authentication framework for exchange of signed tokens. | This version was made obsolete by OAuth 2.0. and **SHOULD NOT** be used by NZ health sector APIs |
| *2.0*   | OAuth 2.0 is an open standard framework for *delegated authorisation*, based on token exchange.  It is not backward-compatible with OAuth 1.0, the primary difference being that it secures tokens by mandating TLS on all communication connections (RFC 6749) (instead of OAuth 1.0 digital signatures) | This is the current standard but is being superseded by version 2.1. NZ health sector APIs **SHOULD** use this standard as the base framework for their API security architecture     |
| *2.1* | This update to OAuth 2.0 tightens the supported flows and applies additional security. | This is expected to become the standard and NZ health sector APIs **SHOULD** therefore review and support this specification.  If misalignment with OAuth 2.0 or ambiguity arises, API designers/developers are advised to implement the OAuth 2.1 recommendations. |

## OpenID Connect (OIDC)

OpenID Connect is the recommended security profile for the use of OAuth 2.0 authentication security tokens when an API requires more secure authentication e.g. when data is a two-way flow between the consuming application and the API. (e.g. read and write). It introduces the concept of Identity in the form of an ID token that can contain information about the end user which can be used to:

1. Enhance the process and user experience during the onboarding process

2. Provide an SSO capability

3. Secure transfer of user data

4. Enrich the user experience

5. Provides a trust framework \[integrity\] for Service and Identity Providers to share consented user data

OpenID Connect's fundamental security components are similar to OAuth 2.0, just having different names.  The only significant difference from OAuth 2.0 is the ID token as highlighted in the diagram below.

<img src="/img/content/oidc-id-token.png" alt="Diagram of OpenID Connect components, showing similarity to OAuth 2.0 framework"/>

<DetailedDescription text="The diagram depicts a typical OpenID Connect authentication and authorization flow, where a user grants approval to an oidc provider, which then redirects to an authentication server. After successful authentication, tokens are issued and used by a client application to access protected resources. The diagram is similar to the previous diagram with the addition of an id token"/>

|Oauth 2.0 Component|OpenID Connect Component| API Standards Component| Description|
|---|---|---|---|
|Resource Owner| End User<p/>Customer|Health Sector Participant|<li>The person who has the right to grant an API consumer (e.g. a consuming application) access to a protected resource (e.g. information about themselves).</li><p/><li>The resource owner can be the health sector participant.</li><p/><li>In OIDC this human is the entity about whom identity information is being requested or provided and who has the right to grant a Relying party (e.g. an API consumer) access to a protected resource (e.g. information about the health sector participant).</li> |
|Client (Application)| Relying Party | API Consumer |<li>A consuming / 3rd Party application requesting access to a protected resource on behalf of the resource owner with their consent e.g. a mobile application on a health sector participant's smartphone or a web application accessed via a browser.</li><p/><li>The client application that supports OAuth 2.0 and relies on the OpenID provider to authenticate the health sector participant and request claims about them, and then request access to a protected resource on behalf of an API consumer.</li> |
|OAuth 2.0 Server <p/>Authorisation Server|OpenID Provider Server<p/>Authorisation Server | Owned by a Health Sector Organisation |<li>Provides a security token server / Infrastructure for managing tokens (token management). It is responsible for issuing and tracking the following tokens:</li><li>**Authorisation code** (approval token) driven by Resource Owner approval</li><li>**Access tokens** used by the API to authorise access - prove that the resource owner authorised the client to act of their behalf over a specific resource for a limited period of time</li><li>**Refresh tokens** which allow new access tokens to be requested by the client and re-issued within a specified timeframe</li><li>**ID Tokens** which are digital signed JWTs that contain additional information about the end user and the signing  and encrypted of a JWT can add additional security capability</li>|
|Authentication Server|Authentication Server | Owned by a Health Sector Organisation |<li>Not a component of OAuth 2.0 / OpenID Connect, or defined by OAuth 2.0 / OpenID Connect, but needs to be considered when defining a complete OAuth 2.0/OpenID Connect framework.</li><p/><li>An authentication server could be a simple login capability or managed by an Identity Service Provider. It is responsible for:</li><li>Login Page and capture of credentials</li> -  Consent capture and Management|
|Resource Server/ Provider|Resource Server/ Provider|API Provider|A resource server hosts protected resources (APIs & backend applications) which only allow authenticated and authorised clients by:<p/><li>Checking the access token in each incoming API request</li><p/><li>Validating the access token against the Authorisation Server and the permitted access rights</li>
