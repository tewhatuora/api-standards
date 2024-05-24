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

<ApiStandard id="HNZAS_MUST_USE_CORRECT_ENDORSEMENT" type="MUST" toolTip="API providers MUST use the correct endorsement, following the guidelines in PSR, when undertaking classification analysis.">
  API providers **MUST** use the correct endorsement, following the guidelines in PSR, when undertaking classification analysis.
</ApiStandard>

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

<table>
  <tr>
    <th>Resource Type</th>
    <th>Control Required</th>
  </tr>
  <tr>
    <td>Anonymous Read Access</td>
    <td>
- No access control based on the user or system requesting are required
- <ApiStandard id="HNZAS_MUST_USE_TLS_FOR_ANONYMOUS_READ" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit for anonymous read access." wrapper='span'>**MUST** use TLS (HTTPS) to provide authentication of the server and integrity protection in transit</ApiStandard>
</td>
</tr><tr>
<td>Business</td>
<td>
- <ApiStandard id="HNZAS_MUST_USE_TLS_FOR_BUSINESS_RESOURCES" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit for business resources." wrapper='span'>**MUST** use TLS (HTTPS) to provide authentication of the server and integrity protection in transit</ApiStandard>
<ApiStandard id="HNZAS_MUST_USE_APPROPRIATE_CLIENT_AUTH_FOR_BUSINESS_RESOURCES" type="MUST" toolTip="Client authentication methods SHOULD use at least one appropriate client authentication method for Business resources." wrapper='li'>Client authentication methods **SHOULD** use at least one of:</ApiStandard>
  - i) Mutual-authenticated-TLS
  - ii) APIKey
  - iii) App signed JWT
  - iv) App OAuth 2.0 client-id JWT
</td>
</tr><tr>
<td>Individual</td>
<td>
- <ApiStandard id="HNZAS_MUST_USE_TLS_FOR_INDIVIDUAL_RESOURCES" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit for Individual resources." wrapper='span'>**MUST** use TLS (HTTPS) to provide authentication of the server and integrity protection in transit</ApiStandard>
- <ApiStandard id="HNZAS_MUST_IMPLEMENT_CLIENT_AUTH_FOR_INDIVIDUAL_RESOURCES" type="MUST" toolTip="Client (API Consumer) authentication MUST be implemented for Individual resources." wrapper='span'>Client (API Consumer) authentication **MUST** be implemented</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_USE_APPROPRIATE_CLIENT_AUTH_FOR_INDIVIDUAL_RESOURCES" type="SHOULD" toolTip="Client authentication methods SHOULD use at least one appropriate client authentication method for Individual resources." wrapper='li'>Client authentication methods **SHOULD** use at least one of:</ApiStandard>
  - i) Mutual-authenticated-TLS
  - ii) APIKey
  - iii) App signed JWT
  - iv) App OAuth 2.0 client-id JWT
- <ApiStandard id="HNZAS_MUST_AUTHENTICATE_HEALTH_SECTOR_PARTICIPANT_FOR_INDIVIDUAL_RESOURCES" type="MUST" toolTip="The health sector participant MUST be authenticated for Individual resources." wrapper='span'>The health sector participant **MUST** be authenticated</ApiStandard>
- <ApiStandard id="HNZAS_MUST_USE_RBAC_OR_ABAC_FOR_INDIVIDUAL_RESOURCES" type="MUST" toolTip="Appropriate RBAC or ABAC access policies MUST be used for Individual resources." wrapper='span'>Appropriate RBAC or ABAC access policies **MUST** be used</ApiStandard>
- <ApiStandard id="HNZAS_MUST_CONTROL_ACCESS_BY_PRIVACY_CONSENT_FOR_INDIVIDUAL_RESOURCES" type="MUST" toolTip="Any access to Individual data MUST be controlled by a privacy consent." wrapper='span'>Any access to individual data **MUST** be controlled by a privacy consent</ApiStandard>
</td>
</tr><tr>
<td>Patient</td>
<td>
- <ApiStandard id="HNZAS_MUST_USE_TLS_FOR_PATIENT_RESOURCES" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit for Patient resources." wrapper='span'>**MUST** use TLS (HTTPS) to provide authentication of the server and integrity protection in transit</ApiStandard>
- <ApiStandard id="HNZAS_MUST_IMPLEMENT_CLIENT_AUTH_FOR_PATIENT_RESOURCES" type="MUST" toolTip="Client (API Consumer) authentication MUST be implemented for Patient resources." wrapper='span'>Client (API Consumer) authentication **MUST** be implemented</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_USE_APPROPRIATE_CLIENT_AUTH_FOR_PATIENT_RESOURCES" type="SHOULD" toolTip="Client authentication methods SHOULD use at least one appropriate client authentication method for Patient resources." wrapper='li'>Client authentication methods **SHOULD** use at least one of:</ApiStandard>
  - i) Mutual-authenticated-TLS
  - ii) APIKey
  - iii) App signed JWT
  - iv) App OAuth 2.0 client-id JWT
