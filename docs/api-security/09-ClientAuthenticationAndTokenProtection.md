---
title: Client Authentication and Token Protection
---



## Client Authentication Standards

The role of Client Authentication in OAuth 2.0 and OpenID Connect is to help maintain the integrity and security of the authentication flow. Its objective is to enure that only authorised API Consumers can interact with API Providers.

<ApiStandard id="HNZAS_SHOULD_SECURE_MEDICAL_APIS" type="SHOULD" toolTip="All medical in-confidence APIs SHOULD be secured using Client Authentication to protect the token endpoint.">All MEDICAL IN-CONFIDENCE APIs **SHOULD** be secured using Client Authentication to protect the API endpoints.</ApiStandard>

<ApiStandard id="HNZAS_MUST_BIND_TOKENS_TO_CLIENT" type="MUST" toolTip="Tokens issued MUST be bound to the client.">Tokens issued **MUST** be bound to the client.</ApiStandard>

There are four authentication models that can be applied to secure the Confidential Client connection from the API Consumer to the API Provider's token endpoint.

- Shared Client Secret
- JWT Based Authentication
- Private Key JWT
- Mutual TLS

## Shared Client Secret Method

An API Consumer creates a client with an API Provider and they are issued with a Client ID and a Client Secret.

### Client ID

This is used when the API Consumer interacts with the API Provider. Used on both the authorise and token endpoint.

### Client Secret

This is used with the Client ID when exchanging a code for an access token on the token endpoint of the API Provider Server.

Shared Client secrets have to stored by both the API Consumer and API Provider. There are two Share Client secret methods:

### `client_secret_basic`

This model uses the HTTP Basic authentication scheme, and the client ID and client secret are encoded (Base 64). An example of a call to the token endpoint is shown below where the secret is presented in the header.

<!-- cspell:disable -->

      ```json
      POST /token
      Authorization: Basic czZCaGRSa3F0Mzo3RmpmcDBaQnIxS3REUmJuZlZkbUl3
      Content_Type: application/x-www-form-urlenclosed
      ```
<ApiStandard id="HNZAS_MAY_USE_CLIENT_SECRET_BASIC_FOR_UNCLASSIFIED" type="MAY" toolTip="Client secret basic auth MAY be used for UNCLASSIFIED APIs.">Client secret basic auth **MAY** be used for UNCLASSIFIED APIs.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_USE_CLIENT_SECRET_BASIC_FOR_MEDICAL" type="SHOULD_NOT" toolTip="Client secret basic auth SHOULD NOT be used for MEDICAL IN-CONFIDENCE APIs.">Client secret basic auth **SHOULD NOT** be used for MEDICAL IN-CONFIDENCE APIs.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_USE_CLIENT_SECRET_BASIC_FOR_PUBLIC_CLIENTS" type="SHOULD_NOT" toolTip="Client secret basic auth SHOULD NOT be used with Public Clients.">Client secret basic auth **SHOULD NOT** be used with Public Clients.</ApiStandard>

<ApiStandard id="HNZAS_MUST_SECURELY_STORE_CLIENT_SECRET_BASIC" type="MUST" toolTip="Confidential clients MUST securely store client secret basic auth credentials.">Confidential clients **MUST** securely store these credentials.</ApiStandard>

### `client_secret_post`

This sends the client ID and secret within a POST body so it is percieved as a more secure process than `client_secret_basic`.

<!-- cspell:disable -->
      ```json
      POST /token
      Content_Type: application/x-www-form-urlenclosed
      client_id=cccc
      &client_secret=xxxxx
      ```

<!-- cspell:enable -->

