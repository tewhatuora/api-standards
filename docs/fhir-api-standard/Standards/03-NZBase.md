---
title: "Use NZ Base"
---

## Use NZ Base IG resource profiles and definitions

:::warning[Status]
Content is draft and in review – this content may change until review is complete and formally published.
:::

:::info
The [**New Zealand Base Implementation Guide**](https://fhir.org.nz/ig/base/index.html), or 'NZ Base', contains common extensions that most NZ FHIR implementations will need, along with any terminology artifacts referenced by them (ie coded elements).

As of this standard, NZ Base v2.0.0 includes:

- [NZ-specific resource profiles](https://fhir.org.nz/ig/base/profiles.html) which feature support for patient ethnicity, practitioner NZ registration and NZ-standard coding of medications,
- [NZ-specific terminology](https://fhir.org.nz/ig/base/terminology.html) - various coding systems standard in New Zealand,
- [identifiers](https://fhir.org.nz/ig/base/namingSystems.html) - identifiers and naming systems which are world-famous in New Zealand.

As well getting better interoperability with other NZ health applications, FHIR API designers and developers also benefit by leveraging definitional work done in NZ Base, avoiding a substantial amount of FHIR API spec and IG work in the deriving FHIR API.
:::

### Requirements

1. FHIR APIs **MUST** use *NZ Base* resource profiles and definitions.

FHIR APIs **MUST** derive profiles from the [New Zealand Base Implementation Guide](https://fhir.org.nz/ig/base/index.html) and make good use of NZ Base extensions or definitions where available:

- [NzPatient](https://fhir.org.nz/ig/base/StructureDefinition-NzPatient.html) profile of FHIR `Patient`
- [NzCondition](https://fhir.org.nz/ig/base/StructureDefinition-NzCondition.html) profile of FHIR `Condition`
- [NzLocation](https://fhir.org.nz/ig/base/StructureDefinition-NzLocation.html) profile of FHIR `Location`
- [NzOrganization](https://fhir.org.nz/ig/base/StructureDefinition-NzOrganization.html) profile of FHIR `Organization`
- etc.

#### Examples

The following examples taken from the *rheumatic fever* support in the Health NZ Shared Care FHIR API demonstrate how a FHIR API can build on NZ Base definitions:

- Profile of [NzCondition](https://build.fhir.org/ig/tewhatuora/cinc-fhir-ig/StructureDefinition-nz-sharedcare-rheumaticfever-condition.html) -- lets a FHIR `Condition` support special extra RF diagnostic attributes.
- Profile of [NzMedicationRequest](https://build.fhir.org/ig/tewhatuora/cinc-fhir-ig/StructureDefinition-nz-sharedcare-rheumaticfever-medicationrequest.html) -- extends a `FHIR MedicationRequest` with an extension to capture frequency of medication appointments.
- Profile of [NzPatient](https://build.fhir.org/ig/tewhatuora/cinc-fhir-ig/StructureDefinition-nz-sharedcare-rheumaticfever-patient.html) -- derives NzPatient to also capture patient attributes needed for management of rheumatic fever in NZ.

#### How to derive from NZ Base in SUSHI/FSH Implementation Guide publishing

API designers using SUSHI/FSH to generate their IG can derive from NZ Base definitions by two simple steps:

- In `sushi-config.yaml` add a dependency to `fhir.org.nz.ig.base: 2.0.0`,
- In FHIR Shorthand (FSH) for the derived resource profile, simply set the parent type to the NZ base resource name, eg. for a patient.

```yaml
Profile: RheumaticFeverPatient
Parent: NzPatient
Title: "Rheumatic Fever Patient"
Description: "NzPatient-based FHIR resource for representing rheumatic fever patients"
```

### Antipattern

:::warning
A FHIR API that does any of the following will be viewed as violating this standard.
:::

1. Re-profiling a FHIR base resource, ignoring an NZ Base profile previously published (duplication),
1. Extending a resource profile of an NZ Base resource and then profiling out NZ base elements/operations (dilution).
