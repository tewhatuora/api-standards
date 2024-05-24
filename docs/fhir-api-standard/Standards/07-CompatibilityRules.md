---
title: "Compatibility rules"
---

## Compatibility rules for NZ published FHIR APIs



:::info
All serious designers/developers of APIs need to recognise the substantial time and effort other parties may invest to develop an application that consumes their API -- this consideration applies equally to RESTful FHIR APIs.

It is reasonable that parties who develop applications consuming a FHIR API shall expect to be able to depend on the continuing functioning of that API without breakage, erosion of functionality or loss of data quality (to the extent that the API controls data quality).
:::

### Requirements

Designers / developers proposing **breaking change**[^1] to an *existing, published FHIR API* **MUST** adhere to the following compatibility rules for Health NZ public APIs:

- <ApiStandard id="HNZAS_MUST_ENSURE_APPLICATION_DEPENDENCY" type="MUST" toolTip="Ensure that all applications using the existing published API version can continue to depend on it without change for at least three years from the introduction of the new API version."><b>MUST</b> ensure that all applications using the existing published API version can continue to depend on it without change for a period of at least three years from introduction of the new API version</ApiStandard>
- <ApiStandard id="HNZAS_MUST_ENSURE_FEEDBACK_OPPORTUNITY" type="MUST" toolTip="Ensure all affected API-consuming parties are given the opportunity to provide feedback on proposed changes."><b>MUST</b> ensure all affected API-consuming parties are given opportunity to provide feedback on the proposed changes</ApiStandard>
- <ApiStandard id="HNZAS_MUST_PROVIDE_WITHDRAWAL_WARNINGS" type="MUST" toolTip="API Provider must ensure all applications already consuming the existing API receive warnings for at least one year before that API version is withdrawn from support."><b>MUST</b> ensure all applications already consuming the existing API receive warnings for a minimum period of one year before that API version is withdrawn from support and no longer usable.</ApiStandard>

---

[^1]: For a crisp and useful definition see this [breakdown of breaking change](https://docs.github.com/en/rest/overview/breaking-changes?apiVersion=2022-11-28#about-breaking-changes-in-the-rest-api) as published by GitHub.
