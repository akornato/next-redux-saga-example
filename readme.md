# next-redux-saga-example [![CircleCI](https://circleci.com/gh/akornato/next-redux-saga-example.svg?style=svg)](https://circleci.com/gh/akornato/next-redux-saga-example)

Facebook GitHub repo viewer. The app has a sidebar navigation with repos sorted by stargazers. Clicking on one of them fetches that repo data and populates the main view with its details and a list of project contributors.

## CI/CD

- [musing-joliot-fef599.netlify.com](https://musing-joliot-fef599.netlify.com/) - Jest/Enzyme tests with [coverage](https://musing-joliot-fef599.netlify.com/static/coverage/lcov-report/index.html) + build + export into a static app.

## Musings

I tried to use the new [GitHub GraphQL API](https://developer.github.com/v4/) but hit the following issues:

- [list-org-repos-ordered-by-stargazers-not-working](https://platform.github.community/t/list-org-repos-ordered-by-stargazers-not-working/7505): falling back to client side sorting for now.
- [contributors-of-a-repository](https://platform.github.community/t/contributors-of-a-repository/3680/11): no other choice but to use [GitHub REST API](https://developer.github.com/v3/) to get repo contributors for now.

Eventually I'm using GraphQL only to get the sidebar repo list so I can select only the few fields I need there. However GitHub imposes a limit of 100 repos with a single GraphQL query so I'm using a little redux saga to get them all via paging.

## Built with

- [Next.js](https://nextjs.org/) - React framework for static and server-rendered applications.
- [Redux](https://redux.js.org/) - Predictable state container for JavaScript apps.
- [redux-saga](https://github.com/redux-saga/redux-saga) - An alternative side effect model for Redux apps.
- [redux-api-middleware](https://github.com/agraboso/redux-api-middleware) - Redux middleware for calling an API.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework.
- [Ant Design of React](https://ant.design/docs/react/introduce) - React UI library.

## Requirements

[Node.js](https://nodejs.org/en/)

## Getting started

```bash
  npm install
  npm run dev
```

## Test

```bash
  npm test
```

## Build

```bash
  npm run build
```

## Export

Exports the project into a static app:

```bash
  npm run export
```

## License

MIT
