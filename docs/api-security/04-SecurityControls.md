---
title: Security Controls
---


## Classification

:::info[Classification]
For clarity the primary definition resource for classification in these standards is [HISO 10029:2022 Health Information Security Framework (HISF)](https://www.tewhatuora.govt.nz/publications/health-information-security-framework/). In HSIF the scope is defined as follows: "This framework covers the security of all health information that is collected and used within New Zealand; and wherever it is stored. All personal health information is treated as **MEDICAL IN CONFIDENCE** and given an equal level of protection unless otherwise classified."

Where there is NOT an appropriate representation in HSIF regarding classification the New Zealand Government [Protective Security Requirements (PSR)](https://protectivesecurity.govt.nz/classification-system/overview/) guidance is used
:::

### Endorsements

PSR classification guidelines include the use of [Endorsements](https://protectivesecurity.govt.nz/classification-system/overview/endorsements/). As per HSIF the primary classification for information covered by these API standards is **IN-CONFIDENCE** with the endorsement **MEDICAL**.

API providers **MUST** use the correct endorsement, following the guidelines in PSR, when undertaking classification analysis.

Depending on the classification of the information that is presented in the APIs and the Risk Framework applied, different access controls will need to be applied. This section provides a summary of the controls that **SHOULD** be implemented when protecting Health APIs. The five areas that **MUST** be considered are:

- Confidentiality

- Integrity

- Availability

- Threat Protection

- Monitoring, Logging and Auditing

Using the Resource Type definition detailed in FHIR, the controls above will be mapped to the different resources:

|Resource Type|Data Type|Classification|
|---|---|---|
|Anonymous Read Access|<li>Does not contain any individual data, or business sensitive data</li><li>Contains important information that must be authenticated back to the source publishing them</li>**Examples:**<li>Capability Statement</li><li>Clinical User Definition</li>| UNCLASSIFIED |
|Business|<li>Does not contain any individual data</li><li>Contains data that describe business or service sensitive data</li><li>Contains data related to organisation, location, or other group that is not identifiable as individuals</li>**Examples:**<li>Location</li><li>Medication</li>| MEDICAL IN-CONFIDENCE |
|Individual|<li>Does NOT contain Patient data</li><li>Contains individual information about other participants i.e. Practitioners and Practitioner Role.</li> **Examples;**<li>Practitioner</li><li>Practitioner Role</li>| MEDICAL IN-CONFIDENCE |
|Patient|<li>Contain highly sensitive health information</li><li>Closely linked to highly sensitive health information</li>**Examples:**<li>Procedure</li><li>Invoices</li>| MEDICAL IN-CONFIDENCE |

The following controls are recommended by the FHIR specification and **MUST** be implemented by the API provider:

|Resource Type|Control Required|
|---|---|
|Anonymous Read Access|<li>No access control based on the user or system requesting are required</li><li><ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." dupe="true">**MUST** use TLS (HTTPS) to provide authentication of the server and integrity protection in transit</ApiStandard></li>|
|Business|<li><ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." dupe="true">**MUST** use TLS (HTTPS) to provide authentication of the server and integrity protection in transit</ApiStandard></li><li><ApiStandard id="HNZAS_MUST_AUTHENTICATE_API_CONSUMERS" type="MUST" toolTip="Consumers of APIs must be authenticated to access resources." dupe="true">Client (API Consumer) authentication **MUST** be implemented.</ApiStandard></li><li>Client authentication methods **SHOULD** use at least one of:</li>&nbsp;&nbsp;&nbsp;&nbsp;(i)  Mutual-authenticated-TLS<br/>&nbsp;&nbsp;&nbsp;&nbsp;(ii)  APIKey<br/>&nbsp;&nbsp;&nbsp;&nbsp;(iii)  App signed JWT<br/>&nbsp;&nbsp;&nbsp;&nbsp;(iv)  App OAuth 2.0 client-id JWT |
|Individual|<li><ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." dupe="true">**MUST** use TLS (HTTPS) to provide authentication of the server and integrity protection in transit</ApiStandard></li><li><ApiStandard id="HNZAS_MUST_AUTHENTICATE_API_CONSUMERS" type="MUST" toolTip="Consumers of APIs must be authenticated to access resources." dupe="true">Client (API Consumer) authentication **MUST** be implemented.</ApiStandard></li><li>Client authentication methods **SHOULD** use at least one of:</li>&nbsp;&nbsp;&nbsp;&nbsp;(i)  Mutual-authenticated-TLS<br/>&nbsp;&nbsp;&nbsp;&nbsp;(ii)  APIKey<br/>&nbsp;&nbsp;&nbsp;&nbsp;(iii)  App signed JWT<br/>&nbsp;&nbsp;&nbsp;&nbsp;(iv)  App OAuth 2.0 client-id JWT<li>The health sector participant **MUST** be authenticated</li><li>Appropriate RBAC or ABAC access polices **MUST** be used</li><li>Any access to individual data **MUST** be controlled by a privacy consent</li>|
Patient|<li><ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." dupe="true">**MUST** use TLS (HTTPS) to provide authentication of the server and integrity protection in transit</ApiStandard></li><li><ApiStandard id="HNZAS_MUST_AUTHENTICATE_API_CONSUMERS" type="MUST" toolTip="Consumers of APIs must be authenticated to access resources." dupe="true">Client (API Consumer) authentication **MUST** be implemented.</ApiStandard></li><li>Client authentication methods **SHOULD** use at least one of:</li>&nbsp;&nbsp;&nbsp;&nbsp;(i)  Mutual-authenticated-TLS<br/>&nbsp;&nbsp;&nbsp;&nbsp;(ii)  APIKey<br/>&nbsp;&nbsp;&nbsp;&nbsp;(iii)  App signed JWT<br/>&nbsp;&nbsp;&nbsp;&nbsp;(iv)  App OAuth 2.0 client-id JWT<li>The health sector participant **MUST** be authenticated</li><li>Appropriate RBAC or ABAC access polices **MUST** be used</li><li>Any access to individual data **MUST** be controlled by a privacy consent</li><li>Often requires a declared Purpose Of Use</li><li>Security labels **SHOULD** be used to differentiate various confidentiality levels within this broad group of Patient Sensitive data</li>|

## API Provider controls for all APIs

The following is a list of controls and their applicability for all API Providers:

- **MUST** enforce [access controls](./APIAuthentcationandAuthorisationBasics#authorisation) at the API provider edge
  - [Throttling](#availability-and-threat-protection) to address Distributed Denial of Service (DDoS)attacks
  - [Message analysis](#availability-and-threat-protection) to block HTTP attacks; parameter attacks such as cross-site scripting (XSS), SQL injection, command injection and cross site request forgery (XSRF)
- **MUST** use [short lived Access Tokens](#token-threat-mitigation)
- **SHOULD** use [JWT](./SecuringAPIswithOAuth2andOpenIDConnect#json-web-token-jwt) Access and Refresh Tokens
- The Authorisation Server **MUST** provide a [Token Revocation endpoint](./SecuringAPIswithOAuth2andOpenIDConnect#oauth-2-and-openid-connect-endpoints-api-provider)
- The Authorisation Server **MUST** provide a [Token Introspection endpoint](./SecuringAPIswithOAuth2andOpenIDConnect#oauth-2-and-openid-connect-endpoints-api-provider)
- Token Signing **MUST** use [EdDSA or ECDSA](https://datatracker.ietf.org/doc/html/rfc8422#section-2.1) when protecting sensitive information
- Token Encryption **MUST** use [RSA-OAEP](https://datatracker.ietf.org/doc/html/rfc8017#section-7.1)
- Supported hashing algorithms **MUST** be applied as per the [NZISM](https://nzism.gcsb.govt.nz/ism-document/#Chapter-15745)
- All communications to or from an API **MUST** utilise [Transport Layer Security (TLS) 1.3](https://datatracker.ietf.org/doc/html/rfc8446) or higher. Other versions of TLS and SSL **SHOULD** be disabled. This provides a recognised level of confidentiality that covers all communications between all components. [Also see NZISM](https://nzism.gcsb.govt.nz/ism-document/#Section-15940)
- API consumer applications **MUST** [validate TLS certificate chains](https://datatracker.ietf.org/doc/html/rfc5280) when making requests to protected resources, including checking the Certificate Revocation List (CRL).

## Confidentiality and Integrity

Confidentiality and integrity cover the handling of request and response data, both in transit and at rest. The aim is to protect the payload content from unauthorised access (eavesdropping), manipulation or faking of content. An API request needs to be received intact by the API, with validation as to the source of the request. Untampered API responses need to be received by the consuming application, with confirmation that they are legitimately from the API.

|Data Classification | Control|
|---|---|
|UNCLASSIFIED|<li>TLS 1.3 **MUST** be applied between client, authorisation server and resource server</li><li>**MAY** encrypt the payload</li><li>Authentication **MAY** be applied</li><li>Coarse grained Authorisation **MAY** be applied</li>|
|MEDICAL IN-CONFIDENCE|<li>TLS 1.3 MTLS **MUST** applied between client, authorisation server and resource server</li><li>The Payload **MUST** be encrypted</li><li>Security Tags (labels) **MUST** be used for FHIR APIs to apply the masking or removal sensitive data in the response</li><li>Strong Authentication **MUST** be applied</li><li>Coarse grained Authorisation **MUST** be applied</li><li>Fine grained Authorisation **MUST** be applied</li>|

The following table details the data classification application for API Security using OAuth 2.0 and OpenID Connect:

|Data Classification | API Security Control (Grant Flows)|
|---|---|
|UNCLASSIFIED|<li>Client Credentials with Scopes **MAY** be applied</li><li>Implicit Grant flow with PKCE **SHOULD NOT** be applied</li><li>Authorisation Code grant with PKCE **MAY** be applied</li>|
|MEDICAL IN-CONFIDENCE|<li>Client Credentials with Scopes **MUST NOT** be applied</li><li>Implicit Grant flow **MUST NOT** be applied</li><li>Authorisation Code grant with PKCE **SHOULD** be applied</li>|

|Grant Type| Control Required| Status |
|---|---|---|
|Client Credentials with Scopes|<li>OAuth 2.0 **SHOULD** be applied, **MAY** use OpenID Connect</li><li>`client_secret_post` token endpoint authorisation **SHOULD** be applied</li><li>Access Tokens **MAY** be signed to validate integrity</li><li>The authorisation server **MUST** validate the scopes</li>| Supported :white_check_mark: |
|Implicit grant |<li>OpenID Connect **SHOULD** be applied using an `openid` scope in the authentication request</li><li>`client_secret_post` or `client_secret_jwt` or `private_key_jwt` token endpoint authorisation **SHOULD** be applied</li><li>Access Tokens **MUST** be signed to validate integrity</li><li>The authorisation server **MUST** validate the scopes</li><li>The `response_type` **SHOULD** be `id_token` token</li><li>The `state` parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the response</li><li>If OpenID Connect is used the `nonce` parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the `id_token`</li>| Deprecated :warning: |
| Authorisation Code grant with PKCE  |<li>OpenID Connect **MUST** be applied using an `openid` scope in the authentication request</li><li>`private_key_jwt` token endpoint authorisation **MUST** be applied</li><li>Access Tokens **MUST** be signed to validate integrity</li><li>The authorisation server **MUST** validate the scopes</li><li>PKCE **MUST** be applied to mitigate stolen authorisation codes</li><li>The `response_type` **MUST** be `code id_token`</li><li>The `state` parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the response</li><li>The `nonce` parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the `id_token`</li><li>Client secrets **MUST** be securely stored</li><li>`id_token` **SHOULD** be used as a detached signature</li><li>The flow **SHOULD** contain `c_hash`, `at_hash` and `s_hash` values</li><li>Encryption of the `id_token` **MAY** be used</li><li>Demonstration of Proof of Possession **SHOULD** be applied to tie an Access Token to a client</li>| Supported :white_check_mark: |

### Hash Values

In OpenID Connect, the `c_hash`, `at_hash`, and `s_hash` values are used to enhance the security and integrity of the authorisation process.
In OpenID Connect, the `c_hash`, `at_hash`, and `s_hash` values are used to enhance the security and integrity of the authorisation process.

#### `c_hash` (Code Hash)

- Used in the authorisation code flow when using `response_type=code id_token` and `response_type=code id_token token`
- The response to the client is a `code` and the first `id_token` (and `access_token` if requested)
- The `id_token` signature is validated by obtaining the JWKS from the the Authorisation Server JWK endpoint
- Parsing the `id_token`, the `c_hash` is found and using SHA-256 (defined in the header of the `id_token` `alg`) compares the code with the `c_hash`
- Provides authorisation code integrity.

#### `at_hash` (Access Token Hash)

- Used in the authorisation code flow when using `response_type=id_token token` and `response_type=code id_token token` [^1]
- The response to the client when the code is presented to the token endpoint is a JWT access token and and `id_token`
- The `id_token` signature is validated by obtaining the JWKS from the the Authorisation Server JWK endpoint
- Parsing the `id_token`, the `at_hash` is found and using SHA-256 (defined in the header of the `id_token` `alg`) compares the access token with the `at_hash`
- Provides Access token integrity.

[^1]: `at_hash` is typically supplied when the access token is returned from the authorisation endpoint. As noted in [Grant Types](08-SecuringAPIswithOAuth2andOpenIDConnect.md#grant-types), these **SHOULD NOT** be used and is only listed here for completeness.

#### `s_hash` (State Hash)

- Used in the authorisation code flow and implicit flow when using `response_type=code id_token` the authorisation request includes a `state` value created by the client
- The response to the client is a code and and the first `id_token`
- The `id_token` signature is validated by obtaining the JWKS from the the Authorisation Server JWK endpoint
- Parsing the `id_token`, the `s_hash` is found and using SHA-256 (defined in the header of the `id_token` `alg`) compares the `state` with the `s_hash`.
- Provides [state integrity](./SecurityControls#state-integrity).

### State (Integrity)

`state` is also a parameter that **MUST** be used during the authorisation grant stage to provide a level of security to address possible XSRF attacks. The `state` parameter is a string that is sent to the Authorisation Server by the client when requesting an authorisation code. It is sent back to the client with the Authorisation Code and **MUST** be verified by the API consumer application to confirm the authenticity of the response i.e. it came from the Authorisation Server to which the request was sent.
`state` is also a parameter that **MUST** be used during the authorisation grant stage to provide a level of security to address possible XSRF attacks. The `state` parameter is a string that is sent to the Authorisation Server by the client when requesting an authorisation code. It is sent back to the client with the Authorisation Code and **MUST** be verified by the API consumer application to confirm the authenticity of the response i.e. it came from the Authorisation Server to which the request was sent.

### Content Encryption (Confidentiality)

If content needs only to be visible to specific consumer endpoints, use encryption. However, if content only needs to be guaranteed untampered and/or from a specific source (e.g. provider) then use content signing. Content encryption enables all or part of an API payload to be readable only by the target consumer(s). This is useful where the content being carried by the API is sensitive, and the API request or response transits multiple stopping points. Whilst TLS protects the payload in transit, it only applies to each point to point connection between components (e.g. mobile app to API gateway). If transit components are not totally under the provider’s control, it can be worthwhile performing payload encryption. E.g. it may be sensible to encrypt credit card details passed between consumer and provider backend systems.

It is also worth considering how much protection the information needs whilst at rest. Data at rest encryption is generally considered good practice and many cloud service providers offer this as standard. See [NZISM](https://nzism.gcsb.govt.nz/ism-document/#Section-15746) for details.

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

## Availability and Threat Protection

Availability in this context covers threat protection to minimise API downtime, looks at how threats against exposed APIs can be mitigated using basic design principles and how to apply protection against specific risks and threats.

Availability also covers scaling to meet demand and ensuring hosting environments are stable etc. These levels of availability are addressed across hardware and software stacks that support the delivery of APIs. There are no specific standards for availability, but availability is normally addressed under business continuity and disaster recovery standards. These standards recommend a risk assessment approach to define API availability requirements. Further information on business continuity and risks can be found at [Standards New Zealand website](https://www.standards.govt.nz)

For cloud services, the New Zealand Government ICT website provides an [assessment capability that includes a risk assessment tool](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/assess-the-risks/risk-discovery-tool/) which covers availability, business continuity and disaster recovery related questions.

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
|Cross-Site Request Forgery|<li>Use tokens with `state` and `nonce` parameters</li>|
|Cross-Site Request Forgery|<li>Use tokens with `state` and `nonce` parameters</li>|
|Cross-Site Scripting Attacks|<li>Validate Input</li>|

### Token Threat Mitigation

Securing OAuth 2.0 flows relies on the exchange of tokens between consuming applications and API provider servers. There is always the threat of these tokens being obtained illicitly, losing confidentiality and integrity of message content or the integrity of the sender of the token. This risk also applies to the transferring of API keys.

The table below captures the main Token threats and  mitigation strategies that **SHOULD** be applied:

|Threat|Mitigation|
|---|---|
|Token Manufacture or modification (fake tokens and man-in-the-middle attacks)|<li>Digital signing of tokens (e.g. JWS with JWT) or attaching a Message Authentication Code (MAC)</li>|
|Token disclosure – man-in-the-middle attack.<br/>The Access Token is passed in clear text with no hashing, signing or encryption.|Communication Security:<li>Use TLS 1.3 with a cipher suite that includes DHE or ECDHE</li>The client application must validate:<li>The TLS certificate chain</li><li>Check the certificate revocation list</li><li>Stored locally in a file or LDAP server</li>|
|Token Redirects.<br/>Ensure the Authentication and Resource Servers are "paired", and the access token can only be used in the correct context|<li>Using the ["audience" claim](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.3) the client application, resource server and authorisation server can help *ensure that the token can only be used on the resource servers requested by the client and recognised by the authorisation server* </li><li>Also addressed with `state` parameter in the header</li><li>Signing of tokens is also applicable to address token redirects</li>|
|Token Redirects.<br/>Ensure the Authentication and Resource Servers are "paired", and the access token can only be used in the correct context|<li>Using the ["audience" claim](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.3) the client application, resource server and authorisation server can help *ensure that the token can only be used on the resource servers requested by the client and recognised by the authorisation server* </li><li>Also addressed with `state` parameter in the header</li><li>Signing of tokens is also applicable to address token redirects</li>|
|Token replay – where the threat actor copies an existing token (e.g. refresh token or authorisation code) and reuses it on their own request|<li>Limit lifetime of the token (e.g. 10 minutes) – turning it into a short-lived issue</li><li>Use signed requests along with nonce and timestamps</li><li>Validate TLS certificate chain when accessing Resource</li>|

## Monitoring, Logging and Alerting

Appropriate controls:

- All API interactions **MUST** be logged

- The request or response payload **SHOULD NOT** be logged

- PII information **MUST NOT** be logged

- Sensitive information in headers **MUST NOT** be logged (e.g. tokens, API Keys)

- Full content logging **MUST NOT** be applied

- The use and issuance of Access Tokens **MUST** be monitored

- Monitoring the OAuth 2.0 flow **SHOULD** be performed for suspicious activity and regularly auditing logs can help detect and prevent potential security breaches. This includes monitoring for anomalous requests, access attempts to unauthorised resources, and unusual client behavior.

- Traditional logging, alerting and incident management practices also apply to APIs. The following **MUST** be applied:
  - Logs **MUST** be stored in a tamper-proof and secure location
  - Detecting events that may indicate a malicious attempt to access an API **MUST** be logged and monitored.

  The following **SHOULD**  be applied
  - Correlating API requests with specific back-end system activity and the resulting API responses to support end-to-end tracing - capture timestamps, user/consumer information and actions performed **SHOULD** be logged

  - Logging of user actions (login, logout) **SHOULD** be monitored

  - Identifying specific API requests from consumers to help resolve API consumer problems **SHOULD** be monitored.

- Regular security audits and vulnerability scanning **MUST** be planned and actioned to help identify and address potential security vulnerabilities in APIs.
