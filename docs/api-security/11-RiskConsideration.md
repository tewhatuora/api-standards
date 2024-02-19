---
title: Consideration of Risks
---

:::warning[Status]
Content is draft and in review – this content may change until review is complete and formally published.
:::

:::info
An API offers a direct channel into some part of an organisation’s resources and information.  

Most organisations are accustomed to exposing a web site with good control over what information is released via that interface.  However, as API access is not visible, it cannot easily be observed when information is being incorrectly exposed.  

Therefore, it is important that API Providers consider their consumers and the consumers of those consumers to determine risks and what information should be accessible via APIs.
:::

## Consideration of Risks

API designers and implementers **MUST** show how they have assessed and managed risks associated with their API solution.  This assessment should be conducted during API design and be part of ongoing risk assessments of their APIs and products.  Records of risk assessment, current status and mitigation **SHOULD** be maintained in API Provider risk management systems.

This standard calls for API designers/implementers to **show** they have considered API security risk mitigation.  This would generally be **demonstrated by design documentation** or where security mitigations are being re-used from other solutions, by reference to documentation or certification of those solutions / components.

| Check | Risk category                | Consideration which **MUST** be shown                                   | Suggested evidence of consideration ^ |
| :---  | :--------------------------- | :---------------------------------------------------------------------- | :----------------- |
|   ▢   | Identity & access management | -Authentication<br/> -Authorisation and delegated authority <br/> -Federation | SAD, SDS |
|   ▢   | Confidentiality              | -How will it be assured that a consuming application access only permitted API resources<br/>-How will consumers be assured they are communicating with the intended API provider <br/>-What specific data access control measures does the API need to be apply on a per-consumer or per-user-per-consumer basis?  | SAD, SDS |
|   ▢   | Integrity                    | -How will the API assure accuracy, completeness, and quality of data?<br/>-How will integrity be maintained over time?<br/>How does the API solution ensure message content has not been tampered with between consumer and provider | SAD, SDS |
|   ▢   | Availability / Threat Protection | -What is the required availability service level for the API?<br/>-What threats have been identified in potential API access?<br/>-What is the risk assessment of these threats?<br/>-What measures will be used to mitigate/manage? | SAD, SDS, OMP |
|   ▢   | Logging and alerting         | -How will fraudulent / malicious use of the API be detectable?<br/>-How will the organisation be alerted to malicious use or misuse of the API?<br/>-How will a trail of an attacker's activity be observed/obtained? | SAD, OMP |
|   ▢   | Incident management          | -How will incidents be reported?<br/>-Who will manage incidents?<br/>-What protective actions will be available if an incident occurs? | SAD, OMP |

^: type of evidence
*SAD* - API solution architecture documentation
*SDS* - API solution design and / or specification
*OMP* - operational management plan

## API-related risks

APIs may increase information security risks, when compared to a web channel, as follows:

- Expanded attack surface hazard: another way in; multiple services to potentially exploit

- Increased consequences of inadvertent exposure: internal data, application functions and architecture can potentially be visible.

- Potential for greater consequences if your API is
  compromised/hijacked and serves up malicious payloads to consumers

- Elevated privacy concerns where APIs give access to personally-identifiable information

- Upload of malware, ransomware or other malicious payloads if incoming requests are not validated and scanned

- Risk relating to cloud and container-based systems if security practices are lax.

- APIs may enable bulk retrieval of resources which if not controlled can inadvertently allow large data extents to be accessed / downloaded

- Attackers may use resource-create / update operations to introduce misinformation into an organisation's data stores, or misuse these operations to intentionally overload the organisation's services and deny access to others (denial of service attack).

- Use of wildcards in search fields, if allowed to flow through to backend datastores, can cause components to release too much information or fail due to excessive load.

- Cross site scripting attacks made possible by consuming applications not checking user inputs

- SQL injection into consuming applications which cause damaging database queries inside the API implementation

- Parameter attacks such as HTTP Parameter Pollution (HPP)

- Man-in-the-middle attacks, modifying API requests or responses leading to data eavesdropping or misinformation insertion

- Subverting authentication or authorisation mechanisms to spoof messages from legitimate consumers

- Credential leakage or stealing authentication tokens to obtain information illicitly

- System information leakage through API error messages revealing details about an API’s construction or underlying system makeup

- Broken Session IDs, Keys and authentication create exposure to unauthorised access through authentication factors that are not functioning because of poor security design or technology bugs.

- Other broken resource identifiers, authentication and authorisation mechanisms, allowing attackers to exploit flaws to obtain access, either temporarily or permanently.

- Exposing too much information through the use of generic resource APIs rather than specialising APIs for each specific circumstance

---

### Towards Zero Trust and Decoupled Environments

:::info
Zero trust (ZT) is the term for an evolving set of cybersecurity paradigms that move defenses from static, network- based perimeters to focus on users, assets, and resources. A zero trust architecture (ZTA) uses zero trust principles to plan industrial and enterprise infrastructure and workflows. Zero trust assumes there is no implicit trust granted to assets or user accounts based solely on their physical or network location (i.e., local area networks versus the internet) or based on asset ownership (enterprise or personally owned).

Excerpt from [NIST definition](https://www.nist.gov/publications/zero-trust-architecture)
:::

*Zero Trust* architecture removes the concept of trusted internal and untrusted external networks and focuses on a principle of "never trust always verify”.

The uptake of cloud services has brought this security model to the fore -- all actors (employees, partners etc) require access controls no matter where they are located or what devices they are using.

Organisations planning to implement a Zero Trust architecture **SHOULD** consider the following:

- Apply Strong Identification and Authentication

- Build a digital trust model that is dynamic -- trust is only valid for a current session

- Constant evaluation

- Always authenticate

- Apply contextual authorisation (Attributes, Consent, Location, Time, Behaviour etc.)

- Build in a Digital Risk capability that maps to a level of confidence and constantly re-evaluates

- Incorporate endpoint (device) security

- Transaction-level verification and continuous session validation

- Apply data security with reference to encryption and user privacy controls including consent management

- Implement strong auditing, logging, event reporting and forensics providing insight and behavioural patterns

- Automated (e.g. machine learning) analytics approaches to threat detection

- Inject Identity context into the API traffic (User, Application, Device etc)

- Apply fine-grained access at egress points to modify or block responses

- Propagate identity through to backend services to make decisions

- Secure all APIs as if they are public
