---
title: FHIR Security
---
:::warning[Status]
Content is draft and in review – this content may change until review is complete and formally published.
:::

:::info
This page should be reviewed alongside the [Part D: FHIR API Design and Development Standards](../fhir-api-standard/index.md)
:::

The FHIR specification itself is not a security protocol nor does it define any security related functionality - it suggests the use of a security sub-system such as an API Gateway that performs user authentication and authorization, which is the guidance of this section of the standards.

There are a few items in the FHIR specification related to security which should be used where appropriate which are detailed below.

## FHIR Security Labels

Security Labels are part of the `meta.security` element of every FHIR resource, and in other elements of certain resources such as `Consent.provision.securityLabel`. They are tags that provide specific security metadata about the information in the resource that it is attached to. The intent of a security label is that the recipient of resources or bundles with security-tags is obligated to enforce the handling caveats of the tags and carry the security labels forward as appropriate.

FHIR Security labels **SHOULD** be used as a means to convey information on a resource's confidentiality requirements if they differ from other information that is present in the FHIR Server or what has been defined in an Implementation Guide.

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

There are a number of FHIR Core security tags available within the [FHIR defined ValueSet](https://hl7.org/fhir/R4/valueset-security-labels.html), however API Providers **MAY** define their own by creating custom ValueSets and CodeSystems. All conformant FHIR API Providers **SHOULD** use these security labels where appropriate, and clients **MUST** respect them.

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

FHIR provides an [AuditEvent](https://build.fhir.org/auditevent.html) resource suitable for use by FHIR API Providers to record when a security or privacy relevant event has occurred. This form of audit logging as a FHIR resource allows other correctly authorized systems to access audit events such as audit reporting or alerting systems.

## Access control considerations

A REST API conforming to FHIR will likely support much more than standard CRUD operations. FHIR Search offers a rich interface which supports consumers to retrieve related resources using search parameters `_include` and `_revinclude`. It is important that the security model used considers whether the client has permission to access the resource being searched on, in addition to all of the possible included resources.

## Resource sensitivity

Typically, the resources defined in FHIR can fall into four sensitivity buckets:

- Patient sensitive - these resources make up the bulk of FHIR and contain highly sensitive health information such as a `Condition`. Access to these resources **MUST** use some form of access control mechanism and consent
- Individual sensitive - these resources do not contain patient data but contain data about an individual such as a `RelatedPerson` or `Practitioner`. Access to these resources **MUST** use some form of access control
- Business sensitive - these resources contain data that may be business sensitive information, that is not identifiable to individuals. Access to these resources **SHOULD** use some form of access control
- Anonymous READ resources - these resources are typically intended to be public, such as a FHIR server's `CapabilityStatement` or `ImplementationGuide`.

When exposing FHIR resources, care must be taken to identify which level of resource sensitivity a resource falls into and ensure that appropriate access control mechanisms are in place.

For further reading, visit [FHIR Security.](https://build.fhir.org/security.html)
