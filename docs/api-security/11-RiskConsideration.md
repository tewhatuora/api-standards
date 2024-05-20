---
title: Consideration of Risks
---



:::info
An API offers a direct channel into some part of an organisation’s resources and information.  

Most organisations are accustomed to exposing a web site with good control over what information is released via that interface.  However, as API access is not visible, it cannot easily be observed when information is being incorrectly exposed.  

Therefore, it is important that API Providers consider their consumers and the consumers of those consumers to determine risks and what information should be accessible via APIs.
:::

## Consideration of Risks

<ApiStandard id="HNZAS_MUST_SHOW_RISK_ASSESSMENT" type="MUST" toolTip="API designers and implementers MUST show how they have assessed and managed risks associated with their API solution." wrapper='span'>API designers and implementers **MUST** show how they have assessed and managed risks associated with their API solution.</ApiStandard> This assessment should be conducted during API design and be part of ongoing risk assessments of their APIs and products. <ApiStandard id="HNZAS_SHOULD_MAINTAIN_RISK_ASSESSMENT_RECORDS" type="SHOULD" toolTip="Records of risk assessment, current status, and mitigation SHOULD be maintained in API Provider risk management systems." wrapper='span'>Records of risk assessment, current status, and mitigation **SHOULD** be maintained in API Provider risk management systems.</ApiStandard>

This standard calls for API designers/implementers to **show** they have considered API security risk mitigation.  This would generally be **demonstrated by design documentation** or where security mitigations are being re-used from other solutions, by reference to documentation or certification of those solutions / components.

| Check | Risk category                | Consideration which **MUST** be shown                                   | Suggested evidence of consideration ^ |
| :---  | :--------------------------- | :---------------------------------------------------------------------- | :----------------- |
|   ▢   | Identity & access management | <ul><ApiStandard id="HNZAS_MUST_CONSIDER_AUTHENTICATION_RISK" type="MUST" toolTip="Risk assessments considering identity & access management MUST consider authentication." wrapper="li">Authentication</ApiStandard><ApiStandard id="HNZAS_MUST_CONSIDER_AUTHORIZATION_RISK" type="MUST" toolTip="Risk assessments considering identity & access management MUST consider authorization and delegated authority." wrapper="li">Authorization and delegated authority</ApiStandard><ApiStandard id="HNZAS_MUST_CONSIDER_FEDERATION_RISK" type="MUST" toolTip="Risk assessments considering identity & access management MUST consider federation." wrapper="li">Federation</ApiStandard></ul> | SAD, SDS |
|   ▢   | Confidentiality              | <ApiStandard id="HNZAS_MUST_ENSURE_CONSUMER_APPLICATIONS_ACCESS_PERMITTED_RESOURCES" type="MUST" toolTip="Risk assessments considering confidentiality MUST ensure that consuming applications access only permitted API resources." wrapper="li">How will it be assured that a consuming application access only permitted API resources</ApiStandard><ApiStandard id="HNZAS_MUST_ENSURE_CONSUMERS_COMMUNICATE_WITH_INTENDED_API_PROVIDER" type="MUST" toolTip="Risk assessments considering confidentiality MUST ensure that consumers are assured they are communicating with the intended API provider." wrapper="li">How will consumers be assured they are communicating with the intended API provider</ApiStandard><ApiStandard id="HNZAS_MUST_APPLY_SPECIFIC_DATA_ACCESS_CONTROL_MEASURES" type="MUST" toolTip="Risk assessments considering confidentiality MUST specify data access control measures on a per-consumer or per-user-per-consumer basis." wrapper="li">What specific data access control measures does the API need to apply on a per-consumer or per-user-per-consumer basis?</ApiStandard>  | SAD, SDS |
|   ▢   | Integrity                    | <ApiStandard id="HNZAS_MUST_ASSURE_DATA_ACCURACY_COMPLETENESS_QUALITY" type="MUST" toolTip="Risk assessments considering integrity MUST ensure the API assures accuracy, completeness, and quality of data." wrapper="li">How will the API assure accuracy, completeness, and quality of data?</ApiStandard><ApiStandard id="HNZAS_MUST_MAINTAIN_INTEGRITY_OVER_TIME" type="MUST" toolTip="Risk assessments considering integrity MUST ensure that integrity is maintained over time." wrapper="li">How will integrity be maintained over time?</ApiStandard><ApiStandard id="HNZAS_MUST_ENSURE_MESSAGE_CONTENT_UNTAMPERED" type="MUST" toolTip="Risk assessments considering integrity MUST ensure the API solution ensures message content has not been tampered with between consumer and provider." wrapper="li">How does the API solution ensure message content has not been tampered with between consumer and provider?</ApiStandard> | SAD, SDS |
|   ▢   | Availability / Threat Protection | <ApiStandard id="HNZAS_MUST_DEFINE_AVAILABILITY_SERVICE_LEVEL" type="MUST" toolTip="Risk assessments considering availability MUST define the required availability service level for the API." wrapper="li">What is the required availability service level for the API?</ApiStandard><ApiStandard id="HNZAS_MUST_IDENTIFY_API_ACCESS_THREATS" type="MUST" toolTip="Risk assessments considering threat protection MUST identify potential threats in API access." wrapper="li">What threats have been identified in potential API access?</ApiStandard><ApiStandard id="HNZAS_MUST_ASSESS_THREAT_RISK" type="MUST" toolTip="Risk assessments considering threat protection MUST assess the risk of identified threats." wrapper="li">What is the risk assessment of these threats?</ApiStandard><ApiStandard id="HNZAS_MUST_MITIGATE_MANAGE_THREATS" type="MUST" toolTip="Risk assessments considering threat protection MUST specify measures to mitigate/manage identified threats." wrapper="li">What measures will be used to mitigate/manage?</ApiStandard> | SAD, SDS, OMP |
|   ▢   | Logging and alerting         | <ApiStandard id="HNZAS_MUST_DETECT_FRAUDULENT_USE" type="MUST" toolTip="Risk assessments considering logging and alerting MUST ensure that fraudulent or malicious use of the API is detectable." wrapper="li">How will fraudulent/malicious use of the API be detectable?</ApiStandard><ApiStandard id="HNZAS_MUST_ALERT_ORGANIZATION_TO_MALICIOUS_USE" type="MUST" toolTip="Risk assessments considering logging and alerting MUST ensure that the organization is alerted to malicious use or misuse of the API." wrapper="li">How will the organization be alerted to malicious use or misuse of the API?</ApiStandard><ApiStandard id="HNZAS_MUST_OBTAIN_ATTACKER_TRAIL" type="MUST" toolTip="Risk assessments considering logging and alerting MUST ensure that a trail of an attacker's activity can be observed or obtained." wrapper="li">How will a trail of an attacker's activity be observed/obtained?</ApiStandard> | SAD, OMP |
|   ▢   | Incident management          | <ApiStandard id="HNZAS_MUST_REPORT_INCIDENTS" type="MUST" toolTip="Risk assessments considering incident management MUST ensure that incidents are reported." wrapper="li">How will incidents be reported?</ApiStandard><ApiStandard id="HNZAS_MUST_MANAGE_INCIDENTS" type="MUST" toolTip="Risk assessments considering incident management MUST ensure that incidents are managed by designated personnel." wrapper="li">Who will manage incidents?</ApiStandard><ApiStandard id="HNZAS_MUST_PROVIDE_PROTECTIVE_ACTIONS" type="MUST" toolTip="Risk assessments considering incident management MUST ensure that protective actions are available if an incident occurs." wrapper="li">What protective actions will be available if an incident occurs?</ApiStandard> | SAD, OMP |

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

