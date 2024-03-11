---
title: "Messaging Concepts"
---

There are a number of terminologies used in the Async and Event driven architecture space which may have a different meaning in other contexts. This page is a glossary of terms used throughout this section.

| Concept | Description |
|---|---|
| Message | A packet of data that is transmitted over a channel, containing data such as an event |
| Event | A message containing information about something that has occurred, such as an immunization being administered, or an patient updating their address |
| Unbounded event | An event containing unbounded data, that is, data that is continuous, such as a heart rate reading sent from an IoT device |
| Discrete event | An event containing discrete data - facts that have happened, such as an immunization being administered |
| Message broker | Software which allows API Consumers and Provider to communicate. The message broker is responsible for distributing messages to the correct channels(routing), applying authorization, managing subscriptions and applying transformations |
| Topic | A destination where messages are published to by an API Provider |
| Event schema | A specification defining the data structure contained in a message |
| Subscription | A unique relation to a topic by a subscriber that indicates it should receive updates for that topic |
| Subscriber | The API Consumer |