- <ApiStandard id="HNZAS_MUST_AUTHENTICATE_HEALTH_SECTOR_PARTICIPANT_FOR_PATIENT_RESOURCES" type="MUST" toolTip="The health sector participant MUST be authenticated for Patient resources." wrapper='span'>The health sector participant **MUST** be authenticated</ApiStandard>
- <ApiStandard id="HNZAS_MUST_USE_RBAC_OR_ABAC_FOR_PATIENT_RESOURCES" type="MUST" toolTip="Appropriate RBAC or ABAC access policies MUST be used for Patient resources." wrapper='span'>Appropriate RBAC or ABAC access policies **MUST** be used</ApiStandard>
- <ApiStandard id="HNZAS_MUST_CONTROL_ACCESS_BY_PRIVACY_CONSENT_FOR_PATIENT_RESOURCES" type="MUST" toolTip="Any access to Patient data MUST be controlled by a privacy consent." wrapper='span'>Any access to patient data **MUST** be controlled by a privacy consent</ApiStandard>
- <ApiStandard id="HNZAS_SHOULD_DECLARE_PURPOSE_OF_USE_FOR_PATIENT_RESOURCES" type="SHOULD" toolTip="Interaction with Patient resources often requires a declared Purpose Of Use." wrapper='span'>Often requires a declared Purpose Of Use</ApiStandard>
- <ApiStandard id="HNZAS_SHOULD_USE_SECURITY_LABELS_FOR_PATIENT_RESOURCES" type="SHOULD" toolTip="Security labels SHOULD be used to differentiate various confidentiality levels within the broad group of Patient Sensitive data." wrapper='span'>Security labels **SHOULD** be used to differentiate various confidentiality levels within this broad group of Patient Sensitive data</ApiStandard>
</td>
</tr>
</table>

## API Provider controls for all APIs

The following is a list of controls and their applicability for all API Providers:

