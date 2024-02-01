---
title: Security Controls
---
:::warning[Status]
Content is draft and in review – this content may change until review is complete and formally published.
:::

Depending on the classification of the information that is presented in the APIs and the Risk Framework applied, different access controls will need to be applied. This section provides a summary of the controls that **SHOULD** be implemented when protecting Health APIs. The five areas that **MUST** be considered are:

- Confidentiality

- Integrity

- Availability

- Threat Protection

- Monitoring, Logging and Auditing

Using the Resource Type definition detailed in FHIR, the controls above will be mapped to the different resources:

|Resource Type|Data Type|Classification|
|---|---|---|
|Anonymous Read Access|<li>Does not contain any individual data, or business sensitive data</li><li>Contains important information that must be authenticated back to the source publishing them</li>**Examples:**<li>Capability Statement</li><li>Clinical User Definition</li>| PUBLIC|
|Business|<li>Does not contain any individual data</li><li>Contains data that describe business or service sensitive data</li><li>Contains data related to organisation, location, or other group that is not identifiable as individuals</li>**Examples:**<li>Location</li><li>Medication</li>| IN-CONFIDENCE|
|Individual|<li>Does NOT contain Patient data</li><li>Contains individual information about other participants i.e. Practitioners and Practitioner Role.</li> **Examples;**<li>Practitioner</li><li>Practitioner Role</li>| IN-CONFIDENCE|
|Patient|<li>Contain highly sensitive health information</li><li>Closely linked to highly sensitive health information</li>**Examples:**<li>Procedure</li><li>Invoices</li>| SENSITIVE|

The following controls are recommended by the FHIR specification and **MUST** be implemented by the API provider:

|Resource Type|Control Required|
|---|---|
|Anonymous Read Access|<li>No access control based on the user or system requesting are required</li><li>**MUST** use TLS (HTTPS) to provide authentication of the server and integrity protection in transit</li>|
|Business|<li>Client authentication is required to assure that only authorized access is given</li><li>The Client can be a person or a System</li>Client authentication methods **SHOULD** use at least one of:<li>mutual-authenticated-TLS</li><li>APIKey</li><li>App signed JWT</li><li>App OAuth client-id JWT</li><li>Business protected Provider Directory can be used to provide information that can be used for ABAC / RBAC controls</li>|
|Individual|<li>Apply RBAC or ABAC access polices</li>|
Patient|<li>Often requires a declared Purpose Of Use</li><li>Controlled by a Privacy Consent</li><li>Security labels to differentiate various confidentiality levels within this broad group of Patient Sensitive data</li>|

## Confidentiality and Integrity

Confidentiality and integrity cover the handling of request and response data, both in transit and at rest. The aim is to protect the payload content from unauthorised access (eavesdropping), manipulation or faking of content. An API request needs to be received intact by the API, with validation as to the source of the request. Untampered API responses need to be received by the consuming application, with confirmation that they are legitimately from the API.

|Data Classification | Control|
|---|---|
|Public|<li>TLS 1.3 **MUST** be applied between client, authorisation server and resource server</li><li>**MAY** encrypt the payload</li><li>Authentication **MAY** be applied</li><li>Coarse grained Authorisation **MAY** be applied</li>|
|In-Confidence|<li>TLS 1.3 **MUST** be applied, MTLS **MAY** be applied, between client, authorisation server and resource server</li><li>Encryption of the payload **SHOULD** be considered</li><li>Strong Authentication **SHOULD** be applied</li><li>Fine grained Authorisation **SHOULD** be applied using ABAC or RBAC</li>|
|Sensitive|<li>TLS 1.3 MTLS **MUST** applied between client, authorisation server and resource server</li><li>The Payload **MUST** be encrypted</li><li>Security Tags (labels) **MUST** be used for FHIR APIs to apply the masking or removal sensitive data in the response</li><li>Strong Authentication **MUST** be applied</li><li>Coarse grained Authorisation **MUST** be applied</li><li>Fine grained Authorisation **MUST** be applied</li>|

The following table details the data classification application for API Security using OAuth 2 and OpenID Connect:

