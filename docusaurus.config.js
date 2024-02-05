// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
module.exports = async function createConfig() {
  const { remarkKroki } = await import('remark-kroki');
  return {
    title: 'Te Whatu Ora API Standards',
    favicon: 'img/favicon-32x32.png',

    // Set the production url of your site here
    url: 'https://example.com',
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
    plugins: [require.resolve('docusaurus-lunr-search')],
    presets: [
      [
        'redocusaurus',
        {
          specs: [
            {
              spec: 'docs/api-development/api-specifications/example-agency-spec.yaml',
              route: '/api-specifications/example-agency-specification',
            },
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
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
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
          respectPrefersColorScheme: false,
        },
        navbar: {
          title: 'API Standards',
          logo: {
            alt: 'Te Whatu Ora logo',
            src: 'img/two.svg',
          },
          items: [
            {
              href: 'https://github.com/tewhatuora/api-standards/issues',
              label: 'Raise issue',
              position: 'right',
              target: '_blank',
              style: {'font-size': '0.9125rem'}
            },
          ],
        },
        footer: {
          links: [
            {
              title: 'About',
              items: [
                {
                  label: 'About this site',
                  href: 'https://marketplace.hira.health.nz',
                },
                {
                  label: 'Privacy',
                  href: 'https://marketplace.hira.health.nz',
                },
                {
                  label: 'Contact',
                  href: 'https://marketplace.hira.health.nz',
                },
                {
                  label: 'Terms of use',
                  href: 'https://marketplace.hira.health.nz',
                },
                {
                  label: 'Legal and Copyright',
                  href: 'https://marketplace.hira.health.nz',
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
                  label: 'Hira Marketplace',
                  href: 'https://marketplace.hira.health.nz',
                },
                {
                  label: 'Te Whatu Ora',
                  href: 'https://www.tewhatuora.govt.nz',
                },
              ],
            },
          ],
          logo: {
            alt: 'Te Kāwanatanga o Aotearoa — New Zealand Government',
            src: 'img/govt-nz.png',
            href: 'https://www.govt.nz',
            style: { float: 'left', width: '7.5rem' },
          },
        },
        prism: {
          theme: lightTheme,
          darkTheme: darkTheme,
          additionalLanguages: ['bash', 'diff', 'json'],
        },
      }),
  };
}
