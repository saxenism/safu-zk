import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/safu-zk/',
    component: ComponentCreator('/safu-zk/', '465'),
    exact: true
  },
  {
    path: '/safu-zk/blog',
    component: ComponentCreator('/safu-zk/blog', 'e18'),
    exact: true
  },
  {
    path: '/safu-zk/blog/archive',
    component: ComponentCreator('/safu-zk/blog/archive', '416'),
    exact: true
  },
  {
    path: '/safu-zk/blog/encrypted-qap-evaluations',
    component: ComponentCreator('/safu-zk/blog/encrypted-qap-evaluations', '258'),
    exact: true
  },
  {
    path: '/safu-zk/blog/tags',
    component: ComponentCreator('/safu-zk/blog/tags', '956'),
    exact: true
  },
  {
    path: '/safu-zk/blog/tags/qap',
    component: ComponentCreator('/safu-zk/blog/tags/qap', '397'),
    exact: true
  },
  {
    path: '/safu-zk/blog/tags/security',
    component: ComponentCreator('/safu-zk/blog/tags/security', 'ac5'),
    exact: true
  },
  {
    path: '/safu-zk/challenges',
    component: ComponentCreator('/safu-zk/challenges', 'f35'),
    exact: true
  },
  {
    path: '/safu-zk/markdown-page',
    component: ComponentCreator('/safu-zk/markdown-page', 'd81'),
    exact: true
  },
  {
    path: '/safu-zk/resources',
    component: ComponentCreator('/safu-zk/resources', '237'),
    exact: true
  },
  {
    path: '/safu-zk/docs',
    component: ComponentCreator('/safu-zk/docs', 'c80'),
    routes: [
      {
        path: '/safu-zk/docs',
        component: ComponentCreator('/safu-zk/docs', '9ee'),
        routes: [
          {
            path: '/safu-zk/docs',
            component: ComponentCreator('/safu-zk/docs', '210'),
            routes: [
              {
                path: '/safu-zk/docs/category/tutorial---basics',
                component: ComponentCreator('/safu-zk/docs/category/tutorial---basics', '639'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/category/tutorial---extras',
                component: ComponentCreator('/safu-zk/docs/category/tutorial---extras', '9fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/intro',
                component: ComponentCreator('/safu-zk/docs/intro', 'c26'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/safu-zk/docs/tutorial-basics/congratulations', 'dcc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/safu-zk/docs/tutorial-basics/create-a-blog-post', '66a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/safu-zk/docs/tutorial-basics/create-a-document', '3e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/safu-zk/docs/tutorial-basics/create-a-page', 'fa3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/safu-zk/docs/tutorial-basics/deploy-your-site', '2a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/safu-zk/docs/tutorial-basics/markdown-features', '730'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/safu-zk/docs/tutorial-extras/manage-docs-versions', 'a78'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/safu-zk/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/safu-zk/docs/tutorial-extras/translate-your-site', 'dc6'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