|Data Classification | API Security Control (Grant Flows)|
|---|---|
|Public|<li>Client Credentials with Scopes **MAY** be applied</li><li>Implicit Grant flow with PKCE **SHOULD NOT** be applied</li><li>Authorisation Code grant with PKCE **MAY** be applied</li>|
|In-confidence|<li>Client Credentials with Scopes **MUST NOT** be applied</li><li>Implicit Grant flow **MUST NOT** be applied</li><li>Authorisation Code grant with PKCE **SHOULD** be applied</li>|
|Sensitive|<li>Client Credentials with Scopes **MUST NOT** be applied</li><li>Implicit Grant flow **MUST NOT** be applied</li><li>Authorisation Code grant with PKCE **MUST** be applied</li> |

|Grant Type| Control Required| Status |
|---|---|---|
|Client Credentials with Scopes|<li>OAuth 2 **SHOULD** be applied, **MAY** use OpenID Connect</li><li>Client_secret_post token endpoint authorisation **SHOULD** be applied</li><li>Access Tokens **MAY** be signed to validate integrity</li><li>The authorisation server **MUST** validate the scopes</li>| Supported :white_check_mark: |
|Implicit grant with PKCE |<li>OpenID Connect **SHOULD** be applied using an openid scope in the authentication request</li><li>Client_secret_post or client_secret_jwt or private_key_jwt token endpoint authorisation **SHOULD** be applied</li><li>Access Tokens **MUST** be signed to validate integrity</li><li>The authorisation server **MUST** validate the scopes</li><li>PKCE **SHOULD** be allied to mitigate stolen authorisation codes</li><li>The response_type **SHOULD** be id_token token</li><li>The state parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the response</li><li>If OpenID Connect is used the nonce parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the id_token</li>| Deprecated :warning: |
| Authorisation Code grant with PKCE  |<li>OpenID Connect **MUST** be applied using an openid scope in the authentication request</li><li>private_key_jwt token endpoint authorisation **MUST** be applied</li><li>Access Tokens **MUST** be signed to validate integrity</li><li>The authorisation server **MUST** validate the scopes</li><li>PKCE **MUST** be applied to mitigate stolen authorisation codes</li><li>The response_type **MUST** be code id_token</li><li>The state parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the response</li><li>The nonce parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the id_token</li><li>Client secrets **MUST** be securely stored</li><li>id_token **SHOULD** be used as a detached signature</li><li>The flow **SHOULD** contain c_hash,at_hash and c_hash values</li><li>Encryption of the id_token **MAY** be used</li><li>Demonstration of Proof-of-Possession **SHOULD** be applied to tie an Access Token to a client</li>| Supported :white_check_mark: |

### Hash Values

In OpenID Connect, the c_hash, at_hash, and s_hash values are used to enhance the security and integrity of the authorisation process.

#### c_hash (Code Hash)

- Used in the authorisation code flow when using response_type=code id_token
- The response to the client is a code and the first id_token
- The id_token signature is validates by obtaining the JWKS from the the Authorisation Server JWK endpoint
- Parsing the id_token the c_hash is found and using SHA-256 (defined in the header of the id_token "alg") compares the code with the c_hash

#### at_hash (Access Token Hash)

- Used in the authorisation code flow when using response_type=code id_token
- The response to the client when the code is presented to the token endpoint is a JWT access token and and id_token
- The id_token signature is validated by obtaining the JWKS from the the Authorisation Server JWK endpoint
- Parsing the id_token the at_hash is found and using SHA-256 (defined in the header of the id_token "alg") compares the access token with the at_hash
- Provides Access token integrity

#### s_hash (State Hash)

- Used in the authorisation code flow and implicit flow when using response_type=code id_token the authorisation request includes a state value created by the client
- The response to the client is a code and and the first id_token
- The id_token signature is validated by obtaining the JWKS from the the Authorisation Server JWK endpoint
- Parsing the id_token the s_hash is found and using SHA-256 (defined in the header of the id_token "alg") compares the state with the s_hash

### State (Integrity)

State is also a parameter that **MUST** be used during the authorisation grant stage to provide a level of security to address possible man-in-the-middle attacks. The state parameter is a string of random letters and numbers that is sent to the Authorisation Server by the client when requesting an authorisation code. It is sent back to the client with the Authorisation Code and **MUST** be verified by the API consumer application to confirm the authenticity of the response i.e. it came from the authorisation server to which the request was sent.

### Content Encryption (Confidentiality)

