---
title: Using OAuth 2.0 and OpenID Connect to Secure Your API
---



OAuth 2.0 and OpenID Connect are both based on a token-based authorisation framework and are defined and implemented using Grant Flow type patterns. These define the different types of interaction a client application can perform to gain an `access token` and thus access to the protected API.

The grant types define the flow of the different token between the different end points exposed by the API Consumer and API Provider.

## Token Types

Both OAuth 2.0 and OpenID Connect utilise tokens however there are a number of mechanisms used to obtain them. These are sometimes referred to as `grant flows`. Different tokens can be used for different purposes.

|Token Type | Description |Grant Flow Used|
|---|---|---|
|Authorisation Code|Created by the API Provider and sent to the API Consumer after the resource owner has authenticated and provided consent for the required action (e.g. Read) against the data being accessed.<br/><br/>Sent to the API Provider to obtain an Access Token.<br/><br/><ApiStandard id="HNZAS_MUST_ENCRYPT_AUTH_CODES_IN_TRANSIT" type="MUST" toolTip="Authorisation codes must be protected with TLS in transit.">**MUST** be protected with TLS.</ApiStandard><ApiStandard id="HNZAS_MUST_ENCRYPT_AUTH_CODES_AT_REST" type="MUST" toolTip="Authorisation codes must be encrypted at rest.">**MUST** be encrypted when stored.</ApiStandard><ApiStandard id="HNZAS_MUST_NOT_STORE_USED_AUTH_CODES" type="MUST NOT" toolTip="Authorisation codes must not be stored once used.">**MUST NOT** be stored once it has been used.</ApiStandard>|[<u>Authorisation Code</u>](https://datatracker.ietf.org/doc/html/rfc6749#page-8)|
| Access Token |Returned to the API Consumer from the API Provider, and then sent to the API Providers resource server when requesting access to a protected resource.<br/><br/>Also called a Bearer token<br/><br/><ApiStandard id="HNZAS_MUST_ENCRYPT_ACCESS_TOKEN_IN_TRANSIT" type="MUST" toolTip="Access Tokens must be protected with TLS in transit.">**MUST** be protected with TLS.</ApiStandard><ApiStandard id="HNZAS_MUST_ENCRYPT_ACCESS_TOKENS_AT_REST" type="MUST" toolTip="Access Tokens must be encrypted at rest.">**MUST** be encrypted when stored.</ApiStandard><ApiStandard id="HNZAS_SHOULD_USE_SHORT_LIVED_ACCESS_TOKEN" type="SHOULD" toolTip="Access Tokens SHOULD have a lifespan of less than 60 minutes.">**SHOULD** have a lifetime less than 60 mins.</ApiStandard>| [<u>Client Credentials</u>](https://datatracker.ietf.org/doc/html/rfc6749#page-9)<br/><br/>[<u>Implicit</u>](https://datatracker.ietf.org/doc/html/rfc6749#page-8)<br/><br/>[<u>Authorisation Code</u>](https://datatracker.ietf.org/doc/html/rfc6749#page-8)|
| Refresh Token | Used to obtain a new Access token (and possibly a new Refresh Token) from the API Provider when the time limit on an issued Access Token has expired.<br/><br /><ApiStandard id="HNZAS_MUST_ENCRYPT_REFRESH_TOKEN_IN_TRANSIT" type="MUST" toolTip="Refresh Tokens must be protected with TLS in transit.">**MUST** be protected with TLS.</ApiStandard><ApiStandard id="HNZAS_MUST_ENCRYPT_REFRESH_TOKENS_AT_REST" type="MUST" toolTip="Refresh Tokens must be encrypted at rest.">**MUST** be encrypted when stored.</ApiStandard><ApiStandard id="HNZAS_MUST_SET_REFRESH_TOKEN_LIFESPAN_UNDER_24_HOURS" type="MUST" toolTip="Refresh Tokens MUST have a lifespan of less than 24 hours when used for SPAs.">If used for Single Page Applications, **MUST** have a lifetime of 24 hours or less.</ApiStandard>|[<u>Implicit</u>](https://datatracker.ietf.org/doc/html/rfc6749#page-8)<br/><br/>[<u>Authorisation Code</u>](https://datatracker.ietf.org/doc/html/rfc6749#page-8)|
| ID Token | Used in all OpenID Connect flows. It is a JWT that is signed and contains meta data that can be used to enhance the level of security during the token exchange(s)<br/><br/><ApiStandard id="HNZAS_MUST_USE_ID_TOKENS_AS_DETACHED_SIGNATURE" type="MUST" toolTip="ID Tokens MUST be used as a detached signature.">**MUST** be used as a detached signature.</ApiStandard><ApiStandard id="HNZAS_MUST_SIGN_ID_TOKENS_WITH_APPROVED_ALGORITHM" type="MUST" toolTip="ID Tokens MUST be signed with an approved algorithm.">**MUST** be signed with an approved algorithm.</ApiStandard>|[<u>Implicit</u>](https://datatracker.ietf.org/doc/html/rfc6749#page-8)<br/><br/>[<u>Authorisation Code</u>](https://datatracker.ietf.org/doc/html/rfc6749#page-8)|
|API Key|A string used in some scenarios to authenticate the client application to the API.<br/><br/><ApiStandard id="HNZAS_SHOULD_USE_COMPLEX_API_KEY" type="SHOULD" toolTip="API keys SHOULD be a 40+ character random string.">**SHOULD** be a 40+ character random string.</ApiStandard><ApiStandard id="HNZAS_SHOULD_ENFORCE_API_KEY_ROTATION" type="SHOULD" toolTip="API keys SHOULD have a rotation policy.">**SHOULD** have an associated rotation policy e.g. 6 - 12 month lifecycle.</ApiStandard>| N/A |

## Token Formats

There are three token formats that are used in OAuth 2.0 and OpenID Connect they are detailed in the table below.

|Token Format| Where used |Description | Recommendation / Classification|
|---|---|---|---|
|Opaque Tokens| Authorisation Code<br/>Access Token<br/>Refresh Token | They do not contain any user information, they are a random, unique string of characters that act as a reference for the OAuth 2.0 server to map it to stored information.|<ApiStandard id="HNZAS_MAY_USE_OPAQUE_TOKENS_UNCLASSIFIED" type="MAY" toolTip="Opaque tokens MAY be used with UNCLASSIFIED." wrapper="span">Opaque tokens **MAY** be used with UNCLASSIFIED</ApiStandard>,<ApiStandard id="HNZAS_MAY_USE_OPAQUE_TOKENS_MEDICAL" type="MAY" toolTip="Opaque tokens MAY be used with MEDICAL IN-CONFIDENCE." wrapper="span">MAY be used with MEDICAL IN-CONFIDENCE.</ApiStandard><ApiStandard id="HNZAS_MUST_SUPPORT_OPAQUE_TOKENS_WITH_TOKENINFO" type="MUST" toolTip="If the API provider supports opaque access tokens they MUST do this in conjunction with the token issuer's /tokeninfo endpoint." wrapper="span">If the API provider supports opaque access tokens they **MUST** do this in conjunction with the token issuer's /tokeninfo endpoint.</ApiStandard>|
|JWT| Access Token<br/>Refresh Token<br/>ID Token |JSON Web Tokens are self contained token and store user identity and access information (claims)|<ApiStandard id="HNZAS_MAY_USE_JWTS_UNCLASSIFIED" type="MAY" toolTip="JWTs MAY be used with UNCLASSIFIED." wrapper="span">**MAY** use with UNCLASSIFIED</ApiStandard> <br/><ApiStandard id="HNZAS_MAY_USE_JWTS_MEDICAL" type="MAY" toolTip="JWTs MAY be used with MEDICAL IN-CONFIDENCE." wrapper="span">**MAY** be used with MEDICAL IN-CONFIDENCE</ApiStandard>|
|JWE| Access Token<br/>Refresh Token<br/>ID Token |This is a JWT that has been encrypted using the [JWE standard](https://datatracker.ietf.org/doc/html/rfc7516)|<ApiStandard id="HNZAS_MAY_USE_JWES_UNCLASSIFIED" type="MAY" toolTip="JWEs MAY be used with UNCLASSIFIED." wrapper="span">**MAY** use with UNCLASSIFIED</ApiStandard> <br/><ApiStandard id="HNZAS_MAY_USE_JWES_MEDICAL" type="MAY" toolTip="JWEs MAY be used with MEDICAL IN-CONFIDENCE." wrapper="span">**MAY** be used with MEDICAL IN-CONFIDENCE</ApiStandard> <br/><ApiStandard id="HNZAS_MUST_USE_JWE_WHEN_TOKEN_CONTAINS_PII" type="MUST" toolTip="The JWE Standard MUST be used where the token contains sensitive information or PHI/PII." wrapper="span">**MUST** be used where the token itself contains sensitive information or PHI/PII</ApiStandard>|

### Opaque Token

Below is a JSON payload of a response from an OAuth 2.0 Server when they issue an [Opaque] Access Token. As you can see the Access Token itself is a string of characters.

<!-- cspell:disable -->

```json
 {
  "access_token": "sbQZuveFumUDV5R1vVBl6QAGNB8",
  "scope": "Resource.r, Resource.w",
  "token_type": "Bearer",
  "expires_in": 3599
}
```
<!-- cspell:enable -->
Note: The response also contains the lifetime of the access token and the scope(s) approved. Scopes will be covered later but are basically permission that can be performed on the information protected by the API.

### JSON Web Token (JWT)

Below is a JSON payload of a response from an API Provider when they issue a [JWT] Access Token. As you can see the Access Token itself is also a string of characters
<!-- cspell:disable -->
 ```json
{
   "access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJteUNsaWVudCIsImlzcyI6Imh0…​.",
   "scope":"Resource.r, Resource.w",
   "token_type":"Bearer",
   "expires_in":3599
}
```
<!-- cspell:enable -->
The JWT token is made up of three sections (separated by a period (.):

1. Header - token type, how it is signed and the key identifier
2. Payload - including claims
3. Signature - for validation of the JWT

### JWT Decoded

An example of an encoded JWT is detailed below:

<!-- cspell:disable -->

```json
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJteUNsaWVudCIsImlzcyI6Imh0dHB
zOi8vaGVhbHRoLmV4YW1wbGUuY29tOjg0NDMvaGVhbHRoL29hdXRoMiIsInRva2VuTmFtZSI6ImFj
Y2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdWQiOiJteUNsaWVudCIsIm5iZiI6M
TUzOTA3NTk2NywiZ3JhbnRfdHlwZSI6ImNvZGUiLCJzY29wZSI6WyJ3cml0ZSJdLCJleHAiOjE1Mz
kwNzk1NjcsImlhdCI6MTUzOTA3NTk2NywiZXhwaXJlc19pbiI6MzYwMCwianRpIjoiRlRRVDZlWmt
EaG02UEhFYVN0aE9Sb1RMQjgwIn0.b2H_BoT988W28s6K-XAU7gsxXoJlBDNZFpeIxb-7a_yXmKnS
0YNw7nxGqYtBL9GMsh6QTXRkohTS\W9bU2cW0hvU1bJp-1XHywn1kNM5JqLNF2YakV3NX-_4WNdn_
Y1n9aRtbAExLIGea6Wlk23zFGWkJ19WQ7vtHvEqy1ho1gwg9-3STvtCp0YlA6wpA9RUlRHwIx_7_l
Aflrhezjm5cmR0BzuxeEoF5BVkxseFXs1l7nRWuXGetwPOYWP1OKm-gZLDhwpXFUhAsa61XAvfc9q
-xaf2deTXlTjUpJso7DiRBdpsdi6KEqvCILp2PBCMkAcOPQUCUOb6jSA_XMSOgzQ"
```
<!-- cspell:enable -->

The JWT is decoded below

```json
{
  "typ": "JWT",
  "alg": "RS256"
}
{
     "sub": "myHealth",
     "iss": "[https://health.example.com:8443/health/oauth]",
     "tokenName": "access_token",
     "token_type": "Bearer",
     "aud": "myClient",
     "nbf": 1539075967,
     "grant_type": "code",
     "scope": [
      "write"
     ],
     "exp": 1539079567,
     "iat": 1539075967,
     "expires_in": 3600,
     "jti": "{Unique Identifier}"
}
[signature]
```

### JWT Benefit Characteristics

The following is a list of why a JWT **SHOULD** be used:

|Characteristic|Description|
|---|---|
|Client Introspection|The token contain self-contained information that can be introspected by the API Consumer and the API Providers Resource Server without having to call the API Provider's Authorisation server therefore improving client performance|
|Identity Claims|Identity claims, expiration time and issuer details are embedded in the JWT, which are used to provide Identity information to the API Consumer.<br/>Claims which can be used to provide granular access controls, enforce the lifetime of the token and validate the issuer and audience of the JWT.|
|Digital Signature|Ensures the integrity and authenticity of the token, preventing tampering of token content and providing a trust framework|
|Standard JWT format| It follows a format defined by an RFC so is compatible across many Vendor solutions|
|Claims Enhancement|A JWT can be enhanced with other claims or metadata and can include claims related to security tags|
|Encryption|The JWT can be encrypted if PII information is included|

## OAuth 2.0 and OpenID Connect Endpoints (API Provider)

There are multiple endpoints that are exposed and secured in the OAuth 2.0 / OpenID Connect architecture. Depending on the grant flow types (covered next) some or all of these end points will be required.

| Endpoint| Location | Tokens | Description |
|---|---|---|---|
| Authorisation End Point<br/>`/authorize`| API Provider | Code_Token<br/>Access_Token<br/>ID_Token | Responsible for redirecting the Resource Owner/Participant to the API Provider Authentication Server so they can login to provide their consent for the client to access a protected resource.<ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." wrapper='li'>**MUST** be protected with TLS</ApiStandard><ApiStandard id="HNZAS_MUST_REGISTER_API_CLIENTS" type="MUST" toolTip="API Providers MUST register API Consumers and allocate a Client ID." wrapper='li'>The API Consumer **MUST** have registered with the API Provider and been allocated a client ID</ApiStandard><ApiStandard id="HNZAS_MUST_USE_PKCE_FOR_AUTH_CODE_FLOW" type="MUST" toolTip="PKCE MUST be used for any Authorisation code flows." wrapper='li'>PKCE **MUST** be used for any Authorisation code flows</ApiStandard><ApiStandard id="HNZAS_MAY_USE_PAR_FOR_AUTH_CODE_FLOW" type="MAY" toolTip="PAR MAY be used for Authorisation code flows." wrapper='li'>PAR **MAY** be used</ApiStandard><ApiStandard id="HNZAS_MAY_USE_JARM_FOR_AUTH_CODE_FLOW" type="MAY" toolTip="JARM MAY be used for Authorisation code flows." wrapper='li'>JARM **MAY** be used</ApiStandard>|
| Token<br/>`/token` | API Provider | Access_Token<br/>Refresh_Token<br/>ID_Token| This authenticates the API Consumer and  based on validation rules and the configuration of the client<ApiStandard id="HNZAS_SHOULD_USE_MTLS_FOR_TOKEN_ENDPOINT" type="SHOULD" toolTip="mTLS SHOULD be used to secure Token endpoint (/token)." wrapper='li'>**SHOULD** be protected with mTLS</ApiStandard><ApiStandard id="HNZAS_SHOULD_USE_POP_FOR_TOKEN_ENDPOINT" type="SHOULD" toolTip="Proof of Possession SHOULD be used with Token endpoints (/token)." wrapper='li'>Proof of Possession **SHOULD** be used</ApiStandard><ApiStandard id="HNZAS_SHOULD_APPLY_CLIENT_SECRET_AUTH" type="SHOULD" toolTip="Client_secret_post or client_secret_jwt or private_key_jwt or tls_client_auth SHOULD be used to secure the endpoint." wrapper='li'>Client_secret_post or client_secret_jwt or private_key_jwt or tls_client_auth **SHOULD** be applied</ApiStandard>|
|Redirect endpoint| API Consumer | Code_Token<br/>Access_Token<br/>ID_Token | The response from the authorisation endpoint is sent here. This is via HTTP-redirect (302). The API Consumer is responsible for validating tokens from this endpoint.<ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." wrapper='li'>**MUST** be protected with TLS</ApiStandard><ApiStandard id="HNZAS_MUST_USE_PKCE_FOR_AUTH_CODE_FLOW" type="MUST" toolTip="PKCE MUST be used for any Authorisation code flows." wrapper='li'>PKCE **MUST** be used for any Authorisation code flows</ApiStandard><ApiStandard id="HNZAS_MUST_VALIDATE_AUTH_REDIRECTS" type="MUST" toolTip="OAuth 2.0-protected API servers MUST check the redirect_uri of received authorisation requests is identical to the redirection URI registered for the client" wrapper='li'>Redirect Validation **MUST** be carried out</ApiStandard><ApiStandard id="HNZAS_MUST_INCLUDE_STATE_NONCE" type="MUST" toolTip="State and Nonce parameters MUST be included." wrapper='li'>State and Nonce parameters **MUST** be included</ApiStandard>|
|Revoke<br/>`/revoke`|API Provider| Access_Token<br/>Refresh_Token| This allows the API Consumer to revoke tokens if required<ApiStandard id="HNZAS_MUST_PROVIDE_TOKEN_REVOKE" type="MUST" toolTip="API Providers MUST provide a Revoke endpoint." wrapper='li'>The API Provider **MUST** provide a Revoke endpoint</ApiStandard><ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." wrapper='li'>**MUST** be protected with TLS</ApiStandard><ApiStandard id="HNZAS_SHOULD_APPLY_CLIENT_SECRET_AUTH" type="SHOULD" toolTip="Client_secret_post or client_secret_jwt or private_key_jwt or tls_client_auth SHOULD be used to secure the endpoint." wrapper='li'>Client_secret_post or client_secret_jwt or private_key_jwt or tls_client_auth **SHOULD** be used to secure the endpoint</ApiStandard>|
|Introspect<br/>`/introspect`|API Provider| Access_Token<br/>Refresh_Token | This allows the Resource Server or Client to find out if the token has expired and other details about the token.<ApiStandard id="HNZAS_SHOULD_PROVIDE_TOKEN_INTROSPECT" type="SHOULD" toolTip="API Providers SHOULD provide a token Introspect endpoint." wrapper='li'>The API Provider **SHOULD** provide an introspection endpoint</ApiStandard><ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." wrapper='li'>**MUST** be protected with TLS</ApiStandard><ApiStandard id="HNZAS_SHOULD_APPLY_CLIENT_SECRET_AUTH" type="SHOULD" toolTip="Client_secret_post or client_secret_jwt or private_key_jwt or tls_client_auth SHOULD be used to secure the endpoint." wrapper='li'>Client_secret_post or client_secret_jwt or private_key_jwt or tls_client_auth **SHOULD** be used to secure the endpoint</ApiStandard>|
|User Info<br/>`/userinfo`| API Provider| Access Token| Use an access token to get information about the authenticated health participant<ApiStandard id="HNZAS_SHOULD_PROVIDE_USERINFO" type="SHOULD" toolTip="API Providers SHOULD provide a userinfo endpoint." wrapper='li'>The API Provider **SHOULD** provide a userinfo endpoint</ApiStandard><ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." wrapper='li'>**MUST** be protected with TLS</ApiStandard><ApiStandard id="HNZAS_MUST_VALIDATE_OAUTH2_TOKENS" type="MUST" toolTip="Consumers of OAuth 2.0 secured APIs MUST validate Issuer, Signature, Claims and Scopes before using an issued token." wrapper='li'>The Access Token used to authenticate to the endpoint **MUST** be validated for validity (time), Issuer and Signature</ApiStandard>|
|JSON Web Key URI<br/>`/jwks`|API Provider / API Consumer | |<ApiStandard id="HNZAS_MUST_RETRIEVE_API_PUBLIC_KEYS" type="MUST" toolTip="Retrieve the API provider’s public keys to verify issued token signatures." wrapper='li'>Retrieve the API provider’s public keys to verify issued token signatures</ApiStandard><ApiStandard id="HNZAS_MUST_ENCRYPT_ID_TOKENS" type="MUST" toolTip="Encrypt ID Tokens with the API Consumers public key(s)." wrapper='li'>Encrypt ID Tokens with the `API Consumers` public key(s)</ApiStandard><ApiStandard id="HNZAS_MUST_CHECK_SIGNATURE_PRIVATE_KEY_JWT" type="MUST" toolTip="Check signature of private_key_jwt authentication JWTs." wrapper='li'>Check signature of private_key_jwt authentication JWTs</ApiStandard><ApiStandard id="HNZAS_MUST_IMPLEMENT_BY_API_PROVIDER" type="MUST" toolTip="MUST be implemented by API Provider." wrapper='li'>**MUST** be implemented by API Provider</ApiStandard><ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="TLS MUST be used during authentication and to provide integrity protection in transit." wrapper='li'>Is a public endpoint and **MUST** be protected with TLS</ApiStandard>|
| [Pushed Authorisation Request (PAR)](./PARJARMandSessionManagement)<br/>`/par` | API Provider| | Push Authorisation Request (PAR) endpoint used when the authorisation request object is large and adds a a level of security as the request is signed<ApiStandard id="HNZAS_MAY_USE_PAR_FOR_AUTH_CODE_FLOW" type="MAY" toolTip="PAR MAY be used for Authorisation code flows." wrapper='li'>**MAY** be used</ApiStandard>|
|Backchannel Authorise<br/>`/bc-authorize`| | | Client-Initiated Backchannel Authentication (CIBA). This is a decoupled authentication process and uses a authentication device<ApiStandard id="HNZAS_MAY_USE_CIBA_FOR_AUTH_CODE_FLOW" type="MAY" toolTip="CIBA MAY be used for any Authorisation code flows." wrapper='li'>**MAY** be used</ApiStandard>|

### Discovery and Client Endpoints (API Provider)

When exposing protected APIs to API consumers consideration as to how an API consumer application developer would create and manage the Application Client integration to the API Provider is required.

This is carried out by creating a Client on the OpenID Connect Server (API Provider). This can be achieved in a number of ways and the following tables detail Discovery and Registration endpoints.

This document does not go into detail on how these are achieved as the key focus is on how  APIs are secured. <ApiStandard id="HNZAS_MUST_DEFINE_DOCUMENT_ONBOARDING" type="MUST" toolTip="API providers MUST clearly define and document API consumer onboarding processes and requirements." wrapper="span">It is important to note that API providers **MUST** clearly define and document API consumer onboarding processes and requirements.</ApiStandard>

For completeness the following endpoints are used by the Discovery and registration process.

| Endpoint| Location | Description |
|---|---|---|
|`/register`| API Provider| Relying parties can create (register) a client on the Authorisation Server using different security methods|
|`/.well-known/openid-configuration` | API Provider| This is called by the API Consumer and returns the API providers OAuth 2.0/OIDC configuration and capabilities including endpoints, algorithms and grant types|

## OpenID Connect

OpenIDConnect adds the following additional capabilities to provide access to a health participants claims / attributes:

- An ID Token

- A Userinfo endpoint

<ApiStandard id="HNZAS_MUST_USE_OPENID_CONNECT_FOR_MEDICAL" type="MUST" toolTip="API Providers MUST use OpenID Connect architecture models with all MEDICAL IN-CONFIDENCE APIs.">
  API Providers **MUST** use OpenID Connect architecture models with all MEDICAL IN-CONFIDENCE APIs
</ApiStandard>
OpenID Connect uses all the flows, grant types and endpoint exposed by OAuth 2.0. Once implemented it is enacted using a specific request scope `openid` in the initial authorisation call that the client makes to the OpenID Connect service.

### ID Token

<ApiStandard id="HNZAS_MUST_USE_ID_TOKEN_FOR_MEDICAL" type="MUST" toolTip="ID tokens MUST be used with all MEDICAL IN-CONFIDENCE APIs.">
  **MUST** be used with all MEDICAL IN-CONFIDENCE APIs
</ApiStandard>

The ID Token is a JSON Web Token (JWT) that contains authenticated user information (and attributes) that the authorisation API Provider (OpenID Connect Server) provides to the API Consumer.

| ID Token Capability | Recommendation |
|---|---|
|Provides authorisation credentials as claims (attributes)| <ApiStandard id="HNZAS_MAY_USE_ID_TOKEN_FOR_ACCESS_CONTROL" type="MAY" toolTip="ID tokens MAY be used to enforce finer grained access controls by providing additional attributes." wrapper="span">**MAY** be used to enforce finer grained access controls by providing additional attributes</ApiStandard> |
|The Token can be Signed | <ApiStandard id="HNZAS_MUST_SIGN_ID_TOKEN" type="MUST" toolTip="ID tokens MUST be signed by an approved algorithm." wrapper="span">**MUST** be signed by an approved algorithm</ApiStandard> |
|Claims that hash the code, state and access token can be added| <ApiStandard id="HNZAS_SHOULD_APPLY_HASHING_FOR_INTEGRITY" type="SHOULD" toolTip="Hashing the code, state, and access token SHOULD be applied to address integrity of users." wrapper="span">**SHOULD** be applied to address Integrity of users</ApiStandard> |
|Non-Identity related information can also be added to the token| <ApiStandard id="HNZAS_MAY_INCLUDE_ADDITIONAL_INFO_IN_ID_TOKEN" type="MAY" toolTip="Additional information (e.g., session details) MAY be added to the ID token." wrapper="span">Additional information (e.g. Session details) **MAY** be applied</ApiStandard> |
|Integrity Validation| <ApiStandard id="HNZAS_MUST_VALIDATE_ID_TOKEN_INTEGRITY" type="MUST" toolTip="Validation of issuer, audience, nonce, and expiry time MUST be applied by the API Consumer." wrapper="span">Validation of issuer, audience, nonce and expiry time **MUST** be applied by the API Consumer</ApiStandard> |
|Encryption| <ApiStandard id="HNZAS_MAY_ENCRYPT_ID_TOKEN" type="MAY" toolTip="ID tokens MAY be encrypted." wrapper="span">The ID Token **MAY** be encrypted</ApiStandard> |
|Customise API Consumer application| <ApiStandard id="HNZAS_MAY_USE_ID_TOKEN_TO_CUSTOMIZE" type="MAY" toolTip="Depending on the flow selected, the API Consumer MAY use the content of the ID token to customise the API Consumer client." wrapper="span">Depending on the flow selected the API Consumer **MAY** use the content of the ID Token to customise the API Consumer client</ApiStandard> |

<ApiStandard id="HNZAS_MUST_MINIMIZE_IDENTITY_ATTRIBUTES" type="MUST" toolTip="API Providers MUST ensure only the minimum number of identity attributes are provided to meet the required outcome of the API Consumer request." wrapper="li">API Providers **MUST** ensure only the minimum number of identity attributes are provided to meet the required outcome of the API Consumer request</ApiStandard>
<ApiStandard id="HNZAS_MUST_PROTECT_ID_TOKEN_PII" type="MUST" toolTip="API Providers MUST ensure that any ID Token that are transmitted over TLS (via the Authorise endpoint) do not contain PII or PHI information. ID Tokens can be returned from the authorise (TLS) or token (mTLS) endpoint." wrapper="li">API Providers **MUST** ensure that any ID Token that are transmitted over TLS (via the Authorise endpoint) do not contain PII or PHI information. ID Tokens can be returned from the authorise (TLS) or token (mTLS) endpoint.</ApiStandard>

### Userinfo Endpoint

<ApiStandard id="HNZAS_MAY_EXPOSE_USERINFO_ENDPOINT" type="MAY" toolTip="The userinfo endpoint MAY be exposed by the API Provider.">
  The userinfo endpoint **MAY** be exposed by the API Provider.
</ApiStandard>
The Userinfo endpoint can be called with an access token to obtain the same claims (e.g. first name) provided in the ID Token or **MAY** be configured to provide additional claims such as the health participants National Health Index identifier.

### Scopes

There are a number of additional scopes that OpenID Connect introduces (e.g. `profile`, `name`, `email` etc) that detail specific attributes that can be presented in an ID token.

<ApiStandard id="HNZAS_MAY_REQUEST_PROFILE_SCOPES" type="MAY" toolTip="An API Consumer MAY request the profile or other information scopes." wrapper="li">An API Consumer **MAY** request the profile or other information scopes</ApiStandard>
<ApiStandard id="HNZAS_SHOULD_DETAIL_AVAILABLE_SCOPES" type="SHOULD" toolTip="The API Provider SHOULD detail what scopes are available to the API Consumer." wrapper="li">The API Provider **SHOULD** detail what scopes are available to the API Consumer</ApiStandard>
<ApiStandard id="HNZAS_MUST_ENSURE_CONSENT_PROVIDED_FOR_INFORMATIONAL_SCOPES" type="MUST" toolTip="The API Provider MUST ensure consent to share information in profile scopes has been provided by the information owner, typically a health sector participant." wrapper="li">The API Provider **MUST** ensure consent to share this information has been provided by the information owner, typically a health sector participant.</ApiStandard>
<ApiStandard id="HNZAS_MUST_RECORD_PROFILE_SCOPE_CONSENT" type="MUST" toolTip="The API Provider MUST record any consent and its associated parameters when granting consent to informational scopes." wrapper="li">The API Provider **MUST** record any consent and its associated parameters.</ApiStandard>

See [FHIR security](./14-FHIRSecurity.md) for details on SMART on FHIR scopes.

## OpenID Connect Implementation Patterns

Implementation patterns **MAY** contain one or more of the options below:

- The Resource Server and Authorisation Server are owned by the API Providers

- The Resource Server and Authorisation Server are owned by different API Providers

- The Authentication Server is owned by an Identity Service Provider

- All three components are managed by separate API Providers or Identity Service Providers

## OAuth 2.0 and OpenID Connect Grant Types

OAuth 2.0 and OpenID Connect supports two types of API Consumer, confidential and public, and eleven grant flows (how Client Applications can gain Access Tokens). Each is appropriate to different situations and solution requirements.

The initial authorisation call to the API Provider from the API Consumer as a parameter call resource_type this defines what Grant Type the API Consumer application would like to use.

<ApiStandard id="HNZAS_MUST_LIMIT_GRANT_TYPES" type="MUST" toolTip="The API Provider MUST limit the grant types to those defined and agreed upon." wrapper="li">The API Provider **MUST** limit these to the agreed grant type defined below.</ApiStandard>

OpenID Connect builds on the existing OAuth 2.0 grant flows.

Finally there is the concept of a Hybrid flow that uses the Authentication code flow as a base and (depending on what is required by the client and what is enabled by the Authorisation Server) it allows additional tokens (ID Tokens) to be issued during the flow.

A good example of where the Hybrid flow is being mandated is in the management of consent in the Open Banking [<u>Consumer Data Rights specifications</u>](https://cdr-register.github.io).

Please see this [<u>excellent summary</u>](https://darutk.medium.com/diagrams-of-all-the-openid-connect-flows-6968e3990660) of the response type possible with OpenID Connect.

:::warning[Important]
API provider and consumer developers **MUST** read the RFC [<u>OAuth 2.0 for Browser-Based Apps</u>](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps) to gain an understanding of the differing architectures available.
:::

### Confidential clients

These are:

- Websites and services that make secure connections to OAuth 2.0 server.
- Client secret or JSON Web Token (JWT) can be stored and protected

**MUST** be used to secure MEDICAL IN-CONFIDENCE APIs

### Public clients

These are:

- Single-page applications
- Applications running on devices
- Applications that cannot protect secrets.

**MAY** be used for UNCLASSIFIED APIs

### Grant Types

The table below details the eleven grant/response types.

|Grant Type<br/>Response type | Recommendations| Client Type|
|---|---|---|
|Authorisation Code (OAuth 2.0)| <ApiStandard id="HNZAS_MAY_USE_AUTH_CODE_CONFIDENTIAL" type="MAY" toolTip="Authorisation Code (OAuth 2.0) grant type MAY be used for Confidential Clients." wrapper="span">**MAY** be used for Confidential Clients</ApiStandard><br/><ApiStandard id="HNZAS_MUST_NOT_USE_AUTH_CODE_PUBLIC" type="MUST NOT" toolTip="Authorisation Code grant type MUST NOT be used for Public Clients." wrapper="span">**MUST NOT** be used for Public Clients</ApiStandard>| N/A|
|Authorisation Code (OpenID Connect) with PKCE| <ApiStandard id="HNZAS_MAY_USE_PKCE_UNCLASSIFIED" type="MAY" toolTip="Authorisation Code (PKCE) MAY be used for UNCLASSIFIED APIs." wrapper="span">**MAY** be used for UNCLASSIFIED APIs</ApiStandard>| <ApiStandard id="HNZAS_MAY_USE_PKCE_NATIVE_SPA" type="MAY" toolTip="Authorisation Code (PKCE) MAY be used with Native or Single Page Applications (SPA)." wrapper="span">**MAY** be used with Native or Single Page Applications (SPA)</ApiStandard><br/><br/>Where a SPA or mobile application does not have a secure backend for frontend (BFF) the use of PKCE prevents malicious interception of the authorisation code |
|Hybrid (OpenID Connect)<br/>code id_token token|<ApiStandard id="HNZAS_SHOULD_NOT_USE_HYBRID_OIDC" type="SHOULD NOT" toolTip="Hybrid (OpenID Connect) with code, id_token, and token should not be used due to security concerns." wrapper="span">**SHOULD NOT** use</ApiStandard> | N/A|
|Hybrid (OpenID Connect)<br/>code id_token|<ApiStandard id="HNZAS_MUST_USE_HYBRID_OIDC_MEDICAL" type="MUST" toolTip="Hybrid (OpenID Connect) with code and id_token must be used for medical in-confidence APIs to ensure secure and compliant access." wrapper="span">**MUST** be used with MEDICAL IN-CONFIDENCE APIs</ApiStandard>|<ApiStandard id="HNZAS_MUST_USE_HYBRID_OIDC_WEB" type="MUST" toolTip="Hybrid (OpenID Connect) with code and id_token must be used for web applications to ensure secure client authentication." wrapper="span">**MUST** be used with a web application (confidential client)</ApiStandard>|
|Hybrid (OpenID Connect)<br/>code token| <ApiStandard id="HNZAS_SHOULD_NOT_USE_HYBRID_CODE_TOKEN" type="SHOULD NOT" toolTip="Hybrid (OpenID Connect) with code and token should not be used due to security concerns." wrapper="span">**SHOULD NOT** use</ApiStandard>| N/A|
|Implicit (OAuth 2.0)| <ApiStandard id="HNZAS_SHOULD_NOT_USE_IMPLICIT_OAUTH2" type="SHOULD NOT" toolTip="Implicit OAuth 2.0 should not be used due to security vulnerabilities associated with token exposure." wrapper="span">**SHOULD NOT** be used</ApiStandard>|N/A|
|Implicit (OpenID Connect)<br/> id_token token and PKCE| <ApiStandard id="HNZAS_SHOULD_NOT_USE_IMPLICIT_ID_TOKEN_PKCE" type="SHOULD NOT" toolTip="Implicit (OpenID Connect) with id_token, token, and PKCE should not be used due to security vulnerabilities." wrapper="span">**SHOULD NOT** be used</ApiStandard> |N/A|
|Implicit (OpenID Connect)<br/> id_token| <ApiStandard id="HNZAS_SHOULD_NOT_USE_IMPLICIT_ID_TOKEN" type="SHOULD NOT" toolTip="Implicit (OpenID Connect) with id_token should not be used due to security vulnerabilities." wrapper="span">**SHOULD NOT** be used</ApiStandard>|N/A|
|Resource owner Password Credential| <ApiStandard id="HNZAS_MUST_NOT_USE_ROPC" type="MUST NOT" toolTip="Resource Owner Password Credential grant must not be used due to security risks associated with handling user credentials directly." wrapper="span">**MUST NOT** be used</ApiStandard>|N/A|
|Client Credentials| <ApiStandard id="HNZAS_SHOULD_USE_CLIENT_CREDENTIALS_SYSTEM" type="SHOULD" toolTip="Client Credentials grant should only be used for system-to-system integration to ensure secure and appropriate use." wrapper="span">**SHOULD** only be used for system to system integration</ApiStandard>|N/A|

## OIDC Authorisation Code Flow with PKCE

<ApiStandard id="HNZAS_MUST_USE_PKCE_MEDICAL_IN_CONFIDENCE" type="MUST" toolTip="MUST be used when securing MEDICAL IN-CONFIDENCE APIs." wrapper="span">**MUST** be used when securing MEDICAL IN-CONFIDENCE APIs</ApiStandard>

The `Authorisation Code` flow is the most frequently used model and as it is regarded as the most secure model for securing public facing APIs for consumer applications. It can also be used for internal APIs. The following security enhancements **MUST** be applied to the base code flow:

- OpenID Connect `code id_token` flow
- **JWT** Access and Refresh Tokens
- **PKCE** to secure the code returned from the API Provider

This **MUST** be used when supporting confidential clients

### Flow Details

- Used by OAuth 2.0 and OpenID Connect
- Provides support for a confidential client (Where the client id and client secret can be securely stored)
- The resource Owner provides authorisation for the API Consumer to access the protected resource.
- Exchanges an authorisation code token for a access (and refresh) token over a secure back channel
- Two step process, the initial request is over TLS; and may utilise a mTLS backchannel for the access token exchange
- The resource owner authenticates to the API Provider and authorises the API Consumer to access the protected resource.
- The API Consumer receives a temporary authorisation code from the server as confirmation.
- The API Provider validates the authorisation code and exchanges it for an access token.
- The API Provider delivers the access token directly to the API Consumer

A detailed [example of the Authorisation Code flow is covered here](https://www.digital.govt.nz/dmsdocument/231~api-guidelines-part-b-api-security-2022/html#appendix-d--oauth--and-openid-connect-tokens-and-credentials)

## PKCE

<ApiStandard id="HNZAS_MUST_USE_PKCE_MEDICAL_IN_CONFIDENCE" type="MUST" toolTip="MUST be used when securing MEDICAL IN-CONFIDENCE APIs." wrapper="span">**MUST** be used when securing MEDICAL IN-CONFIDENCE APIs</ApiStandard>

The PKCE-enhanced Authorisation Code Flow was introduced to help mitigate "man-in-the-middle" attacks.

The API consumer creates a secret that the authorisation server can verify before returning the access token to the client, i.e. the Authorisation Server can confirm that the code came from the from the Client Application and not a Malicious "in-the-middle" Application.

### Implementation

Both the API Consumer and API Provider have to configured to support and enforce PKCE

### PKCE Process Flow

1. The **API Consumer**:
    1. Creates **code verifier** (a Random Key)
    2. Applies a hash method to the code verifier to create **code challenge** (a Random Key)

2. The **API Consumer** sends the hash method and the **code challenge** to the API Provider (Authorisation server)

3. The **API Provider (Authorisation Server)** stores the **code challenge**

4. The **API Consumer** sends the "code token" to request the Access Token and includes the **code verifier**

5. The **API Provider (Authorisation Server)** validates this against the stores **code challenge**

6. The Access Token is returned to the API Consumer Application (it does not respond if it fails)

### OAuth 2.0 and OpenID Connect flow

PKCE is applied in the same way for both OAuth 2.0 and OpenID Connect

### Refresh Tokens

#### Confidential Clients

For the Refresh Token flow in Web Applications using Code Authentication Grant Flow with PKCE the refresh token is sent over the secure Backchannel between the API Consumer (Server) and the API Provider (Authorisation Server's) token end point.

#### Public Clients

If the Client is a Native Application or a Mobile application and the Code Authentication Grant Flow with PKCE flow is used Health SHOULD NOT use the refresh token flow as the refresh token would have to be managed in the browser.

## OIDC Authorisation Code Flow with PKCE Sequence Flow

In an OpenID Connect Authorisation Code Grant Flow there is a common model where:

1. The following three components are owned by the same organisation (E.g. API Provider):
    - The OpenID Connect Server
    - The Resource Server (APIs)
    - The Authentication Server

2. The Organisation (e.g. Health NZ) also provides Identity information in two formats:
    - An ID Token to provide additional security
    - A Userinfo endpoint to provide additional Identity Information to the Relying Party

3. The API Consumer provides a service to the End User (health sector participant) which requires them to authorise access to the API COnsumer to the API provider's protected resources (e.g. Health NZ Patient record)

The flow below details this model where the health sector participant wants to use the services provided by the API Consumer.

```plantuml
@startuml
skinparam actorStyle awesome
actor "<color:red>Health Sector Participant" as RO
participant "<color:red>API\n<color:red>Consumer" as CL
box "API Provider" #LightBlue
participant "Authentication\nService" as AnS
participant "<color:red>OpenID Connect\n<color:red>Server" as AzS
boundary "<color:red>/userinfo endpoint" as UIE
participant "Resource\nServer" as RS
end box
autonumber "[00]"
CL -> CL : Creates **code verifier**\n (a Random Key)
CL -> CL: Applies a hash method\n to the code verifier to\n create **code challenge**
CL -> AzS: GET/authorize
activate AzS
note over AzS
 Authorization request:
 &client_id=healthabc
 &scope:profile Read <color:red>scope: openid
 &response_type=code id_token
 &state={state}
 &nonce={$nonce}
 &redirect_uri=https%3A%2f%2F
 &code_challenge={code_challenge}
 &code_challenge_method=S256
end note
AzS -> AzS: Store **code challenge**
AzS -> AnS: Redirect to Login Page
Deactivate AzS
Activate AnS
RO -> AnS: Login & authorisation consent to access protected resource

AnS ->AzS: redirect
Deactivate AnS
Activate AzS
AzS-> CL : redirect_uri + authorization code
Deactivate AzS
CL -> AzS: /oauth2/token
Activate AzS
note over AzS
    Access token request:
    grant_type=authorization_code
    client_id
    client_secret
    authorization_code
    code verifier
end note
AzS -> AzS: Validate code
AzS -> AzS: Validate **code challenge**
AzS --> CL: access token + refresh token are returned
AzS --> CL: <color:red> id-token is returned
Deactivate AzS
CL  -> CL: <color:red>Validate ID Token
loop
  CL -> RS: API call + access token
  activate RS
  RS -> AzS :Validate Access Token
  RS --> CL: API call response
  deactivate RS
end
group ID_Token
  CL -> UIE: userinfo endpoint call fro additional claims + access token
  activate UIE
  UIE -> CL :Return ID Token with additional claims
  UIE -> AzS :Validate Access Token
  deactivate UIE
end
@enduml
```

<DetailedDescription text="This diagram describes the OAuth 2.0 Authorization Code Flow with OpenID Connect for a Health Sector API scenario. Here's a breakdown of the key elements and interactions: Actors: Health Sector Participant: Represents the user in the health sector seeking access to the API. API Consumer: Represents the application/client requesting access to the API on behalf of the user. API Provider: The FHIR server hosting the protected resources. Authentication Service: Handles the initial user login and consent process. OpenID Connect Server: Issues tokens and verifies their validity. Resource Server: Validates access tokens and provides access to protected resources. Diagram Flow: Code Verifier and Challenge: The client generates a random code verifier and applies a hash function to create a code challenge. Authorization Request: The client sends an authorization request to the OpenID Connect Server (OAuth 2.0 Server) with details like client ID, scope (including openid), and code challenge. Login and Consent: The OAuth 2.0 Server redirects the user to the Authentication Service for login and consent to access the requested resources. Authorization Code: After user approval, the Authentication Service redirects the user back to the client with an authorization code. Access Token Request: The client sends an access token request to the OAuth 2.0 Server with the authorization code, client ID, and code verifier for validation. Token Response: The OAuth 2.0 Server validates the request and returns an access token, refresh token, and an ID token containing user claims. API Access: The client uses the access token to make API calls to the Resource Server. The server validates the token with the OAuth 2.0 Server before responding. Optional ID Token Validation: The client can validate the ID token to retrieve additional user claims about the health sector participant. Key Aspects: OpenID Connect Integration: The diagram showcases how OpenID Connect is used to add user authentication and identity information to the OAuth 2.0 flow. Security Measures: The use of code challenge and token validation ensures secure token exchange and protects against authorization code attacks. Resource Server Access: The diagram highlights the separate validation of access tokens for API access through the Resource Server."/>

## Client Credentials

The Client Credential Flow **SHOULD** be used for Server to server integration

The client credentials grant is intended for clients who are also resource owners that need to access their own data rather than acting on behalf of a user.
For example, an application that needs access to a protected resource to update its configuration might use the client credentials grant to get an access token.
The client credentials grant flow supports confidential clients only.

The client sends its credentials to the authorisation server to authenticate and requests an access token.
If the client credentials are valid, the authorisation server returns an access token to the client.
The client requests access to the protected resource from the resource server.
The resource server contacts the authorisation server to validate the access token.
The authorization server validates the token and responds to the resource server.
If the token is valid, the resource server allows the client to access the protected resource.

In this flow the client application is able to obtain access to the protected resource on its own behalf.

It is **Recommended**

- For the Authorise Consuming Application pattern from device to API
- Also use for Server to Server (B2B), using signed tokens without user interaction
- The client credentials grant flow supports confidential clients only.

```plantuml
@startuml

skinparam actorStyle awesome
participant "API Consumer" as CL
participant "Authentication\nServer" as AnS
box "Authorisation Server" #LightBlue
participant "OAuth 2.0\nServer" as AzS
end box
participant "Resource\nServer" as RS

autonumber "[00]"
CL -> AzS: POST/token
activate AzS
note over AzS
 Grant_type=client_credentials
 + client_id
 + client_secret
end note
AzS -> AzS: Validate client credentials 
AzS --> CL: access token
Deactivate AzS
loop
  CL -> RS: API call + access token
  activate RS
  RS --> CL: API call response
  RS -> AzS: Validate access token
  deactivate RS
end

@enduml
```

<DetailedDescription text="This diagram depicts the OAuth 2.0 Client Credentials Grant flow for accessing a Resource Server. Here's a breakdown of the key elements and interactions: Actors: Resource Owner/End User: Not directly involved in this flow, as the API Consumer authenticates using its own credentials. API Consumer: Represents the application requiring access to the protected resources on the Resource Server. Authentication Server: (Optional) May be present if the flow includes user login and consent for additional scopes. OAuth 2.0 Server: Issues and validates tokens for accessing protected resources. Resource Server: Hosts the protected resources and validates access tokens provided by the API Consumer. Diagram Flow: Token Request: The API Consumer directly sends a POST request to the OAuth 2.0 Server's /token endpoint. Grant Type: The request specifies the client_credentials grant type, indicating it's authenticating using its own pre-configured credentials. Client Credentials Validation: The OAuth 2.0 Server validates the provided client ID and client secret. Access Token Response: If the credentials are valid, the OAuth 2.0 Server grants an access token to the API Consumer. API Access: The API Consumer uses the access token to make API calls to the Resource Server. Token Validation: Each API call includes the access token, which the Resource Server validates with the OAuth 2.0 Server before responding. Repeated Access: This loop continues as long as the API Consumer needs to access protected resources and until the access token expires. Key Aspects: Client Credentials Grant: This flow is suitable for applications acting on their own behalf without involving human users. Direct Token Request: Unlike other flows, the API Consumer directly interacts with the OAuth 2.0 Server without user intervention. Resource Server Access Control: The Resource Server independently confirms the validity of the access token for each API call."/>

## Client Initiated Backchannel Authentication (CIBA) Flow

The OpenID Connect [Client Initiated Backchannel Authentication](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html) flow
is important because it adds three "decoupled” authorisation flows. Instead of using redirects through the browser, this model allows a user’s authentication device (e.g. mobile) to be decoupled from the flow, and the client application, and act as an authentication device on which the user authentication and the consent confirmations are performed.

The important point here is the client application and authorisation
application/service do not have to run on the same device (e.g.
smartphone) or be linked.

In the CIBA flow the initial authorisation call is made to the new
(OAuth 2.0) backchannel authentication endpoint and the authorisation server then delegates the authentication and
consent approval tasks to the authentication device (smartphone) of
the user, who will accept or deny the request.

The access token being sent to the client is managed by one of three
flows:

- Poll – The client polls the Authorisation Server until the
   authorisation server has received the approval from the
   authentication device.

- Ping – The client waits until it is notified by the Authorisation
   Server and then it requests the token

- Push – The Authorisation server, when it receives approval from the
   authentication device pushes the Access ID Token and Refresh token
   to the client

```plantuml
@startuml HighLevelFlowCiba

skinparam {
    defaultFontColor #4080a9
    defaultBackgroundColor #d7f8ff
    defaultComponentColour #61d9de
    defaultActorColour #61d9de
    defaultFontSize 16
    defaultArrowThickness 6
    actorStyle awesome
    linetype polyline
    RoundCorner 5
    scale max 200 width
}

scale 700 width
scale 1768 height

Actor "Health Sector Participant\" as customer
Entity "API Consumer" as tp
Entity "Edge Network Components" as edge
Entity "API Provider IDP" as apipa
Entity "API Provider Service" as apips
Entity "Consent \nAuthorisation UI" as consentapp

autonumber "[00]"

tp<->customer : obtain CIBA login hint details
note right of customer
At some point prior to initiating the CIBA flow, the 
API Consumer must have obtained information to use as a 
login hint for the customer (e.g. participants phone number, 
email address, etc.) 
end note

note over edge
All external message flows that
cross the Edge Network Component
lifeline will need edge security
policies applied.
end note

tp<-[#blue]>edge : Establish MTLS

tp-[#blue]> apipa : POST /bc-authorize  
activate apipa
apipa->apipa : authenticate third Party
apipa->apipa : validate request
apipa->apipa : validate consent status

alt login_hint_token
apipa->apipa : verify login_hint
apipa->apips : resolve login hint
activate apips
apips->apips : find customer for hint
apips->apips : verify customer is eligible
apips-->apipa : response - resolved identifier
deactivate apips

apipa-[#blue]>tp : response with auth request
deactivate apipa
tp->customer : please use your mobile app to authorise consent

tp-[#blue]> apipa : POST /token
activate apipa
apipa->apipa : detects consent has not been authorised yet
apipa--[#blue]>tp : response with authorization pending error
deactivate apipa

note right of tp
The third party continues to poll the token endpoint
as long as authorization pending is returned
end note

|||
=== Consent Interaction with the Health Sector Participant ==
|||

note right of customer  
For the Decoupled Flow, this interaction is out of band and occurs at the Health Sector Participant's leisure so may not happen immediately.
end note

consentapp -> apipa : get consents awaiting authorisation from this customer
customer <-> consentapp : select consent parameters
customer <-> consentapp: obtain consent authorisation response from health sector participant

|||
=== Consent Interaction with the API Provider ==
|||

consentapp->apipa : authorise consent
alt Happy Path
activate apipa
apipa->apipa : authorise consent
apipa-->consentapp : ok response
deactivate apipa

else Declined to authorise consent
consentapp->apipa : reject consent
    activate apipa
    alt if first consent authorisation
        apipa->apipa : reject consent
    else if consent re-authorisation
        apipa->apipa : revoke consent
    end alt

    apipa-->consentapp : ok response
    deactivate apipa

end alt

@enduml
```

<DetailedDescription text="High-Level Flow of CIBA for Health Sector. This diagram depicts the high-level flow of Client-Initiated Backchannel Authentication (CIBA) for the Health Sector. It involves several actors and components, and follows a specific sequence of interactions. Actors: Health Sector Participant (Customer): The individual requesting access to health data or services. API Consumer (Third Party): A service or application seeking access to the customer's data on behalf of the customer. Components: Edge Network Components: Infrastructure components responsible for securing communication between the API Consumer and the API Provider. API Provider IDP (API Provider Identity Provider): Verifies the identity of the API Consumer. API Provider Service (API Provider Service): Handles the CIBA flow and interacts with the Consent Authorisation UI and the API Consumer. Consent Authorisation UI: Provides the customer with a user interface to grant or deny consent for data access. Flow Steps: Obtain Login Hint Details: The API Consumer gathers login hint information (e.g., phone number, email) about the customer. Establish MTLS: Secure communication is established between the API Consumer and the API Provider IDP. POST /bc-authorize (API Consumer to API Provider): The API Consumer initiates the CIBA flow by requesting a login hint token. Authenticate Third Party and Validate Request: The API Provider IDP verifies the API Consumer's identity and validates the request. Verify Login Hint (Optional): If a login hint token is provided, the API Provider IDP verifies its authenticity and resolves it to identify the customer. Find Customer and Verify Eligibility: The API Provider Service retrieves the customer's information and confirms their eligibility for the requested service. Response with Auth Request (API Provider to API Consumer): The API Provider sends a response containing an authorization request to the API Consumer. Consent Interaction with the Health Sector Participant: The API Consumer prompts the customer to use their mobile app to authorize consent for data access. The customer interacts with the Consent Authorisation UI to review and approve/deny the consent request. Consent Interaction with the API Provider: The Consent Authorisation UI sends the customer's consent decision to the API Provider. If consent is granted, the API Provider issues an access token to the API Consumer. If consent is denied, the API Provider sends an error response to the API Consumer."/>

:::info
The CIBA flow is not widely used and is included here as guidance for API designers and developers. It is likely that the CIBA flow will become more common, particularly as it is used in the Payments New Zealand API Centre Standards and therefore being adopted by financial services API providers.
:::
