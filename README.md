# ⚡️Fleek Proxy

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

`fleek-proxy` is a lightweight JavaScript package designed to route incoming requests and act as an API Gateway for your app. Built for edge function services, it helps forward and proxy requests to the appropriate destinations.

# Features

- **Flexible Routing**: Configure custom routes with wildcards.
- **Proxy Requests**: Forward HTTP requests to specified destinations.
- **Default Route**: Set up a default route to catch unmatched paths.
- **Seamless Integration**: Written in TypeScript for type safety.

# Installation

```
npm install @fleekxyz/proxy
```

# Usage

Here's a basic example of a Fleek edge function, demonstrating how to configure and use the proxy package.

```typescript
import { createProxy, FleekRequest, FleekResponse } from '@fleekxyz/proxy';

// Define your routing rules
const proxy = createProxy({
  routes: {
    routes: {
      '/api/': 'https://api.foo.com/',
      '/external/': 'https://external-service.com/',
    },
    default: 'https://fallback-service.com/',
  },
});

// Proxy the request and handle the response

export async function main(req: FleekRequest): Promise<FleekResponse> {
  return await proxy.proxyRequest(req);
}
```

# Contributing

Thanks for considering contributing to our project!

## How to Contribute

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes.
4. Commit your changes using conventional commits.
5. Push to your fork and submit a pull request.

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages:

- `test`: 💍 Adding missing tests
- `feat`: 🎸 A new feature
- `fix`: 🐛 A bug fix
- `chore`: 🤖 Build process or auxiliary tool changes
- `docs`: ✏️ Documentation only changes
- `refactor`: 💡 A code change that neither fixes a bug or adds a feature
- `style`: 💄 Markup, white-space, formatting, missing semi-colons...
