<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/tewhatuora/api-standards">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./static/img/two-dark-theme-logo.svg">
      <img alt="Health New Zealand Te Whatu Ora Logo" src="./static/img/two.svg" width="50%">
    </picture>
  </a>

  <h3 align="center">Health New Zealand | Te Whatu Ora API Development and Security Standards</h3>

  <p align="center">
    This GitHub project is the source repository for the Health NZ API Development and Security Standards project, which are officially published at <a href="https://apistandards.digital.health.nz">https://apistandards.digital.health.nz</a>.
    <br />
    <br />
    <a href="https://apistandards.digital.health.nz">View standards website</a>
    ·
    <a href="https://github.com/tewhatuora/api-standards/issues">Submit feedback</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->

## Getting Started

### Content editing

To edit the API Standards content, edits can be made to the Markdown files in the `docs` folder of the project. To edit these files, any text editor can be used, or the GitHub user interface. This step is all that is required to make changes to the standards content.

### Running the Standards website in development

_Note that these steps are only required to run the website locally, and are not strictly required to modify content of the Standards._
To modify the website itself in a local development environment, for

#### Installation

1. Install the [Node.js runtime.](https://nodejs.org/en/download)
2. Clone the repo

   ```sh
   git clone https://github.com/tewhatuora/api-standards.git
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Start the website in development

   ```sh
   npm start
   ```

#### Spell check and formatting

There is are npm scripts that will check the spelling and formatting of changes to the docs.

Run markdown linting:

```
npm run markdownlint
```

Run a spell check:

```
npm run spellcheck
```

Any words that do not appear in the default dictionaries can be added to the [projects dictionaries defined here.](/dictionaries)

Any issues with the [markdown linting](https://github.com/DavidAnson/markdownlint) can be overridden across the project in the [configuration file .markdownlint.jsonc](.markdownlint.jsonc) or overridden per file by adding the following comment to the file.

```html
<!-- markdownlint-disable MD024 MD036 MD040 MD041 MD051 -->
```

## Standards authoring

There is an <ApiStandard> component which is used to auto-generate tooltips and a master checklist of all standards. On build, a script (/scripts/extractStandards.js) runs which parses these components and generates the master checklist and tooltips.

## Basic Usage

To wrap a piece of text in an `ApiStandard` component, use the following structure:

```jsx

<ApiStandard id="UNIQUE_ID" type="RULE_TYPE" toolTip="Description of the rule." wrapper="li">

  Your text here

</ApiStandard>

```

### Example

```jsx

<ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="All communications to or from an API MUST use TLS 1.3 or higher." wrapper="li">

  All communications to or from an API **MUST** use TLS 1.3 or higher.

</ApiStandard>

```

## Component Attributes

- `id`: A unique identifier for the rule. It follows the pattern `HNZAS_<RULE_TYPE>_<SHORT_DESCRIPTION>`.

- `type`: The type of rule, such as MUST, SHOULD, MAY, SHOULD_NOT, MUST_NOT.

- `toolTip`: A brief description that appears as a tooltip when hovering over the rule.

- `wrapper`: The HTML tag used to wrap the text, commonly `li` for list items or `span` for inline text.

- `dupe`: A boolean attribute that indicates if the rule is a duplicate of another rule. This is used to prevent the rule from being included twice in the master checklist.

## Trends and Common Patterns

### Single Line Rules

When documenting simple rules, wrap the rule text in an `ApiStandard` component:

```jsx

<ApiStandard id="HNZAS_SHOULD_HAVE_HOME_PAGE" type="SHOULD" toolTip="A FHIR IG should have a home page with a clear high level description of the implementation." wrapper="li">

  A FHIR IG **SHOULD** have a home page: "A clear high level description of the implementation"

</ApiStandard>

```

### Multiple Sentences

For more complex rules that span multiple sentences, ensure each sentence is clear and the entire rule is wrapped:

```jsx

<ApiStandard id="HNZAS_MUST_PUBLISH_CAPABILITY_STATEMENT" type="MUST" toolTip="FHIR APIs MUST publish a CapabilityStatement resource at the {{API_URL}}/metadata endpoint." wrapper="li">

  FHIR APIs **MUST** publish a **CapabilityStatement** resource at the `{{API_URL}}/metadata` endpoint.

</ApiStandard>

```

### Lists of Requirements

When listing multiple requirements, each item should be wrapped individually:

```jsx

<ApiStandard id="HNZAS_MUST_USE_TLS" type="MUST" toolTip="All communications to or from an API MUST use TLS 1.3 or higher." wrapper="li">

  All communications to or from an API **MUST** use TLS 1.3 or higher.

</ApiStandard>

<ApiStandard id="HNZAS_MUST_ENCRYPT_TOKENS" type="MUST" toolTip="Tokens MUST be encrypted." wrapper="li">

  Tokens **MUST** be encrypted.

</ApiStandard>

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Refer to the [CONTRIBUTING](./CONTRIBUTING.md) file for information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Refer to the [LICENSE](./LICENSE.md) file for information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
