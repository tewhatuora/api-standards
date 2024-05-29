# ApiStandard Component Usage Guide

The `ApiStandard` component is designed to provide a consistent way to document API standards in a clear and structured manner.

## Basic Usage

### Example

```jsx
<ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="All communications to or from an API MUST use TLS 1.3 or higher." wrapper="li">All communications to or from an API **MUST** use TLS 1.3 or higher.</ApiStandard>
```

## Component Attributes

- `id`: A unique identifier for the rule. It follows the pattern `HNZAS_<RULE_TYPE>_<SHORT_DESCRIPTION>`.
- `type`: The type of rule, such as MUST, SHOULD, MAY, SHOULD_NOT, MUST_NOT.
- `toolTip`: A brief description that appears as a tooltip when hovering over the rule.
- `wrapper`: The HTML tag used to wrap the text, commonly `li` for list items or `span` for inline text.
-

## Trends and Common Patterns

### Single Line Rules

When documenting simple rules, wrap the rule text in an `ApiStandard` component:

```jsx
<ApiStandard id="HNZAS_SHOULD_HAVE_HOME_PAGE" type="SHOULD" toolTip="A FHIR IG should have a home page with a clear high level description of the implementation." wrapper="li">A FHIR IG **SHOULD** have a home page with a clear high level description of the implementation.</ApiStandard>
```

### Multiple Sentences

For more complex rules that span multiple sentences, ensure each sentence is clear and the entire rule is wrapped:

```jsx
<ApiStandard id="HNZAS_MUST_PUBLISH_CAPABILITY_STATEMENT" type="MUST" toolTip="FHIR APIs MUST publish a CapabilityStatement resource at the {{API_URL}}/metadata endpoint." wrapper="li">FHIR APIs **MUST** publish a **CapabilityStatement** resource at the `{{API_URL}}/metadata` endpoint.</ApiStandard>
```

### Lists of Requirements

When listing multiple requirements, each item should be wrapped individually:

```jsx
<ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="All communications to or from an API MUST use TLS 1.3 or higher." wrapper="li">All communications to or from an API **MUST** use TLS 1.3 or higher.</ApiStandard>
<ApiStandard id="HNZAS_MUST_ENCRYPT_TOKENS" type="MUST" toolTip="Tokens MUST be encrypted." wrapper="li">Tokens **MUST** be encrypted.</ApiStandard>
```
