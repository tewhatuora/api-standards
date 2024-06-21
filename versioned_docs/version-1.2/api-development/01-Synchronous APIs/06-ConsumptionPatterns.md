---
title: API Consumption Patterns
---



:::info
The patterns documented on this page reflect a small number of patterns implemented by Health NZ. The expectation is that this page will grow as more standards contributors get involved.
:::

## Direct

The API Service is hosted and published by and from the primary environment in which the Digital Services Hub capability is implemented.

```plantuml alt="PlantUML diagram describing the direct consumption pattern"

skinparam {
    defaultFontColor #4080a9
    defaultBackgroundColor #d7f8ff
    defaultComponentColour #61d9de
    defaultActorColour #61d9de
    defaultFontSize 16
    defaultArrowThickness 6
    actorStyle awesome
    linetype polyline
}

actor "Health Sector Participant" as EC #Green
rectangle "Health NZ" #fdfff6{
    component "API Gateway"  as AG
    component "API Management" as AM
    component "Developer Portal" as DP
    component "API Service Implementation" as ASI
    actor "Health NZ\n   Operations" as HNZO #Blue
    actor "Health NZ\nAPI Developer" AS HNZD #Blue
}

EC .[#green,dashed,thickness=8].> AG
EC -[#blue,dashed,thickness=8]-> DP
AG .[#green,dashed,thickness=8].> ASI
HNZO -[#LightBlue,dashed,thickness=8]-> AM
HNZD -[#LightBlue,dashed,thickness=8]-> ASI

legend left
{{
  scale 0.75

  card "Flow Descriptions" {
    together {
      (a) -[#green,dashed,thickness=8]right-> (b)  : API Interaction
      (c) -[#blue,dashed,thickness=8]right-> (d) : Web (UI) Interaction
      (e) -[#LightBlue,dashed,thickness=8]right-> (f) : Management Interaction
    }
}}
Legend
end legend
```

<DetailedDescription text="The diagram illustrates direct consumption pattern. The Health Sector Participant interacts with the API Gateway to initiate API interactions. The Health NZ Operations team manages the API Management and Developer Portal components. The API Gateway communicates with the API Service Implementation component to process API requests. The Health NZ API Developer interacts with the Developer Portal to access API documentation and tools." />

## Proxy

Publishes an API Service hosted and published by an External Sector Partner, using API Management owned and managed by them. The Digital Services Hub API Management capability republishes the API Service and routes (proxies) incoming traffic to the provider service through the Digital Services Hub governance capability.

```plantuml alt="PlantUML diagram describing the proxy consumption pattern"

skinparam {
    defaultFontColor #4080a9
    defaultBackgroundColor #d7f8ff
    defaultComponentColour #61d9de
    defaultActorColour #61d9de
    defaultFontSize 16
    defaultArrowThickness 6
    actorStyle awesome
    linetype polyline
}

actor "Health Sector Participant" as EC #Green
rectangle "Health NZ" #fdfff6{
    component "API Gateway"  as AG
    component "API Management" as AM
    component "Developer Portal" as DP
    actor " Health NZ\nOperations" as HNZO #Blue
    'actor "Health NZ\nDeveloper" AS HNZD #Blue
}

rectangle "Sector Partner" {
  component "API Gateway"  as SAG
  component "API Service Implementation" as ASI
  'component "API Management" as SAM
  'component "Developer Portal" as SDP
  actor "     Sector Partner\nApplication Developer" as SPD
  'actor "Sector Partner\nOperations" as SPO
}

EC .[#green,dashed,thickness=8].> AG
EC -[#blue,dashed,thickness=8]-> DP
AG .[#green,dashed,thickness=8].> SAG
SAG .[#green,dashed,thickness=8].> ASI
AM .[#LightBlue,dashed,thickness=8].> SAG
HNZO .[#LightBlue,dashed,thickness=8].> AM
SPD .[#LightBlue,dashed,thickness=8].> ASI

legend left
{{
  scale 0.75

  card "Flow Descriptions" {
    together {
      (a) -[#green,dashed,thickness=8]right-> (b)  : API Interaction
      (c) -[#blue,dashed,thickness=8]right-> (d) : Web (UI) Interaction
      (e) -[#LightBlue,dashed,thickness=8]right-> (f) : Management Interaction
    }
}}
Legend
end legend

```

<DetailedDescription text="The diagram depicts the proxy consumption pattern, where a health sector participant, such as a hospital or clinic, connects to Health NZ's API Gateway to access healthcare services. Health NZ's API Management component manages the APIs and Developer Portal, which provides documentation and support for developers. Health NZ Operations and developers can also access the API Gateway directly. Sector partners, such as private healthcare providers, connect to their own API Gateways, which in turn connect to their API Service Implementations. Sector partner application developers can access their own API Gateways, and sector partner operations staff can access their API Service Implementations. The diagram also shows the flow of data between the different components and actors. For example, the Health Sector Participant sends API requests to Health NZ's API Gateway, which then routes the requests to the appropriate API Service Implementations. Health NZ's API Management component monitors and manages the API traffic, and the Developer Portal provides documentation and support for developers." />