<ApiStandard id="HNZAS_MAY_USE_CLIENT_SECRET_POST_FOR_UNCLASSIFIED" type="MAY" toolTip="Client secret post auth MAY be used for UNCLASSIFIED APIs.">Client secret post auth **MAY** be used for UNCLASSIFIED APIs.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_USE_CLIENT_SECRET_POST_FOR_MEDICAL" type="SHOULD_NOT" toolTip="Client secret post auth SHOULD NOT be used for MEDICAL IN-CONFIDENCE APIs.">Client secret post auth **SHOULD NOT** be used for MEDICAL IN-CONFIDENCE APIs.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_USE_CLIENT_SECRET_POST_FOR_PUBLIC_CLIENTS" type="SHOULD_NOT" toolTip="Client secret post auth SHOULD NOT be used with Public Clients.">Client secret post auth **SHOULD NOT** be used with Public Clients.</ApiStandard>

<ApiStandard id="HNZAS_MUST_SECURELY_STORE_CLIENT_SECRET_POST" type="MUST" toolTip="Confidential clients MUST securely store client secret post auth credentials.">Confidential clients **MUST** securely store these credentials.</ApiStandard>

## JWT based Authentication Methods

There are two JWT authentication methods which provide a higher level of security over `client_secret_basic` and `client_secret_post`.

### `client_secret_jwt`

This method still requires a client ID and client secret to be managed but the client secret does not get sent during the authentication process and the body of the JWT contains an expiry time for the token.

The API Consumer creates the JWT and embeds the client ID in the body of the token. The client secret is then used as a key for a symmetric algorithm to calculate the JWT signature.

<!-- cspell:disable -->

      ```json
      POST /token HTTP/1.1
      Host: as.example.com
      Content-Type: application/x-www-form-urlencoded

      grant_type=authorization_code
      &code=Gw30fMKJBHkcOBSde5awLrMm4ahvgCNM2cFSTUOUflY
      &redirect_uri=https://health.govt.nz/redirection
      &client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
      &client_assertion=eyJhbGciOiJIUzI1NiJ9.ewogICJqd.......
      ```
<!-- cspell:enable -->

<ApiStandard id="HNZAS_MAY_USE_CLIENT_SECRET_JWT_FOR_UNCLASSIFIED" type="MAY" toolTip="Client secret JWT auth MAY be used for UNCLASSIFIED APIs.">Client secret JWT auth **MAY** be used for UNCLASSIFIED APIs.</ApiStandard>

<ApiStandard id="HNZAS_MAY_USE_CLIENT_SECRET_JWT_FOR_MEDICAL" type="MAY" toolTip="Client secret JWT auth MAY be used for MEDICAL IN-CONFIDENCE APIs.">Client secret JWT auth **MAY** be used for MEDICAL IN-CONFIDENCE APIs.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_USE_CLIENT_SECRET_JWT_FOR_PUBLIC_CLIENTS" type="SHOULD_NOT" toolTip="Client secret JWT auth SHOULD NOT be used with Public Clients.">Client secret JWT auth **SHOULD NOT** be used with Public Clients.</ApiStandard>

<ApiStandard id="HNZAS_MAY_USE_CLIENT_SECRET_JWT_FOR_CONFIDENTIAL_CLIENTS" type="MAY" toolTip="Client secret JWT auth MAY be used with Confidential Clients.">Client secret JWT auth **MAY** be used with Confidential Clients.</ApiStandard>

### `private_key_jwt`

This method does not use a client secret, it relies on asymmetric cryptography. The API Consumer holds both a private key for signing and a public key for verification.

The public key is registered with the API Provider, allowing it to validate the JWT signed by the API Consumer's private key.

This is a less complex solution that tls_client_auth.

<!-- cspell:disable -->

      ```json
      POST /token HTTP/1.1
      Host: [www.holder.co.nz]
      Content-Type: application/x-www-form-urlencoded
      grant_type=client_credentials&
      client_id=5ntwEOpMdPxxy49Gt28SXWY6j3afl2CP2&
      scope=admin%3Ametrics.basic%3Aread&
      client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
      client_assertion=eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNDU2In0.ey ...
      ```
<!-- cspell:enable -->

