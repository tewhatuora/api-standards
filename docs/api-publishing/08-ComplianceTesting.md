---
title: Compliance Testing
---

## What is Compliance Testing 

Compliance testing is a software testing that checks whether an API Consumer's system, product, or software application, adheres to specified standards, protocols, or regulations. Compliance testing helps to validate that an API Consumer application aligns with a predetermined set of rules and guidelines imposed by API Provider, enhancing overall quality, eligibility, reliability, and interoperability. 

## Purpose 

The goal of compliance testing is to ensure that the API consumer application meets the compliance requirements, technical specifications, and legal regulations imposed by API Provider. 

### Key Benefits of Compliance Testing: 

**API Provider and API Consumer confidence**: Demonstrates that API consumption meets compliance requirements, which can help build confidence with API Providers, API Consumers and stakeholders.

**Legal and regulatory adherence**: Ensures that the product or system complies with laws and regulations to avoid legal penalties. 

**Risk mitigation**: Identifies risks and vulnerabilities early in the development process, minimising the chances of security breaches, data leaks, privacy violations, or regulatory issues. 

**Improved quality**: Enhances the overall services quality, security, and performance; improves data quality and data integrity by embedding the quality requirements into design and assurance process.

## Key Considerations of Compliance Testing
API Providers should take the following key considerations into account when designing the compliance test:

- Align Compliance Testing to business use cases. This will help API consumers complete the compliance tests relevant to them

- Provide clear instructions for executing tests and success criteria. [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/)) provides a useful framework for structuring tests

- Provide information of mandatory tests and conditions (e.g. a test is only required to complete if API Consumer has permission to view a patient's contact details)

- Provide example or test data where feasible 

- Address the **SPICE** concerns:
    - **S**ecurity - For example,

        >Given the user is authenticated
        >
        >And the user does not have permission to view sensitive information
        >
        >When the user attempts to access the sensitive information
        > Then the sensitive information should not be displayed to the user
    - **P**rivacy - For example,
        >Given the [AsyncAPI Consumer](./04-AsyncAPI.md) receives an event of a patient death
        >
        >When the patient is not relevant to the Consumer system
        >
        >Then any information of the event should be discarded and not persisted or logged
    - **I**dentity - For example,
        >Given the API returns information
        >
        >And API consumer display the information in their user application
        >
        >And a user is not authenticated
        >
        >When the user tries to access the application
        >
        >Then the user is redirected to be authenticated with MFA before access is permitted
    - **C**linical Safety - For example,
        >Given the API returns the Patient immunisation information
        >
        >And regardless the viewing user's screen resolution 
        >
        >When the user views the data containing this immunisation information 
        >
        >Then the user is aware whether full information is viewed or there is undisplayed content
    - **E**quity - For example, 
        >Given the API returns data with macrons
        >
        >When the user views the data containing macrons
        >
        >Then the macron characters should render properly across all supported devices and platforms

- Tests should reflect real life scenarios including edge cases (e.g. long names of patients) and data quality issues (e.g. non-compliant historical data or missing information.

- Provide a mechanism to automate testing where possible

- Tests can be extended with additional tests with incremental development 

- Tests are reliable, repeatable, and traceable

- Edge cases are considered (e.g. long names of patients, medicines, etc.) 

- Remediation path is provided for test failure  

- Recertification process is defined for periodic compliance testing and change of compliance status 

- Provide examples and environment to demonstrate compliance (e.g. a compliance demo)

- Provide test report or summary template  

- Consider alternative or innovative tools to ease the compliance testing process, e.g. recorded demo, automation, report generation, etc. 

## Compliance testing process 

API Provider **MUST** provide compliant testing process definition. Diagrams **SHOULD** be used that describe an API Consumer compliance testing journey. 
 
The process of compliance testing involves several steps to verify that the system meets the required standards. Below is an overview of a typical compliance testing process:
```plantuml alt="Flowchart illustrating the compliance testing process between an API Provider and API Consumer. It begins with the API Consumer identifying test requirements and guidelines, followed by a request for compliance testing. Test planning occurs with the API Provider preparing the test environment, while the API Consumer prepares the tests. The API Consumer then executes the tests and records the outcomes. Results are evaluated, and if necessary, remediation is performed. The cycle repeats until compliance is certified. Once certified, compliance monitoring is conducted by the API Provider and continues while ongoing."
@startuml

|#pink|p|API Provider
|#antiquewhite|c|API Consumer
|c|
start
repeat:identify test requirements and guidelines;
:Request compliance test;
repeat:Test planning;
fork
    |p|
    :Prepare test environment;
fork again
    |c|
    :Prepare tests;
end fork
|c|
:Execute tests;
:Record test outcomes;
:Evaluate test results;
backward: Remediation;
|p|
repeat while (Compliance certified) is (no);
->yes;
|c|
backward: Compliance monitoring;
|p|
repeat while (On going) is (yes);
->no;
stop
@enduml
```

## Examples 
- Get Match And Validate Patient Compliance Testing
    > https://nhi-ig.hip.digital.health.nz/GetMatchAndValidatePatientComplianceTesting.html
