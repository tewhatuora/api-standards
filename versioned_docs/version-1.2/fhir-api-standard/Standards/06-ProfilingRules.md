---
title: "Resource profiling"
---

## Rules for resource profiling



### Requirements

1. <ApiStandard id="HNZAS_MUST_USE_RESOURCES_FOR_INTENDED_PURPOSES" type="MUST" toolTip="FHIR APIs must use FHIR resources and elements for their HL7-intended purposes.">FHIR APIs <b>MUST</b> use FHIR resources and elements for their HL7-intended purposes</ApiStandard>

1. <ApiStandard id="HNZAS_MUST_NOT_EXTEND_PRIMITIVE_DATA_TYPES" type="MUST NOT" toolTip="FHIR APIs must not extend FHIR's primitive data types.">FHIR APIs <b>MUST NOT</b> extend FHIR's primitive data types</ApiStandard>

1. <ApiStandard id="HNZAS_SHOULD_DEFINE_EXTENSION_FOR_TERMINOLOGY" type="SHOULD" toolTip="When a required terminology binding needs expanding, a FHIR API should define an Extension for this purpose.">When a required terminology binding needs expanding, a FHIR API <b>SHOULD</b> [define an Extension](https://www.hl7.org/fhir/r4b/defining-extensions.html) for this purpose. (APIs <b>MUST NOT</b> use other mechanisms to extend terminology bindings).</ApiStandard>

1. <ApiStandard id="HNZAS_MUST_USE_NZ_STANDARD_IDENTIFIERS" type="MUST" toolTip="Identifiers in FHIR APIs must be NZ standard identifiers where applicable, identified via the 'system' attribute.">[Identifiers](https://www.hl7.org/fhir/datatypes.html#Identifier) in FHIR APIs <b>MUST</b> be NZ standard identifiers where applicable. An Identifier in FHIR APIs can, via its system attribute, identify the applicable NZ identifier namespace by Uri. [List of NZ identifier namespace Uris](https://standards.digital.health.nz)</ApiStandard>

:::warning
A FHIR API that uses any of the following tricks will be viewed as violating this standard.
:::

1. Defines new primitive data types,
2. Misuses FHIR resource references for linkage other than what HL7 intended,
3. Evades FHIR design work or payload schema validation by 'shoehorning' or encoding data in places where it cannot be validated nor recognised by API consumers.  This means not just schoolboy tricks like encoding data in `Annotation` or `text` elements but also more sneaky attempts to hide business data in `contained` instances or instance *metadata*,
4. Introduces resource profiles that *cross* several base FHIR resources (mongrel).
