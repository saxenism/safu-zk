// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Safu ZK',
  tagline: 'Zero Knowledge Proofs(ZKPs) is a domain of cryptography that promises to provide blockchain with several capabilities such as scaling & privacy. This website is dedicated entirely to ZKP security.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://safuzk.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'saxenism', // Usually your GitHub org/user name.
  projectName: 'safu-zk', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social cardß
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Safu ZK',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: '/blog', label: "Blogs", position: 'left'},
          {to: '/challenges', label: 'Hack The Circuits', position: 'left'},
          {to: '/resources', label: 'Learn ZK', position: 'left'}
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'DM me on',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/users/saxenism#8139',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/saxenism',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/saxenism'
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/saxenism/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Experimental Circuit Code',
                href: 'https://github.com/saxenism/safu-zk/tree/master/playground-experiments',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/saxenism',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/11924484/rahul-saxena',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Bluethroat Labs`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