<ApiStandard id="HNZAS_SHOULD_USE_PRIVATE_KEY_JWT_FOR_MEDICAL" type="SHOULD" toolTip="Private key JWT SHOULD be used when protecting MEDICAL IN-CONFIDENCE APIs via a confidential client.">This **SHOULD** be used when protecting MEDICAL IN-CONFIDENCE APIs via a confidential client.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_USE_PRIVATE_KEY_JWT_FOR_PUBLIC_CLIENTS" type="SHOULD_NOT" toolTip="Private key JWT SHOULD NOT be used with Public Clients.">Private key JWT **SHOULD NOT** be used with Public Clients.</ApiStandard>

## Mutual TLS Method

There are two methods:

- **`self_signed_tls_client_auth`**

      A self-signed client X509 certificate is used to authenticate the client.

- **`tls_client_auth`**

      A client X509 certificate that has been issued from a trusted certificate authority is used to authenticate the client.

Both add security enhancement as they use mTLS creating a two way trust between the API Consumer and API Provider but add complexity to the design.

<ApiStandard id="HNZAS_MAY_USE_SELF_SIGNED_TLS_FOR_TESTING" type="MAY" toolTip="Self-signed TLS client auth MAY be used in Testing and Development environments but SHOULD NOT be used in production implementations.">`self_signed_tls_client_auth` **MAY** be used in Testing and Development environments but **SHOULD NOT** be used in production implementations.</ApiStandard>

<ApiStandard id="HNZAS_MAY_USE_TLS_CLIENT_AUTH_FOR_PRODUCTION" type="MAY" toolTip="TLS client auth MAY be used in a production implementation and MAY be used in a confidential client.">`tls_client_auth` **MAY** be used in a production implementation and **MAY** be used in a confidential client.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_NOT_USE_TLS_AUTH_FOR_PUBLIC_CLIENTS" type="SHOULD_NOT" toolTip="Public clients SHOULD NOT use self-signed TLS or TLS client auth methods.">Public clients **SHOULD NOT** use either of these authentication methods.</ApiStandard>

## Token Protection

One of the big risks with OAuth 2.0 and OpenID Connect is token theft, where an access token is captured and used to obtain information from an API Provider's protected resource.

OpenID Connect provides a mechanism of demonstrating Proof of Possession (DPoP) that strengthens the client authentication and helps to verify that the access token belongs to the API Consumer client. It:

- Links the access token to the client
- The client presenting the access token has to provide proof of possession of the Access token and the identity of the client to the resource server
- The proof of possession is linked to a cryptographic key.

There are two DPoP methods defined by OpenID Connect.

### JWK-based Proof of Possession

- API Consumer generates a public-private key pair
- The API Consumer generates a `DPoP` JWT which contains the public key and signed with the private key
- When the API Consumer requests an access token from the API Provider's token endpoint it includes the `DPoP` jwt in the request header
- The JWT access token returned includes `token_type = DPoP` to signify the access token is not a bearer token and is bound to the API Consumer's key by embedding the API Consumer's public key
- The API Consumer sends the JWT access token to the API Provider resource server with another `DPoP` header and `Authorization` header
- The API provider validates the `DPoP` header and `DPoP`-bound access token in the `Authorization`.

### Certificate-based Proof of Possession

- The API Consumer initiates and establishes mTLS with the API Provider when it requests the access token
- The API Provider validates the API Consumer's certificate
- The API Provider issues the access token with an additional claim containing a hash of the API Consumer's certificate
- The API Provider resource server receives the access token and validates the token and the client certificate and if correct responds to the API Consumer.

Certificate-based proof of possession has a higher level of security than the JWT PoP as it includes mTLS.

<ApiStandard id="HNZAS_MAY_USE_DPOP_FOR_MEDICAL" type="MAY" toolTip="When protecting MEDICAL IN-CONFIDENCE APIs, a DPoP model MAY be used.">When protecting MEDICAL IN-CONFIDENCE APIs a DPoP model **MAY** be used.</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_BASE_CERT_OR_JWT_ON_RISK" type="SHOULD" toolTip="Selection of the certificate or the JWT PoP SHOULD be based on a risk assessment considering the sensitivity of the information exposed by the API.">Selection of the certificate or the JWT PoP **SHOULD** be based on a risk assessment taking into account the sensitivity of the information being exposed by the API.</ApiStandard>
