// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
module.exports = async function createConfig() {
  const { remarkKroki } = await import('remark-kroki');
  return {
    title: 'Health New Zealand | Te Whatu Ora API Standards',
    favicon: 'img/favicon-32x32.png',

    // Set the production url of your site here
    url: 'https://apistandards.digital.health.nz',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'tewhatuora', // Usually your GitHub org/user name.
    projectName: 'api-standards', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en-nz',
      locales: ['en-nz'],
    },
    presets: [
      [
        'redocusaurus',
        {
          specs: [
            {
              spec: 'docs/api-development/api-specifications/example-agency-spec.yaml',
              route: '/api-specifications/example-agency-specification',
            },
            {
              spec: 'docs/api-development/api-specifications/example-agency-spec.yaml',
              route: 'draft/api-specifications/example-agency-specification',
            },
            {
              spec: 'docs/api-development/api-specifications/example-Observation-spec.yaml',
              route: '/api-specifications/example-fhir-specification',
            },
            {
              spec: 'docs/api-development/api-specifications/example-Observation-spec.yaml',
              route: 'draft/api-specifications/example-fhir-specification',
            }
          ],
          theme: {
            primaryColor: '#1890ff',
          },
        },
      ],
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            routeBasePath: '/',
            sidebarPath: require.resolve('./sidebars.js'),
            remarkPlugins: [
              [
                remarkKroki,
                {
                  alias: ['plantuml'],
                  server: 'https://kroki.io',
                }
              ]
            ],
            versions: {
              current: {
                label: 'Draft',
                path: 'draft',
              },
            },
          },
          theme: {
            customCss: [require.resolve('./src/css/custom.css'), require.resolve('@asyncapi/react-component/styles/default.min.css')],
          },
          gtag: {
            trackingID: 'G-KPWKEMHLL1',
            anonymizeIP: true,
          },
        }),
      ],
    ],
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        colorMode: {
          defaultMode: 'light',
          disableSwitch: true,
          respectPrefersColorScheme: true,
        },
        navbar: {
          title: 'API Standards',
          hideOnScroll: false,
          logo: {
            alt: 'Health New Zealand | Te Whatu Ora logo',
            src: 'img/two.svg',
            srcDark: 'img/two-dark-theme-logo.svg',
          },
          items: [
            {
              type: 'docsVersionDropdown',
              position: 'right',
            },
            {
              href: 'https://github.com/tewhatuora/api-standards/issues',
              label: 'Raise issue',
              position: 'right',
              target: '_blank',
              style: {'fontSize': '0.9125rem'}
            }
          ]
        },
        footer: {
          links: [
            {
              title: 'About',
              items: [
                {
                  label: 'Accessibility',
                  href: 'https://www.tewhatuora.govt.nz/about-our-site/accessibility/',
                },
                {
                  label: 'Privacy & security',
                  href: 'https://www.tewhatuora.govt.nz/about-our-site/privacy-and-security/',
                },
                {
                  label: 'Contact',
                  href: '/contact',
                },
                {
                  label: 'Terms of use',
                  href: '/terms-of-use',
                },
                {
                  label: 'Legal and copyright',
                  href: 'https://www.tewhatuora.govt.nz/about-our-site/legal-and-copyright/',
                },
                {
                  html: `
                      </br>
                      <a href="https://www.govt.nz" target="_blank" rel="noreferrer noopener" aria-label="Hiso">
                        <img src="/img/govt-nz.png" alt="Te Kāwanatanga o Aotearoa — New Zealand Government" style="float:left;width:7.5rem;height:auto;" />
                      </a>
                    `,
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Raise issue',
                  href: 'https://github.com/tewhatuora/api-standards/issues',
                },
                {
                  label: 'Digital Services Hub',
                  href: 'https://www.tewhatuora.govt.nz/health-services-and-programmes/digital-health/digital-services-hub',
                },
                {
                  label: 'Health New Zealand | Te Whatu Ora',
                  href: 'https://www.tewhatuora.govt.nz',
                },
                {
                  label: 'Contributors',
                  href: '/contributors'
                },
                {
                  html: `
                      </br>
                      </br>
                      <a href="https://www.tewhatuora.govt.nz/health-services-and-programmes/digital-health/data-and-digital-standards/approved-standards/api-standards/" target="_blank" rel="noreferrer noopener" aria-label="Hiso">
                        <img src="/img/hiso-logo.png" alt="Hiso" style="width:300px;height:auto;" />
                      </a>
                    `,
                },
              ],
            },
          ],
        },
        prism: {
          theme: lightTheme,
          darkTheme: darkTheme,
          additionalLanguages: ['bash', 'diff', 'json'],
        },
      }),
      markdown: {
        mermaid: true,
      },
      themes: [
        '@docusaurus/theme-mermaid',
        [
          require.resolve('@easyops-cn/docusaurus-search-local'),
          /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
          ({
            hashed: true,
            indexBlog: false,
            docsRouteBasePath: '/',
          }),
        ],
      ],
  };
}