<ul>
<ApiStandard id="HNZAS_SHOULD_APPLY_STRONG_IDENTIFICATION_AUTHENTICATION_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD apply strong identification and authentication." wrapper="li">Apply Strong Identification and Authentication</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_BUILD_DYNAMIC_DIGITAL_TRUST_MODEL_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD build a digital trust model that is dynamic -- trust is only valid for a current session." wrapper="li">Build a digital trust model that is dynamic -- trust is only valid for a current session</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_CONSTANTLY_EVALUATE_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD apply constant evaluation." wrapper="li">Constant evaluation</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_ALWAYS_AUTHENTICATE_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD always authenticate." wrapper="li">Always authenticate</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_APPLY_CONTEXTUAL_AUTHORISATION_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD apply contextual authorisation (Attributes, Consent, Location, Time, Behaviour, etc.)." wrapper="li">Apply contextual authorisation (Attributes, Consent, Location, Time, Behaviour etc.)</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_BUILD_DIGITAL_RISK_CAPABILITY_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD build in a digital risk capability that maps to a level of confidence." wrapper="li">Build in a Digital Risk capability that maps to a level of confidence and constantly re-evaluates</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_INCORPORATE_ENDPOINT_SECURITY_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD incorporate endpoint (device) security." wrapper="li">Incorporate endpoint (device) security</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_APPLY_TRANSACTION_LEVEL_VERIFICATION_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD apply transaction-level verification and continuous session validation." wrapper="li">Transaction-level verification and continuous session validation</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_APPLY_DATA_SECURITY_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD apply data security (encryption, user privacy controls, consent management)." wrapper="li">Apply data security with reference to encryption and user privacy controls including consent management</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_IMPLEMENT_STRONG_AUDITING_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD implement strong auditing, logging, event reporting and forensics." wrapper="li">Implement strong auditing, logging, event reporting and forensics providing insight and behavioural patterns</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_USE_AUTOMATED_THREAT_DETECTION_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD use automated (ML) analytics approaches to threat detection." wrapper="li">Automated (e.g., machine learning) analytics approaches to threat detection</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_INJECT_IDENTITY_CONTEXT_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD inject identity context into API traffic." wrapper="li">Inject Identity context into the API traffic (User, Application, Device etc)</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_APPLY_FINE_GRAINED_ACCESS_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD apply fine-grained access at egress points to modify or block responses." wrapper="li">Apply fine-grained access at egress points to modify or block responses</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_PROPAGATE_IDENTITY_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD propagate identity through to backend services to make decisions." wrapper="li">Propagate identity through to backend services to make decisions</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_SECURE_APIS_AS_PUBLIC_ZT_ARCH" type="SHOULD" toolTip="Zero trust architectures SHOULD secure all APIs as if they are public." wrapper="li">Secure all APIs as if they are public</ApiStandard>
</ul>
