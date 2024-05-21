---
title: Level of Assurance
---



Level of Assurance (LoA) has been defined to support the OpenID Connect API security framework. OpenID Connect introduces the concept of identity claims about the end user.

LoA in OIDC refers to the certainty an API Provider can have about the identity of the Health Sector Participant accessing their service. It's determined by how strong the authentication was and the verification methods used by the identity provider. Higher LoA means stronger verification. OIDC uses the Authentication Context Class Reference `acr` token claim to communicate LOA levels to API Providers.

Think of it as a confidence score for user identity: low LoA for basic tasks like commenting on a forum, high LoA for financial transactions.

The Level of Assurance or `acr` claim is required to:

- Mitigate the risk of exposing sensitive data to unauthorised users by defining an authorisation strength

- Provide a strong authentication model to reduce attack surface

- Provides a trust model that can be applied between API Consumers and API Providers

- Provides a model for granting granular access to sensitive data, basically higher levels of assurance are required for highly sensitive data

- Ensure the API Consumer has the appropriate authorisation to act on behalf of the end user

<ApiStandard id="HNZAS_MUST_ADOPT_LOA_MODEL" type="MUST" toolTip="API Providers MUST adopt a Level of Assurance model for accessing MEDICAL IN-CONFIDENCE health records.">API Providers **MUST** adopt a Level of Assurance model which can be applied when API Consumers are accessing health records that are classed as MEDICAL IN-CONFIDENCE.</ApiStandard>

<ApiStandard id="HNZAS_MUST_INDICATE_LOA_IN_TOKENS" type="MUST" toolTip="API Providers MUST indicate the Level of Assurance (LoA) in any issued tokens associated with a Health Sector Participant's authentication and authorisation process.">API Providers **MUST** indicate the LoA associated with a Health Sector Participant's authentication and authorisation process in any issued tokens.</ApiStandard>

### Level of Assurance

Issued tokens can include the following claims that relate to the Level of Assurance (LoA) of the user authentication.

The LoA captures the strength of the authentication method used and provides an indication of the trust that the user's identity is correct.

The API Provider uses these claims to confirm the level of trust that the user is who they say they are, and based on this, what level of access should be granted.

|Claim| Description| How They Are Applied|
|---|---|---|
| `acr` | Authentication Context Class Reference | <p>LoA based on a pre-defined set of values, the higher the value the stronger the LoA.</p><p>**`0` = no authentication performed**</p><ul><ApiStandard id="HNZAS_MAY_APPLY_LOA_0_TO_UNCLASSIFIED" type="MAY" toolTip="LoA 0 MAY be applied to UNCLASSIFIED information." wrapper='li'>**MAY** be applied to UNCLASSIFIED information.</ApiStandard><ApiStandard id="HNZAS_MUST_NOT_APPLY_LOA_0_TO_MEDICAL" type="MUST_NOT" toolTip="LoA 0 MUST NOT be applied to MEDICAL IN-CONFIDENCE information." wrapper='li'>**MUST NOT** be applied to MEDICAL IN-CONFIDENCE information</ApiStandard></ul><p>**`1` = credential only**</p><ul><ApiStandard id="HNZAS_MAY_APPLY_LOA_1_TO_UNCLASSIFIED" type="MAY" toolTip="LoA 1 MAY be applied to UNCLASSIFIED information." wrapper='li'>**MAY** be applied to UNCLASSIFIED information.</ApiStandard><ApiStandard id="HNZAS_MUST_NOT_APPLY_LOA_1_TO_MEDICAL" type="MUST_NOT" toolTip="LoA 1 MUST NOT be applied to MEDICAL IN-CONFIDENCE information." wrapper='li'>**MUST NOT** be applied to MEDICAL IN-CONFIDENCE information</ApiStandard></ul><p>**`2` = credential, password, and OTP**</p><ul><ApiStandard id="HNZAS_MAY_APPLY_LOA_2_TO_UNCLASSIFIED" type="MAY" toolTip="LoA 2 MAY be applied to UNCLASSIFIED information." wrapper='li'>**MAY** be applied to UNCLASSIFIED information.</ApiStandard><ApiStandard id="HNZAS_MUST_NOT_APPLY_LOA_2_TO_MEDICAL" type="MUST_NOT" toolTip="LoA 2 MUST NOT be applied to MEDICAL IN-CONFIDENCE information." wrapper='li'>**MUST NOT** be applied to MEDICAL IN-CONFIDENCE information</ApiStandard></ul><p>**`3` = password, OTP, and multi-factor authentication required**</p><ul><ApiStandard id="HNZAS_MUST_APPLY_LOA_3_TO_MEDICAL" type="MUST" toolTip="LoA 3 MUST be applied to MEDICAL IN-CONFIDENCE information." wrapper='li'>**MUST** be applied to MEDICAL IN-CONFIDENCE information</ApiStandard></ul> |
|`amr`|Authentication Methods References|Details the authentication method used e.g.<br/>-    password<br/>-  OTP<br/>-   Biometrics<br/><br/> API Providers can define the requirements (acr) based on this information which are enforced by the API Consumers  |
|`azp`| Authorised party| Client id of the API Consumer, used where there can be multiple API Consumer services|

## Aotearoa New Zealand LoA Standards

There are two key Level of Assurance standards in use in Aotearoa:

    -   [<u>New Zealand Department of Internal Affairs - Identification Management Standards</u>](https://www.digital.govt.nz/standards-and-guidance/identification-management/identification-management-standards/applying-the-standards/)

    -   [<u>National Institute of Standards and Technology (NIST) - Digital Identity Guidelines</u>](https://pages.nist.gov/800-63-3/sp800-63-3.html)

### New Zealand Department of Internal Affairs - Identification Management Standards

Defines four components that focus on the assurance process

- IA  -   Information Assurance
- BA  -   Binding Assurance
- AA  -   Authentication Assurance
- FA  -   Federation Assurance

### National Institute of Standards and Technology - Digital Identity Guidelines (NIST)

Defines three levels of confidence in the identity of an end user.

- Identity Assurance Level
- Authenticator Assurance level
- Federation Assurance level

## Additional LoA Standards

### FHIR

FHIR currently define a trial Use [<u>Level of Assurance model</u>](https://hl7.org/fhir/valueset-identity-assuranceLevel.html).

This defines the four levels of identity assurance:

|Code|Definition|
|---|---|
|Level 1| Little or no confidence in the asserted identity's  accuracy|
|Level 2|Some confidence in the asserted identity's accuracy|
|Level 3| High Confidence in the asserted identity's accuracy
|Level 4 |Very High confidence in the asserted identity accuracy|

## OpenID Connect Level of Assurance Standards

<ApiStandard id="HNZAS_MAY_USE_OIDC_LOA_MODEL" type="MAY" toolTip="OpenID Connect and Financial Grade API (FAPI) define a Level of Assurance model that API providers MAY use to implement LOA standards.">OpenID Connect and Financial Grade API (FAPI) define a Level of Assurance model that API providers **MAY** use to implement the standards defined above.</ApiStandard>
