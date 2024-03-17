---
title: "Data Consistency Models"
---

Data consistency in Asynchronous APIs refers to the quality of the data being uniform, accurate, and coherent across API Producers and Consumers within the sector.

Various consistency levels exist, some of which may or may not be appropriate depending on the data being shared, or the use cases in which the data is being used for. For the Health sector in particular, considering the use case for the data is important.

For example, consider the below:

:::info[Scenario]
A patient in critical care is in pain, and they have being administered with 5mg of Morphine intravenously by one of the multiple nurses on shift.
:::

At the point of care, in realtime, this data consistency should be considered [strong consistency](#strong-consistency), as nurses caring for the patient **must** have this information to avoid providing too many doses. However, if this event is being used in three months time to assess what painkillers are most effective, it would suffice to have the data maintain [eventual consistency](#eventual-consistency).

## Eventual consistency

Eventual consistency is a model that guarantees that updates will propagate through all integrated systems and become consistent with each other, given enough time. This model isn't suited to systems or data that require strict data consistency. An example of where this data consistency model may not be appropriate would be data that requires precise timing, such as a patient receiving critical care's vital signs. Data and events where this model may be appropriate(dependent on the use case are) are:

- a Patient's preferred name was updated
- a Patient was born
- a GP's practicing certificate was renewed

## Strong consistency

Strong consistency aims to provide a higher level of consistency. Strong consistency ensure that all API Consumers maintain an accurate copy of the data without any temporary inconsistency. Data and events where this model may be appropriate(dependent on the use case are) are:

- a Patient was provided 5mg of Morphine intravenously
- a Patient had an adverse reaction
