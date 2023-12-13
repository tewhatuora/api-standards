---
title: "Compatibility rules"
---

## Compatibility rules for NZ published FHIR APIs

:::tip[Status]
Ready for review
:::

:::info
All serious designers/developers of APIs need to recognise the substantial time and effort other parties may invest to develop an application that consumes their API -- this consideration applies equally to RESTful FHIR APIs.

It is reasonable that parties who develop applications consuming a FHIR API shall expect to be able to depend on the continuing functioning of that API without breakage, erosion of functionality or loss of data quality (to the extent that the API controls data quality).
:::

### Requirements

Designers / developers proposing **breaking change**[^1] to an *existing, published FHIR API* **MUST** adhere to the following compatibility rules for Te Whatu Ora public APIs:

- Ensure that all applications using the existing published API version can continue to depend on it without change for a **period of at least three years from introduction of the new API version**, and  
- Ensure all affected API-consuming parties are given opportunity to provide feedback on the proposed changes, and  
- All applications already consuming the existing API **MUST** receive warnings for a minimum period of **one year** before that API version is withdrawn from support and no longer usable.  

---

[^1]: For a crisp and useful definition see this [breakdown of breaking change](https://docs.github.com/en/rest/overview/breaking-changes?apiVersion=2022-11-28#about-breaking-changes-in-the-rest-api) as published by GitHub.
