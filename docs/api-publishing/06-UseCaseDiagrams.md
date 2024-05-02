---
title: Use Case Diagrams
---

Effective use case diagrams document the complex behaviour of an API in an easily human readable manner. In this type of diagram, the technical components of the applications and parties involved in the APIs execution are displayed as actors so the reader can focus on the overall flow of the API and interactions between the actors.

When creating use case diagrams, consider the following to ensure the diagram effectively describes the use case/s of the API:

- **Actors** - identify the actors involved in the use case, which can include people, systems, businesses
- **Relationships** - identify the relationships between the actors in the use cases
- **Purpose** - clarify the purpose and role of each actor

### Example

The below defines an example use case for the Aotearoa Immunisation Register API. This helps sector developers to understand the overall use case of the API.

| Actors | Relationships | Purpose |
|--------|---------------|---------|
| John Smith | The Health Sector Patient | The Patient interacts with the health system to receive an annual flu Immunisation |
| Dr Johnston | John Smith's General Practitioner | Administers Immunisations to John, the Patient |
| HappyHealth PMS | The Practice Management System used by Dr Johnston | Sends Immunisation updates to the National register |
| Aotearoa Immunisation Register | Interface to access Immunisation records | The national Immunisation API |

```plantuml alt="Example Use Case Diagram demonstrating a use case of a patient receiving an Immunisation which is sent to the Immunisation Register"
@startuml
title Aotearoa Immunisation Register Use Case Diagram
skinparam actorStyle awesome
hide footbox
actor Patient
actor Doctor
participant "HappyHealth PMS" as PMS
participant "Aotearoa Immunisation API" as API

Patient --> Doctor: Request Immunisation
Doctor --> Patient: Administer Immunisation
Doctor --> PMS: Enter Immunisation into PMS
PMS --> API: Send Immunisation Data\n **POST /Immunization**
@enduml
```

The below is an example of a use case diagram which can be improved using the above tips. The below diagram depicts an "API Consumer" interacting with an API, however, it does not offer information as to the use case it is trying to achieve.

```plantuml alt="Example Use Case Diagram showing an API Consumer posting an immunisation to Aotearoa Immunisation Register API"
@startuml
title Aotearoa Immunisation Register Use Case Diagram
skinparam actorStyle awesome
hide footbox
participant "API Consumer" as apic
participant "Aotearoa Immunisation Register API" as api

apic --> api: POST /Immunization
@enduml
```