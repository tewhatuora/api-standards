<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/tewhatuora/api-standards">
    <img src="./static/img/two-logo.png" alt="Health NZ logo">
  </a>

  <h3 align="center">Health New Zealand | Te Whatu Ora API Development and Security Standards</h3>

  <p align="center">
    This GitHub project is the source repository for the Health NZ API Development and Security Standards project, which are officially published at <a href="https://apistandards.digital.health.nz">https://apistandards.digital.health.nz</a>
    <br />
    <br />
    <a href="https://dhzf2wyhwgplf.cloudfront.net/">View standards website</a>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Refer to the [CONTRIBUTING](./CONTRIBUTING.md) file for information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Refer to the [LICENSE](./LICENSE.md) file for information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
