---
title: FHIR Security
---


:::info
This page should be reviewed alongside the [Part D: FHIR API Design and Development Standards](../fhir-api-standard/index.md)
:::

The FHIR specification itself is not a security protocol nor does it define any security related functionality - it suggests the use of a security sub-system such as an API Gateway that performs user authentication and authorisation, which is the guidance of this section of the standards.

There are a few items in the FHIR specification related to security which should be used where appropriate which are detailed below.

## FHIR Security Labels

Security Labels are part of the `meta.security` element of every FHIR resource, and in other elements of certain resources such as `Consent.provision.securityLabel`. They are tags that provide specific security metadata about the information in the resource that it is attached to. The intent of a security label is that the recipient of resources or bundles with security-tags is obligated to enforce the handling caveats of the tags and carry the security labels forward as appropriate.

<ApiStandard id="HNZAS_SHOULD_USE_FHIR_SECURITY_LABELS" type="SHOULD" toolTip="FHIR Security labels SHOULD be used to convey information on a resource's confidentiality requirements where necessary.">
  FHIR Security labels **SHOULD** be used as a means to convey information on a resource's confidentiality requirements if they differ from other information that is present in the FHIR Server or what has been defined in an Implementation Guide.
</ApiStandard>

An example JSON FHIR search result that includes a resource that the receiving application must delete all copies of the resource after using it:

```json
{
  "resourceType" : "Bundle",
  "type" : "searchset",
  "entry" : [
     {
       "resource": {
         "id" : "1",
         "meta" : {
           "security" : [{
             "system" : "http://terminology.hl7.org/CodeSystem/v3-ActCode",
             "code" : "DELAU",
             "display" : "delete after use"
           }]
         }
       }
     }
  ]
}

```

<p><ApiStandard id="HNZAS_MAY_DEFINE_CUSTOM_SECURITY_TAGS" type="MAY" toolTip="API Providers MAY define their own security tags by creating custom ValueSets and CodeSystems if needed." wrapper='span'>There are a number of FHIR Core security tags available within the [FHIR defined ValueSet](https://hl7.org/fhir/R4/valueset-security-labels.html), however API Providers **MAY** define their own by creating custom ValueSets and CodeSystems.</ApiStandard> <ApiStandard id="HNZAS_SHOULD_USE_SECURITY_LABELS" type="SHOULD" toolTip="All conformant FHIR API Providers SHOULD use these security labels where appropriate." wrapper='span'>All conformant FHIR API Providers **SHOULD** use these security labels where appropriate, </ApiStandard> <ApiStandard id="HNZAS_MUST_RESPECT_SECURITY_LABELS" type="MUST" toolTip="Clients MUST respect the security labels used by FHIR API Providers." wrapper='span'> and clients **MUST** respect them.</ApiStandard></p>

The [core labels](https://hl7.org/fhir/R4/valueset-security-labels.html) tend to fall into one of three categories:

### Purpose of use

From `CLINTRCH` (clinical trial research) to `ETREAT` (emergency treatment)

If a resource is labelled as "clinical trial research" data, you should not be handling it as if it were regular data.

### Confidentiality code

From `U` (unrestricted) to `R` (restricted)

A "very restricted" label might signify sensitive condition data such an an HIV or domestic violence information.

### Control of flow

From `DELAU` (delete after use) to `HTEST` (test health data)

If it comes with a "Delete After Use" label, the data should **NEVER** be stored.

For further reading, see [FHIR Security Labels](https://build.fhir.org/security-labels.html).

## AuditEvent

FHIR provides an [AuditEvent](https://build.fhir.org/auditevent.html) resource suitable for use by FHIR API Providers to record when a security or privacy relevant event has occurred. This form of audit logging as a FHIR resource allows other correctly authorised systems to access audit events such as audit reporting or alerting systems.

## Access control considerations

A REST API conforming to FHIR will likely support much more than standard CRUD operations. FHIR Search offers a rich interface which supports consumers to retrieve related resources using search parameters `_include` and `_revinclude`. It is important that the security model used considers whether the client has permission to access the resource being searched on, in addition to all of the possible included resources.

## Resource sensitivity

Typically, the resources defined in FHIR can fall into four sensitivity buckets:

<ApiStandard id="HNZAS_MUST_USE_ACCESS_CONTROL_FOR_PATIENT_SENSITIVE" type="MUST" toolTip="Access to patient sensitive resources MUST use some form of access control mechanism and consent." wrapper='span'>
  - **Patient sensitive** - these resources make up the bulk of FHIR and contain highly sensitive health information such as a `Condition`. Access to these resources **MUST** use some form of access control mechanism and consent.
</ApiStandard>

<ApiStandard id="HNZAS_MUST_USE_ACCESS_CONTROL_FOR_INDIVIDUAL_SENSITIVE" type="MUST" toolTip="Access to individual sensitive resources MUST use some form of access control." wrapper='span'>
  - **Individual sensitive** - these resources do not contain patient data but contain data about an individual such as a `RelatedPerson` or `Practitioner`. Access to these resources **MUST** use some form of access control.
</ApiStandard>

<ApiStandard id="HNZAS_SHOULD_USE_ACCESS_CONTROL_FOR_BUSINESS_SENSITIVE" type="SHOULD" toolTip="Access to business sensitive resources SHOULD use some form of access control." wrapper='span'>
  - **Business sensitive** - these resources contain data that may be business-sensitive information, that is not identifiable to individuals. Access to these resources **SHOULD** use some form of access control.
</ApiStandard>
  - **Anonymous READ resources** - these resources are typically intended to be public, such as a FHIR server's `CapabilityStatement` or `ImplementationGuide`.

When exposing FHIR resources, care must be taken to identify which level of resource sensitivity a resource falls into and ensure that appropriate access control mechanisms are in place.

For further reading, visit [FHIR Security.](https://build.fhir.org/security.html)
