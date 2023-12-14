---
title: Cloud API security
---

:::tip[Status]
Ready for review
:::

:::info
In general, '*cloud API* ' here means **any API** which is intended to handle NZ health information and provides or exposes cloud-deployed data or functions.
:::

The primary purpose of a cloud API may be to:

- Expose a specific commercial health information service, or
- Serve as a 'cross-platform' integration of endpoints across diverse cloud services, or
- Proxy for an application or service running in a legacy environment.

Regardless of the intended purpose, cloud APIs generally involve communication between an API provider implementation in as-a-service, shared public infrastructure, an API consumers that send API requests across a public network.

For these reasons, the measures defined below must be taken to mitigate or eliminate risks inherent in cloud API provision and consumption.

### Applicability

This standard defines the requirements for all cloud APIs which:

- provide storage and access to NZ health information classified as *MEDICAL IN CONFIDENCE* per the HISO 10029 standard[^1], and
- provide or expose application functionality or services which execute in a commercial **cloud computing environment**[^2] accessed through public infrastructure.

### Requirements

Cloud API designers/developers **MUST** ensure the implementation achieves all of the following requirements:

| Check | Requirement                                         | Interpretation                            |
| :---  | :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
|   ▢   | Require robust authentication and authorisation     | OAuth2, SSO with OpenId Connect, request-level authorisation. |
|   ▢   | Validate all incoming requests                      | *All* content of *all* incoming messages **MUST** be validated by the API implementation and/or its supporting infrastructure |
|   ▢   | Throttle API requests and establish quotas          | Limit request rates to all endpoints that have the potential to consume or commit substantial human, compute or data resources |
|   ▢   | Log API activity                                    |  |
|   ▢   | Depend only on trusted code libraries / packages    |  |
|   ▢   | Implement a zero-trust model                        | Do not allow session-based authentication eg. cookies           |
|   ▢   | Filter traffic traversing public networks           | WAFs and API gateways to control requests arriving on Internet routes   |
|   ▢   | Specific identity and access management             | Set specific policies / permissions that control access to sensitive resources like credentials, keys, configuration etc. |

***

### Further reading

The following are resources are recommended references for those designing and implementing cloud APIs:

- New Zealand Information Security Manual (NZISM)

- Protective Security Requirements (PSR)

- Center for Internet Security (CIS)

- Cloud Security Alliance (CSA)

- CERT NZ Critical Controls.

***

[^1]: [**HISO 10029:2022 Health Information Security Framework**](https://consult.health.govt.nz/hiso/health-information-security-framework-update)

[^2]: Amazon Web Services, Microsoft Azure or Google Cloud Platform, etc.