- <ApiStandard id="HNZAS_MUST_ENFORCE_ACCESS_CONTROLS" type="MUST" toolTip="APIs MUST enforce access controls at the API provider edge." wrapper='span'>  **MUST** enforce [access controls](./APIAuthenticationandAuthorisationBasics#authorisation) at the API provider edge</ApiStandard>

  - <ApiStandard id="HNZAS_SHOULD_USE_THROTTLING_FOR_DDOS" type="SHOULD" toolTip="APIs SHOULD use throttling to address Distributed Denial of Service (DDoS) attacks." wrapper='span'>[Throttling](#availability-and-threat-protection) to address Distributed Denial of Service (DDoS) attacks</ApiStandard>
  - <ApiStandard id="HNZAS_SHOULD_USE_MESSAGE_ANALYSIS" type="SHOULD" toolTip="APIs SHOULD use message analysis to block HTTP attacks, including parameter attacks such as cross-site scripting (XSS), SQL injection, command injection, and cross-site request forgery (XSRF)." wrapper='span'>[Message analysis](#availability-and-threat-protection) to block HTTP attacks; parameter attacks such as cross-site scripting (XSS), SQL injection, command injection and cross-site request forgery (XSRF)</ApiStandard>

- <ApiStandard id="HNZAS_MUST_USE_SHORT_LIVED_ACCESS_TOKENS" type="MUST" toolTip="APIs MUST use short-lived access tokens." wrapper='span'>  **MUST** use [short-lived Access Tokens](#token-threat-mitigation)</ApiStandard>

- <ApiStandard id="HNZAS_SHOULD_USE_JWT_ACCESS_REFRESH_TOKENS" type="SHOULD" toolTip="APIs SHOULD use JWT access and refresh tokens." wrapper='span'>  **SHOULD** use [JWT](./SecuringAPIswithOAuth2andOpenIDConnect#json-web-token-jwt) Access and Refresh Tokens</ApiStandard>

- <ApiStandard id="HNZAS_MUST_PROVIDE_TOKEN_REVOCATION_ENDPOINT" type="MUST" toolTip="The Authorisation Server MUST provide a Token Revocation endpoint." wrapper='span'>  The Authorisation Server **MUST** provide a [Token Revocation endpoint](./SecuringAPIswithOAuth2andOpenIDConnect#oauth-2-and-openid-connect-endpoints-api-provider)</ApiStandard>

- <ApiStandard id="HNZAS_MUST_PROVIDE_TOKEN_INTROSPECTION_ENDPOINT" type="MUST" toolTip="The Authorisation Server MUST provide a Token Introspection endpoint." wrapper='span'>  The Authorisation Server **MUST** provide a [Token Introspection endpoint](./SecuringAPIswithOAuth2andOpenIDConnect#oauth-2-and-openid-connect-endpoints-api-provider)</ApiStandard>

- <ApiStandard id="HNZAS_MUST_USE_EDDSA_OR_ECDSA_FOR_SIGNING" type="MUST" toolTip="Token Signing MUST use EdDSA or ECDSA when protecting sensitive information." wrapper='span'>  Token Signing **MUST** use [EdDSA or ECDSA](https://datatracker.ietf.org/doc/html/rfc8422#section-2.1) when protecting sensitive information</ApiStandard>

- <ApiStandard id="HNZAS_MUST_USE_RSA_OAEP_FOR_ENCRYPTION" type="MUST" toolTip="Token Encryption MUST use RSA-OAEP." wrapper='span'>  Token Encryption **MUST** use [RSA-OAEP](https://datatracker.ietf.org/doc/html/rfc8017#section-7.1)</ApiStandard>

- <ApiStandard id="HNZAS_MUST_APPLY_SUPPORTED_HASHING_ALGORITHMS" type="MUST" toolTip="Supported hashing algorithms MUST be applied as per the NZISM." wrapper='span'>  Supported hashing algorithms **MUST** be applied as per the [NZISM](https://nzism.gcsb.govt.nz/ism-document/#Chapter-15745)</ApiStandard>

- <ApiStandard id="HNZAS_MUST_USE_TLS_1_3_OR_HIGHER" type="MUST" toolTip="All communications to or from an API MUST utilise TLS 1.3 or higher." wrapper='span'>  All communications to or from an API **MUST** utilise [Transport Layer Security (TLS) 1.3](https://datatracker.ietf.org/doc/html/rfc8446) or higher.</ApiStandard> <ApiStandard id="HNZAS_SHOULD_DISABLE_TLS_VERSIONS_BELOW_1_3" type="SHOULD" toolTip="Versions of TLS below 1.3 SHOULD be disabled." wrapper='span'>Other versions of TLS and SSL **SHOULD** be disabled. </ApiStandard> This provides a recognised level of confidentiality that covers all communications between all components. [Also see NZISM](https://nzism.gcsb.govt.nz/ism-document/#Section-15940)

- <ApiStandard id="HNZAS_MUST_VALIDATE_TLS_CERTIFICATE_CHAINS" type="MUST" toolTip="API consumer applications MUST validate TLS certificate chains when making requests to protected resources." wrapper='span'>  API consumer applications **MUST** [validate TLS certificate chains](https://datatracker.ietf.org/doc/html/rfc5280) when making requests to protected resources, including checking the Certificate Revocation List (CRL).</ApiStandard>

## Confidentiality and Integrity

Confidentiality and integrity cover the handling of request and response data, both in transit and at rest. The aim is to protect the payload content from unauthorised access (eavesdropping), manipulation or faking of content. An API request needs to be received intact by the API, with validation as to the source of the request. Untampered API responses need to be received by the consuming application, with confirmation that they are legitimately from the API.

<table>
  <tr>
    <th>Data Classification</th>
    <th>Control</th>
  </tr>
<tr>
  <td>UNCLASSIFIED</td>
  <td>
    - <ApiStandard id="HNZAS_MUST_USE_TLS_1_3_UNCLASSIFIED" type="MUST" toolTip="TLS 1.3 MUST be applied between client, authorisation server, and resource server for unclassified data." wrapper='span'>TLS 1.3 **MUST** be applied between client, authorisation server and resource server</ApiStandard>
    - <ApiStandard id="HNZAS_MAY_ENCRYPT_PAYLOAD_UNCLASSIFIED" type="MAY" toolTip="Payload MAY be encrypted for unclassified data." wrapper='span'>MAY encrypt the payload</ApiStandard>
    - <ApiStandard id="HNZAS_MAY_APPLY_AUTHENTICATION_UNCLASSIFIED" type="MAY" toolTip="Authentication MAY be applied for unclassified data." wrapper='span'>Authentication **MAY** be applied</ApiStandard>
    - <ApiStandard id="HNZAS_MAY_APPLY_COARSE_GRAINED_AUTHORIZATION_UNCLASSIFIED" type="MAY" toolTip="Coarse grained Authorisation MAY be applied for unclassified data." wrapper='span'>Coarse grained Authorisation **MAY** be applied</ApiStandard>
  </td>
</tr>
<tr>
  <td>MEDICAL IN-CONFIDENCE</td>
  <td>
  - <ApiStandard id="HNZAS_MUST_USE_TLS_1_3_MTLS_MEDICAL" type="MUST" toolTip="TLS 1.3 MTLS MUST be applied between client, authorisation server, and resource server for Medical In-Confidence data." wrapper='span'>TLS 1.3 MTLS **MUST** be applied between client, authorisation server and resource server</ApiStandard>
  - <ApiStandard id="HNZAS_MUST_ENCRYPT_PAYLOAD_MEDICAL" type="MUST" toolTip="The payload MUST be encrypted for Medical In-Confidence data." wrapper='span'>The Payload **MUST** be encrypted</ApiStandard>
  - <ApiStandard id="HNZAS_MUST_USE_SECURITY_TAGS_FHIR" type="MUST" toolTip="Security Tags (labels) MUST be used for FHIR APIs to apply the masking or removal of sensitive data in the response." wrapper='span'>Security Tags (labels) **MUST** be used for FHIR APIs to apply the masking or removal of sensitive data in the response</ApiStandard>
  - <ApiStandard id="HNZAS_MUST_APPLY_STRONG_AUTHENTICATION_MEDICAL" type="MUST" toolTip="Strong Authentication MUST be applied for Medical In-Confidence data." wrapper='span'>Strong Authentication **MUST** be applied</ApiStandard>
  - <ApiStandard id="HNZAS_MUST_APPLY_COARSE_GRAINED_AUTHORIZATION_MEDICAL" type="MUST" toolTip="Coarse grained Authorisation MUST be applied for Medical In-Confidence data." wrapper='span'>Coarse grained Authorisation **MUST** be applied</ApiStandard>
  - <ApiStandard id="HNZAS_MUST_APPLY_FINE_GRAINED_AUTHORIZATION_MEDICAL" type="MUST" toolTip="Fine grained Authorisation MUST be applied for Medical In-Confidence data." wrapper='span'>Fine grained Authorisation **MUST** be applied</ApiStandard>
  </td>
</tr></table>

The following table details the data classification application for API Security using OAuth 2.0 and OpenID Connect:

|Data Classification | API Security Control (Grant Flows)|
|---|---|
|UNCLASSIFIED|<ApiStandard id="HNZAS_MAY_APPLY_CLIENT_CREDENTIALS_OIDC_UNCLASSIFIED" type="MAY" toolTip="Client Credentials with Scopes MAY be applied for OAuth/OIDC connections to unclassified data." wrapper='li'>Client Credentials with Scopes **MAY** be applied</ApiStandard> <ApiStandard id="HNZAS_SHOULD_NOT_USE_IMPLICIT_GRANT_PKCE_OIDC_UNCLASSIFIED" type="SHOULD NOT" toolTip="Implicit Grant flow with PKCE SHOULD NOT be applied for OAuth/OIDC connections to unclassified data." wrapper='li'>Implicit Grant flow with PKCE **SHOULD NOT** be applied</ApiStandard> <ApiStandard id="HNZAS_MAY_USE_AUTHORIZATION_CODE_PKCE_OIDC_UNCLASSIFIED" type="MAY" toolTip="Authorization Code grant with PKCE MAY be applied for OAuth/OIDC connections to unclassified data." wrapper='li'>Authorization Code grant with PKCE **MAY** be applied</ApiStandard>|
|MEDICAL IN-CONFIDENCE|<ApiStandard id="HNZAS_MUST_NOT_USE_CLIENT_CREDENTIALS_OIDC_MEDICAL" type="MUST NOT" toolTip="Client Credentials with Scopes MUST NOT be applied for OAuth/OIDC connections to Medical In-Confidence data." wrapper='li'>Client Credentials with Scopes **MUST NOT** be applied</ApiStandard> <ApiStandard id="HNZAS_MUST_NOT_USE_IMPLICIT_GRANT_OIDC_MEDICAL" type="MUST NOT" toolTip="Implicit Grant flow MUST NOT be applied for OAuth/OIDC connections to Medical In-Confidence data." wrapper='li'>Implicit Grant flow **MUST NOT** be applied</ApiStandard> <ApiStandard id="HNZAS_SHOULD_USE_AUTHORIZATION_CODE_PKCE_OIDC_MEDICAL" type="SHOULD" toolTip="Authorization Code grant with PKCE SHOULD be applied for OAuth/OIDC connections to Medical In-Confidence data." wrapper='li'>Authorization Code grant with PKCE **SHOULD** be applied</ApiStandard>|

|Grant Type| Control Required| Status |
|---|---|---|
|Client Credentials with Scopes|<li> <ApiStandard id="HNZAS_SHOULD_USE_OAUTH2_CLIENT_CREDENTIALS" type="SHOULD" toolTip="OAuth 2.0 SHOULD be applied for client credentials with scopes." wrapper='span'> OAuth 2.0 **SHOULD** be applied </ApiStandard>, <ApiStandard id="HNZAS_MAY_USE_OPENID_CONNECT__CLIENT_CREDENTIALS" type="MAY" toolTip="OpenID Connect MAY be used for client credentials with scopes." wrapper='span'> **MAY** use OpenID Connect </ApiStandard></li><li> <ApiStandard id="HNZAS_SHOULD_USE_CLIENT_SECRET_POST_TOKEN_AUTH_CLIENT_CREDENTIALS" type="SHOULD" toolTip="`client_secret_post` token endpoint authorisation SHOULD be applied for client credentials with scopes." wrapper='span'> `client_secret_post` token endpoint authorisation **SHOULD** be applied </ApiStandard></li><li> <ApiStandard id="HNZAS_MAY_SIGN_ACCESS_TOKENS_FOR_INTEGRITY_CLIENT_CREDENTIALS" type="MAY" toolTip="Access Tokens MAY be signed to validate integrity for client credentials with scopes." wrapper='span'> Access Tokens **MAY** be signed to validate integrity </ApiStandard></li><li> <ApiStandard id="HNZAS_MUST_VALIDATE_SCOPES_BY_AUTH_SERVER_CLIENT_CREDENTIALS" type="MUST" toolTip="The authorisation server MUST validate the scopes for client credentials with scopes." wrapper='span'> The authorisation server **MUST** validate the scopes </ApiStandard></li>| Supported :white_check_mark: |
|Implicit grant |<li><ApiStandard id="HNZAS_SHOULD_USE_OPENID_CONNECT_IMPLICIT_GRANT" type="SHOULD" toolTip="OpenID Connect SHOULD be applied using an `openid` scope in the authentication request for implicit grant." wrapper='span'>OpenID Connect **SHOULD** be applied using an `openid` scope in the authentication request</ApiStandard></li><li><ApiStandard id="HNZAS_SHOULD_USE_CLIENT_SECRET_POST_JWT_OR_PRIVATE_KEY_JWT_IMPLICIT_GRANT" type="SHOULD" toolTip="`client_secret_post` or `client_secret_jwt` or `private_key_jwt` token endpoint authorisation SHOULD be applied for implicit grant." wrapper='span'>`client_secret_post` or `client_secret_jwt` or `private_key_jwt` token endpoint authorisation **SHOULD** be applied</ApiStandard></li><li><ApiStandard id="HNZAS_MUST_SIGN_ACCESS_TOKENS_IMPLICIT_GRANT" type="MUST" toolTip="Access Tokens MUST be signed to validate integrity for implicit grant." wrapper='span'>Access Tokens **MUST** be signed to validate integrity</ApiStandard></li><li><ApiStandard id="HNZAS_MUST_VALIDATE_SCOPES_BY_AUTH_SERVER_IMPLICIT_GRANT" type="MUST" toolTip="The authorisation server MUST validate the scopes for implicit grant." wrapper='span'>The authorisation server **MUST** validate the scopes</ApiStandard></li><li><ApiStandard id="HNZAS_SHOULD_USE_ID_TOKEN_RESPONSE_TYPE_IMPLICIT_GRANT" type="SHOULD" toolTip="The `response_type` SHOULD be `id_token` for implicit grant." wrapper='span'>The `response_type` **SHOULD** be `id_token` token</ApiStandard></li><li><ApiStandard id="HNZAS_MUST_USE_STATE_PARAM_AND_VALIDATE_IMPLICIT_GRANT" type="MUST" toolTip="The `state` parameter MUST be used in the authorisation request and the API consumer MUST validate it in the response for implicit grant." wrapper='span'>The `state` parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the response</ApiStandard></li><li><ApiStandard id="HNZAS_MUST_USE_AND_VALIDATE_NONCE_PARAM_IMPLICIT_GRANT" type="MUST" toolTip="If OpenID Connect is used, the `nonce` parameter MUST be used in the authorisation request and the API consumer MUST validate it in the `id_token` for implicit grant." wrapper='span'>If OpenID Connect is used the `nonce` parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the `id_token`</ApiStandard></li>| Deprecated :warning: |
| Authorisation Code grant with PKCE  |<li><ApiStandard id="HNZAS_MUST_USE_OPENID_CONNECT_PKCE" type="MUST" toolTip="OpenID Connect MUST be applied using an `openid` scope in the authentication request for PKCE." wrapper='span'>OpenID Connect **MUST** be applied using an `openid` scope in the authentication request</ApiStandard></li> <li><ApiStandard id="HNZAS_MUST_USE_PRIVATE_KEY_JWT_TOKEN_ENDPOINT_PKCE" type="MUST" toolTip="`private_key_jwt` token endpoint authorisation MUST be applied for PKCE." wrapper='span'>`private_key_jwt` token endpoint authorisation **MUST** be applied</ApiStandard></li> <li><ApiStandard id="HNZAS_MUST_SIGN_ACCESS_TOKENS_PKCE" type="MUST" toolTip="Access Tokens MUST be signed to validate integrity for PKCE." wrapper='span'>Access Tokens **MUST** be signed to validate integrity</ApiStandard></li> <li><ApiStandard id="HNZAS_MUST_VALIDATE_SCOPES_BY_AUTH_SERVER_PKCE" type="MUST" toolTip="The authorisation server MUST validate the scopes for PKCE." wrapper='span'>The authorisation server **MUST** validate the scopes</ApiStandard></li> <li><ApiStandard id="HNZAS_MUST_USE_PKCE_FOR_CODE_MITIGATION_PKCE" type="MUST" toolTip="PKCE MUST be applied to mitigate stolen authorisation codes for PKCE." wrapper='span'>PKCE **MUST** be applied to mitigate stolen authorisation codes</ApiStandard></li> <li><ApiStandard id="HNZAS_MUST_USE_CODE_ID_TOKEN_RESPONSE_TYPE_PKCE" type="MUST" toolTip="The `response_type` MUST be `code id_token` for PKCE." wrapper='span'>The `response_type` **MUST** be `code id_token`</ApiStandard></li> <li><ApiStandard id="HNZAS_MUST_USE_STATE_PARAM_AND_VALIDATE_PKCE" type="MUST" toolTip="The `state` parameter MUST be used in the authorisation request and the API consumer MUST validate it in the response for PKCE." wrapper='span'>The `state` parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the response</ApiStandard></li> <li><ApiStandard id="HNZAS_MUST_USE_AND_VALIDATE_NONCE_PARAM_PKCE" type="MUST" toolTip="The `nonce` parameter MUST be used in the authorisation request and the API consumer MUST validate it in the `id_token` for PKCE." wrapper='span'>The `nonce` parameter **MUST** be used in the authorisation request and the API consumer **MUST** validate it in the `id_token`</ApiStandard></li> <li><ApiStandard id="HNZAS_MUST_SECURELY_STORE_CLIENT_SECRETS_PKCE" type="MUST" toolTip="Client secrets MUST be securely stored for PKCE." wrapper='span'>Client secrets **MUST** be securely stored</ApiStandard></li> <li><ApiStandard id="HNZAS_SHOULD_USE_ID_TOKEN_AS_DETACHED_SIGNATURE_PKCE" type="SHOULD" toolTip="`id_token` SHOULD be used as a detached signature for PKCE." wrapper='span'>`id_token` **SHOULD** be used as a detached signature</ApiStandard></li> <li><ApiStandard id="HNZAS_SHOULD_USE_C_HASH_AT_HASH_S_HASH_PKCE" type="SHOULD" toolTip="The flow SHOULD contain `c_hash`, `at_hash` and `s_hash` values for PKCE." wrapper='span'>The flow **SHOULD** contain `c_hash`, `at_hash` and `s_hash` values</ApiStandard></li> <li><ApiStandard id="HNZAS_MAY_ENCRYPT_ID_TOKEN_PKCE" type="MAY" toolTip="Encryption of the `id_token` MAY be used for PKCE." wrapper='span'>Encryption of the `id_token` **MAY** be used</ApiStandard></li> <li><ApiStandard id="HNZAS_SHOULD_APPLY_DEMONSTRATION_OF_PROOF_OF_POSSESSION_PKCE" type="SHOULD" toolTip="Demonstration of Proof of Possession SHOULD be applied to tie an Access Token to a client for PKCE." wrapper='span'>Demonstration of Proof of Possession **SHOULD** be applied to tie an Access Token to a client</ApiStandard></li>| Supported :white_check_mark: |

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

<p><ApiStandard id="HNZAS_MUST_USE_STATE_PARAM_AUTH_GRANT" type="MUST" toolTip="state is a parameter that MUST be used during the authorisation grant stage to provide a level of security to address possible XSRF attacks." wrapper='span'>`state` is also a parameter that **MUST** be used during the authorisation grant stage to provide a level of security to address possible XSRF attacks.</ApiStandard><ApiStandard id="HNZAS_MUST_VERIFY_STATE_PARAM_BY_API_CONSUMER" type="MUST" toolTip="The state parameter MUST be verified by the API consumer application to confirm the authenticity of the response." wrapper='span'>The `state` parameter is a string that is sent to the Authorisation Server by the client when requesting an authorisation code. It is sent back to the client with the Authorisation Code and **MUST** be verified by the API consumer application to confirm the authenticity of the response i.e. it came from the Authorisation Server to which the request was sent.</ApiStandard></p>

### Content Encryption (Confidentiality)

If content needs only to be visible to specific consumer endpoints, use encryption. However, if content only needs to be guaranteed untampered and/or from a specific source (e.g. provider) then APIs SHOULD use content signing. Content encryption enables all or part of an API payload to be readable only by the target consumer(s). This is useful where the content being carried by the API is sensitive, and the API request or response transits multiple stopping points. Whilst TLS protects the payload in transit, it only applies to each point to point connection between components (e.g. mobile app to API gateway). If transit components are not totally under the provider’s control, it can be worthwhile performing payload encryption. E.g. it may be sensible to encrypt credit card details passed between consumer and provider backend systems.

It is also worth considering how much protection the information needs whilst at rest. Data at rest encryption is generally considered good practice and many cloud service providers offer this as standard. See [NZISM](https://nzism.gcsb.govt.nz/ism-document/#Section-15746) for details.

Encryption is only worthwhile implementing when data sensitivity or data protection requirements drive it, as encryption can be computationally intensive. It also makes it more difficult for protection mechanisms, such as API gateways, to validate and transform API content. When only the integrity of the content passed needs to be ensured, consider using Content Signing instead.

There are many existing ways of encrypting message content, built into code libraries and development tools. <ApiStandard id="HNZAS_MUST_ADHERE_TO_NZISM_ENCRYPTION_ALGORITHMS" type="MUST" toolTip="It is required that any content encryption adheres to the standard algorithms laid out in NZISM (HMAC Algorithms)." wrapper='span'>It is **REQUIRED** that any content encryption adheres to the standard algorithms laid out in [NZISM (HMAC Algorithms)](https://nzism.gcsb.govt.nz/ism-document/#Section-15853).</ApiStandard>

### Content Signing (Integrity)

Content signing is used to assure content integrity and proof of authorship. It can apply to the entire payload of the API request/response or specific elements of that content e.g. credit card details. There are many approaches to content signing and the most appropriate approach is requirements dependent. Standard signing algorithms exist within coding libraries, and JWT has a payload that can contain verifiable (signed) JSON fields.

Signing has less of a computational overhead than encryption, but can still affect performance, so it is advisable that it be used only when and where needed. This is covered under:

- [RFC 7800 Proof of Possession - OAuth 2.0 Proof-of-Possession (PoP) Security Architecture (draft)](https://datatracker.ietf.org/doc/html/rfc7800)

<ApiStandard id="HNZAS_MUST_USE_JWT_SIGNED_BEARER_TOKENS" type="MUST" toolTip="Where Bearer Tokens are used, they MUST be JSON Web Tokens (JWT) signed using JSON Web Signature." wrapper='span'>Where Bearer Tokens are used, they **MUST** be JSON Web Tokens (JWT) signed using JSON Web Signature</ApiStandard> as defined in:

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

- <ApiStandard id="HNZAS_MUST_ASSESS_THREAT_IN_API_DEV" type="MUST" toolTip="Threat assessment MUST be assessed in the API development lifecycle." wrapper='span'>Threat assessment **MUST** be assessed in the API development lifecycle</ApiStandard>

- <ApiStandard id="HNZAS_MUST_PERFORM_PENETRATION_TESTING" type="MUST" toolTip="Penetration testing MUST be performed once an API is developed and published (testable) and on a regular schedule post publication." wrapper='span'>Penetration testing **MUST** be performed once an API is developed and published (testable) and on a regular schedule post publication</ApiStandard>

- <ApiStandard id="HNZAS_MUST_USE_AUTOMATED_VULNERABILITY_TESTING_TOOLS" type="MUST" toolTip="Automated vulnerability testing tools MUST be used to give an indication of vulnerabilities in API implementations." wrapper='span'>Automated vulnerability testing tools **MUST** be used to give an indication of vulnerabilities in API implementations</ApiStandard>

Below is a table of risk types and some approaches that **SHOULD** be used to help mitigate these threats:

|Threat | Mitigation (OWASP)|
|---|---|
|Exposure of inappropriate API methods to access services|<ApiStandard id="HNZAS_SHOULD_WHITELIST_HTTP_METHODS" type="SHOULD" toolTip="Expose only the minimum required HTTP methods to enhance security." wrapper='li'>Protect and Limit (whitelist) the HTTP Methods (GET, PUT etc) exposed</ApiStandard><ApiStandard id="HNZAS_SHOULD_VALIDATE_METHODS_FOR_SESSION_TOKEN" type="SHOULD" toolTip="Validate Method(s) for session token / API key to ensure secure API access." wrapper='li'>Validate Method(s) for session token / API key.</ApiStandard>|
|Denial of Service attacks|<ApiStandard id="HNZAS_SHOULD_THROTTLE_API_ACCESS" type="SHOULD" toolTip="Throttle access to all exposed APIs and monitor use to prevent DoS attacks." wrapper='li'>Throttle access to all exposed APIs. Monitor use to indicate possible DoS attacks</ApiStandard>|
|Malicious Input, Injection attacks and Fuzzing|<ApiStandard id="HNZAS_SHOULD_VALIDATE_INPUT" type="SHOULD" toolTip="Validate input to ensure secure parsing and strong typing to mitigate malicious input." wrapper='li' dupe='true'>Validate input: Secure parsing and strong typing</ApiStandard> <ApiStandard id="HNZAS_SHOULD_VALIDATE_INCOMING_CONTENT_TYPE" type="SHOULD" toolTip="Validate incoming content-type as application/json to mitigate malicious input." wrapper='li'>Validate incoming content-type application/json</ApiStandard> <ApiStandard id="HNZAS_SHOULD_VALIDATE_JSON_CONTENT" type="SHOULD" toolTip="Validate JSON content to mitigate malicious input." wrapper='li'>Validate JSON content</ApiStandard> <ApiStandard id="HNZAS_SHOULD_VALIDATE_XML" type="SHOULD" toolTip="Validate XML against schema and format to mitigate malicious input." wrapper='li'>Validate XML (schema and format)</ApiStandard> <ApiStandard id="HNZAS_SHOULD_SCAN_ATTACHMENTS" type="SHOULD" toolTip="Scan attachments for malware and vulnerabilities to mitigate malicious input." wrapper='li'>Scan attachments</ApiStandard> <ApiStandard id="HNZAS_SHOULD_PRODUCE_VALID_HTTP_RETURN_CODE" type="SHOULD" toolTip="Produce valid HTTP Return Codes to mitigate malicious input." wrapper='li'>Produce valid HTTP Return Code</ApiStandard> <ApiStandard id="HNZAS_SHOULD_VALIDATE_RESPONSE" type="SHOULD" toolTip="Validate responses to mitigate malicious input." wrapper='li'>Validate response</ApiStandard>|
|Cross-Site Request Forgery|<ApiStandard id="HNZAS_SHOULD_USE_TOKENS_WITH_STATE_NONCE" type="SHOULD" toolTip="Use tokens with `state` and `nonce` parameters to prevent CSRF attacks." wrapper='li'>Use tokens with `state` and `nonce` parameters</ApiStandard>|
|Cross-Site Scripting Attacks|<li><ApiStandard id="HNZAS_SHOULD_VALIDATE_INPUT" type="SHOULD" toolTip="Validate input to prevent cross-site scripting attacks." wrapper='li' dupe='true'>Validate Input</ApiStandard></li>|

### Token Threat Mitigation

Securing OAuth 2.0 flows relies on the exchange of tokens between consuming applications and API provider servers. There is always the threat of these tokens being obtained illicitly, losing confidentiality and integrity of message content or the integrity of the sender of the token. This risk also applies to the transferring of API keys.

| Threat | Mitigation |
| --- | --- |
| Token Manufacture or modification (fake tokens and man-in-the-middle attacks) | <ApiStandard id="HNZAS_SHOULD_DIGITALLY_SIGN_TOKENS" type="SHOULD" toolTip="Digital signing of tokens (e.g. JWS with JWT) or attaching a Message Authentication Code (MAC) to prevent token manufacture or modification." wrapper='li'>Digital signing of tokens (e.g. JWS with JWT) or attaching a Message Authentication Code (MAC)</ApiStandard> |
| Token disclosure – man-in-the-middle attack.<br/>The Access Token is passed in clear text with no hashing, signing or encryption. | Communication Security: <ApiStandard id="HNZAS_SHOULD_USE_TLS_1_3_WITH_DHE_OR_ECDHE" type="SHOULD" toolTip="Use TLS 1.3 with a cipher suite that includes DHE or ECDHE to secure communication." wrapper='li'>Use TLS 1.3 with a cipher suite that includes DHE or ECDHE</ApiStandard> The client application must validate: <ApiStandard id="HNZAS_SHOULD_VALIDATE_TLS_CERTIFICATE_CHAIN" type="SHOULD" toolTip="Validate the TLS certificate chain to ensure secure communication." wrapper='li'>The TLS certificate chain</ApiStandard> <ApiStandard id="HNZAS_SHOULD_CHECK_CERTIFICATE_REVOCATION_LIST" type="SHOULD" toolTip="Check the certificate revocation list to ensure secure communication." wrapper='li'>Check the certificate revocation list</ApiStandard> <ApiStandard id="HNZAS_SHOULD_STORE_LOCALLY" type="SHOULD" toolTip="Store certificates locally in a file or LDAP server to ensure secure communication." wrapper='li'>Stored locally in a file or LDAP server</ApiStandard> |
| Token Redirects.<br/>Ensure the Authentication and Resource Servers are "paired", and the access token can only be used in the correct context | <ApiStandard id="HNZAS_SHOULD_USE_AUDIENCE_CLAIM" type="SHOULD" toolTip="Using the 'audience' claim the client application, resource server, and authorisation server can help ensure that the token can only be used on the resource servers requested by the client and recognised by the authorisation server." wrapper='li'>Using the ["audience" claim](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.3) the client application, resource server, and authorisation server can help *ensure that the token can only be used on the resource servers requested by the client and recognised by the authorisation server*</ApiStandard> <ApiStandard id="HNZAS_SHOULD_USE_STATE_PARAM_IN_HEADER" type="SHOULD" toolTip="Using the 'state' parameter in the header to prevent token redirects." wrapper='li'>Also addressed with `state` parameter in the header</ApiStandard> <ApiStandard id="HNZAS_SHOULD_SIGN_TOKENS" type="SHOULD" toolTip="Signing of tokens is also applicable to address token redirects." wrapper='li'>Signing of tokens is also applicable to address token redirects</ApiStandard> |
| Token replay – where the threat actor copies an existing token (e.g. refresh token or authorisation code) and reuses it on their own request | <ApiStandard id="HNZAS_SHOULD_LIMIT_TOKEN_LIFETIME" type="SHOULD" toolTip="Limit lifetime of the token (e.g. 10 minutes) to mitigate token replay attacks." wrapper='li'>Limit lifetime of the token (e.g. 10 minutes) – turning it into a short-lived issue</ApiStandard> <ApiStandard id="HNZAS_SHOULD_USE_SIGNED_REQUESTS" type="SHOULD" toolTip="Use signed requests along with nonce and timestamps to mitigate token replay attacks." wrapper='li'>Use signed requests along with nonce and timestamps</ApiStandard> <ApiStandard id="HNZAS_SHOULD_VALIDATE_TLS_CERTIFICATE_CHAIN" type="SHOULD" toolTip="Validate TLS certificate chain when accessing Resource to mitigate token replay attacks." wrapper='li' dupe='true'>Validate TLS certificate chain when accessing Resource</ApiStandard> |

## Monitoring, Logging and Alerting

Appropriate controls:
<ul>
<ApiStandard id="HNZAS_MUST_LOG_ALL_API_INTERACTIONS" type="MUST" toolTip="All API interactions MUST be logged to ensure traceability and security." wrapper='li'>All API interactions **MUST** be logged</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_NOT_LOG_REQUEST_RESPONSE_PAYLOAD" type="SHOULD NOT" toolTip="The request or response payload SHOULD NOT be logged to protect sensitive data." wrapper='li'>The request or response payload **SHOULD NOT** be logged</ApiStandard>
<ApiStandard id="HNZAS_MUST_NOT_LOG_PII_INFORMATION" type="MUST NOT" toolTip="PII information MUST NOT be logged to comply with privacy regulations." wrapper='li'>PII information **MUST NOT** be logged</ApiStandard>
<ApiStandard id="HNZAS_MUST_NOT_LOG_SENSITIVE_HEADERS" type="MUST NOT" toolTip="Sensitive information in headers (e.g. tokens, API Keys) MUST NOT be logged." wrapper='li'>Sensitive information in headers **MUST NOT** be logged (e.g. tokens, API Keys)</ApiStandard>
<ApiStandard id="HNZAS_MUST_NOT_APPLY_FULL_CONTENT_LOGGING" type="MUST NOT" toolTip="Full content logging MUST NOT be applied to prevent excessive data exposure." wrapper='li'>Full content logging **MUST NOT** be applied</ApiStandard>
<ApiStandard id="HNZAS_MUST_MONITOR_ACCESS_TOKENS" type="MUST" toolTip="The use and issuance of Access Tokens MUST be monitored for security purposes." wrapper='li'>The use and issuance of Access Tokens **MUST** be monitored</ApiStandard>

</ul>

- <ApiStandard id="HNZAS_SHOULD_MONITOR_OAUTH_FLOW" type="SHOULD" toolTip="Monitoring the OAuth 2.0 flow SHOULD be performed for suspicious activity to detect and prevent potential security breaches.">Monitoring the OAuth 2.0 flow **SHOULD** be performed for suspicious activity and regularly auditing logs can help detect and prevent potential security breaches. This includes monitoring for anomalous requests, access attempts to unauthorised resources, and unusual client behavior.</ApiStandard>

<ul>

Traditional logging, alerting and incident management practices also apply to APIs. The following **MUST** be applied:

- <ApiStandard id="HNZAS_MUST_STORE_LOGS_SECURELY" type="MUST" toolTip="Logs MUST be stored in a tamper-proof and secure location to ensure data integrity." wrapper='span'>Logs **MUST** be stored in a tamper-proof and secure location</ApiStandard>
- <ApiStandard id="HNZAS_MUST_LOG_AND_MONITOR_MALICIOUS_EVENTS" type="MUST" toolTip="Detecting events that may indicate a malicious attempt to access an API MUST be logged and monitored." wrapper='p'>Detecting events that may indicate a malicious attempt to access an API **MUST** be logged and monitored</ApiStandard>

The following **SHOULD** be applied:

- <ApiStandard id="HNZAS_SHOULD_LOG_BACKEND_ACTIVITY" type="SHOULD" toolTip="Correlating API requests with specific back-end system activity and the resulting API responses to support end-to-end tracing SHOULD be logged." wrapper='span'>Correlating API requests with specific back-end system activity and the resulting API responses to support end-to-end tracing - capture timestamps, user/consumer information and actions performed **SHOULD** be logged</ApiStandard>
- <ApiStandard id="HNZAS_SHOULD_MONITOR_USER_ACTIONS" type="SHOULD" toolTip="Logging of user actions (login, logout) SHOULD be monitored." wrapper='span'>Logging of user actions (login, logout) **SHOULD** be monitored</ApiStandard>
- <ApiStandard id="HNZAS_SHOULD_MONITOR_SPECIFIC_API_REQUESTS" type="SHOULD" toolTip="Identifying specific API requests from consumers to help resolve API consumer problems SHOULD be monitored." wrapper='span'>Identifying specific API requests from consumers to help resolve API consumer problems **SHOULD** be monitored</ApiStandard>

</ul>
<ApiStandard id="HNZAS_MUST_CONDUCT_REGULAR_SECURITY_AUDITS" type="MUST" toolTip="Regular security audits and vulnerability scanning MUST be planned and actioned to help identify and address potential security vulnerabilities in APIs." wrapper='li'>Regular security audits and vulnerability scanning **MUST** be planned and actioned to help identify and address potential security vulnerabilities in APIs</ApiStandard>