If content needs only to be visible to specific consumer endpoints, use encryption. However, if content only needs to be guaranteed untampered and/or from a specific source (e.g. provider) then use content signing. Content encryption enables all or part of an API payload to be readable only by the target consumer(s). This is useful where the content being carried by the API is sensitive, and the API request or response transits multiple stopping points. Whilst TLS protects the payload in transit, it only applies to each point to point connection between components (e.g. mobile app to API gateway). If transit components are not totally under the provider’s control, it can be worthwhile performing payload encryption. E.g. it may be sensible to encrypt credit card details passed between consumer and provider backend systems.

It is also worth considering how much protection the information needs whilst at rest. Data at rest encryption is generally considered good practice and may cloud service providers offer this as standard. See [NZISM](https://nzism.gcsb.govt.nz/ism-document/#Section-15746) for details.

Encryption is only worthwhile implementing when data sensitivity or data protection requirements drive it, as encryption can be computationally intensive. It also makes it more difficult for protection mechanisms, such as API gateways, to validate and transform API content. When only the integrity of the content passed needs to be ensured, consider using Content Signing instead.

There are many existing ways of encrypting message content, built into code libraries and development tools. It is required that any content encryption adheres to the standard algorithms laid out in [NZISM (HMAC Algorithms)](https://nzism.gcsb.govt.nz/ism-document/#Section-15853).

### Content Signing (Integrity)

Content signing is used to assure content integrity and proof of authorship. It can apply to the entire payload of the API request/response or specific elements of that content e.g. credit card details. There are many approaches to content signing and the most appropriate approach is requirements dependent. Standard signing algorithms exist within coding libraries, and JWT has a payload that can contain verifiable (signed) JSON fields.

Signing has less of a computational overhead than encryption, but can still affect performance, so it is advisable that it be used only when and where needed. This is covered under:

- [RFC 7800 Proof of Possession - OAuth 2.0 Proof-of-Possession (PoP) Security Architecture (draft)](https://datatracker.ietf.org/doc/html/rfc7800)

Where Bearer Tokens are used, they **MUST** be JSON Web Tokens (JWT) signed using JSON Web Signature as defined in:

- [JSON Web Token (JWT) RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)

- [JSON Web Signature (JWS) RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515)

- [JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants RFC 7523](https://datatracker.ietf.org/doc/html/rfc7523)

### Non-Repudiation (Integrity)

Non-repudiation covers the means to ensure that a consumer cannot deny making a request and, similarly, a provider cannot claim they did not send a response. To aid non-repudiation for APIs, it is important to ensure credentials are not shared between consumers and to perform comprehensive logging of API request/responses.

Digital signatures are useful for not just guaranteeing authenticity and integrity, but also supporting non-repudiation.

### Organisation controls for all APIs

The following is a list of controls:

- **MUST** enforce access controls at the API provider edge
  - Throttling to address DoS
  - Message analysis to block HTTP attacks; parameter attacks such as cross-site scripting, SQL injection, command injection and cross site request forgery
- **MUST** use short lived Access Tokens
- **SHOULD** use JWT Access and Refresh Tokens
- The Authorisation Server **MUST** provide a Token Revocation endpoint
- The Authorisation Server **MUST** provide a Token Introspection endpoint
- Token Signing **MUST** use EdDSA or ECDA when protecting sensitive information
- Token Encryption **MUST** use RSA-OAEP
- Hashing algorithms that **MUST** be applied or SHA-256 or SHA-384
- All communications to or from an API **MUST** be over TLS 1.3 or higher. Other versions of TLS and SSL should be disabled. This provides a recognised level of confidentiality that covers all communications between all components.
- API consumer applications **MUST** validate TLS certificate chains when making requests to protected resources, including checking the Certificate Revocation List (CRL).

## Availability and Threat Protection

Availability in this context covers threat protection to minimise API downtime, looks at how threats against exposed APIs can be mitigated using basic design principles and how to apply protection against specific risks and threats.

Availability also covers scaling to meet demand and ensuring hosting environments are stable etc. These levels of availability are addressed across hardware and software stacks that support the delivery of APIs. There are no specific standards for availability, but availability is normally addressed under business continuity and disaster recovery standards. These standards recommend a risk assessment approach to define API availability requirements. Further information on business continuity and risks can be found at [Standards New Zealand website](https://www.standards.govt.nz)

For cloud services, the New Zealand Government ICT website provides an [assessment capability that includes a risk assessment tool](https://www.ict.govt.nz/guidance-and-resources/information-management/requirements-for-cloud-computing/vendor-answer-sets/) which covers availability, business continuity and disaster recovery related questions.

:::info[Risks]
As mentioned in section [Consideration of Risks](./RiskConsideration), there are various types of risk which impact APIs. This includes threats to availability as well as confidentiality and integrity.
:::

Where the resources being exposed by an API are sensitive i.e. not public data, the following rules apply:

- Threat assessment **MUST** be assessed on in the API development lifecycle

- Penetration testing **MUST** be performed once an API is developed and published (testable) and on a regular schedule post publication

- Automated vulnerability testing tools **MUST** be used to give an indication of vulnerabilities in API implementations.

Below is a table of risk types and some approaches that **SHOULD** be used to help mitigate these threats:

|Threat | Mitigation (OWASP)|
|---|---|
|Exposure of inappropriate API methods to access services|<li>Protect and Limit (whitelist) the HTTP Methods (GET, PUT etc) exposed</li><li>Validate Method(s) for session token / API key.</li>|
|Denial of Service attacks|<li>Throttle access to all exposed APIs. Monitor use to indicate possible DoS attacks</li>|
|Malicious Input, Injection attacks and Fuzzing|<li>Validate input: Secure parsing and strong typing</li><li>Validate incoming content-type application/json</li><li>Validate JSON content</li><li>Validate XML (schema and format)</li><li>Scan attachments</li><li>Produce valid HTTP Return Code</li><li>Validate response</li>|
|Cross-Site Request Forgery|<li>Use tokens with state and nonce parameters</li>|
|Cross-Site Scripting Attacks|<li>Validate Input</li>|

### Token Threat Mitigation

Securing OAuth flows relies on the exchange of tokens between consuming applications and API provider servers. There is always the threat of these tokens being obtained illicitly, losing confidentiality and integrity of message content or the integrity of the sender of the token. This risk also applies to the transferring of API keys.

The table below captures the main Token threats and  mitigation strategies that **SHOULD** be applied:

|Threat|Mitigation|
|---|---|
|Token Manufacture or modification (fake tokens and man in the middle attacks)|<li>Digital signing of tokens (e.g. JWS with JWT) or attaching a Message Authentication Code (MAC)</li>|
|Token disclosure – man in the middle attack.<br/>The Access Token is passed in clear text with no hashing, signing or encryption.|Communication Security:<li>Use TLS 1.3 with a cipher suite that includes DHE or ECDHE</li>The client application must validate:<li>The TLS certificate chain</li><li>Check the certificate revocation list</li><li>Stored locally in a file or LDAP server</li>|
|Token Redirects.<br/>Ensure the Authentication and Resource Servers are "paired”, and the access token can only be used in this between the specified servers|<li>Using the "audience” header (defined currently in a draft RFC) the client application, resource server and authorisation server can help *ensure that the token can only be used on the resource servers requested by the client and recognised by the authorisation server* </li><li>Also addressed with "state” parameter in the header</li><li>Signing of tokens is also applicable to address token redirects</li>|
|Token replay – where the threat actor copies an existing token (e.g. refresh token or authorisation code) and reuses it on their own request|<li>Limit lifetime of the token (e.g. 10 minutes) – turning it into a short-lived issue</li><li>Use signed requests along with nonce and timestamps</li><li>Validate TLS certificate chain when accessing Resource</li>|

## Monitoring, Logging and Alerting

Appropriate controls:

- All API interactions **MUST** be logged

- The request or response payload **SHOULD NOT** be logged

- PII information **MUST NOT** be logged

- Sensitive information in headers **MUST NOT** be logged (e.g. tokens, API Keys etc.)

- Full Content logging **MUST NOT** be applied

- The use and issuance of Access Tokens **MUST** be monitored

- Monitoring the Oauth flow **SHOULD** be performed for suspicious activity and regularly auditing logs can help detect and prevent potential security breaches. This includes monitoring for anomalous requests, access attempts to unauthorized resources, and unusual client behavior.

- Traditional logging, alerting and incident management practices also apply to APIs, along with additional considerations that **SHOULD** be applied:

  - Correlating API requests with specific back-end system activity and the resulting API responses to support end-to-end tracing - capture timestamps, user/consumer information and actions performed

  - Logging of user actions (login, logout) **SHOULD** be monitored

  - Identifying specific API requests from consumers to help resolve API consumer problems

  - Detecting events that may indicate a malicious attempt to access an API

  - Logs **MUST** be stored in a tamper-proof and secure location

- Regular security audits and vulnerability scanning **MUST** be planned and actioned to help identify and address potential security vulnerabilities in APIs.
