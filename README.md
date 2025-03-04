# OpenRPC Tools

<p align="center">
  <img src="https://raw.githubusercontent.com/open-rpc/design/master/icons/open-rpc-logo-noText/open-rpc-logo-noText%20(PNG)/256x256.png" alt="OpenRPC Logo" width="150" />
</p>

A collection of developer tools for the [OpenRPC](https://open-rpc.org) ecosystem.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Table of Contents

- [Overview](#overview)
- [Packages](#packages)
- [Installation](#installation)
- [Development](#development)
  - [Building Packages](#building-packages)
- [Version Management](#version-management)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)
- [Resources](#resources)

## Overview

OpenRPC Tools is a monorepo containing various tools and utilities for working with the OpenRPC specification. These tools help developers create, validate, document, and interact with JSON-RPC APIs using the OpenRPC standard.

The OpenRPC specification provides a way to describe JSON-RPC 2.0 APIs in a machine-readable format, similar to how OpenAPI/Swagger works for REST APIs. This repository contains React components, utilities, and applications that make working with OpenRPC documents easier.

## Packages

| Package                                                                     | Description                                            | Link                                                     |
| --------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| [@open-rpc/inspector](./packages/inspector)                                 | A tool to create, modify and execute JSON-RPC requests | [README](./packages/inspector/README.md)                 |
| [@open-rpc/docs-react](./packages/docs-react)                               | React component for rendering OpenRPC documentation    | [README](./packages/docs-react/README.md)                |
| [@open-rpc/extensions](./packages/extensions)                               | Collection of OpenRPC Specification Extensions         | [README](./packages/extensions/README.md)                |
| [@open-rpc/playground](./packages/playground)                               | Editor and live-preview for OpenRPC documents          | [README](./packages/playground/README.md)                |
| [@open-rpc/logs-react](./packages/logs-react)                               | React component for displaying JSON-RPC logs           | [README](./packages/logs-react/README.md)                |
| [@xops.net/json-schema-to-react-tree](./packages/json-schema-to-react-tree) | React component to visually display JSON Schemas       | [README](./packages/json-schema-to-react-tree/README.md) |
| [@open-rpc/monaco-editor-react](./packages/monaco-editor-react)             | Monaco editor with OpenRPC support                     | [README](./packages/monaco-editor-react/README.md)       |

## Installation

This project requires Node.js version 20 or higher.

To install all dependencies and build all packages:

```sh
npm install
npm run build
```

## Development

This repository is structured as a monorepo using npm workspaces. To work on a specific package:

```sh
cd packages/<package-name>
npm install
npm start
```

For testing:

```sh
# Run tests for all packages
npm test

# Run tests for a specific package
cd packages/<package-name>
npm test
```

### Building Packages

To build an individual package, navigate to the package directory and run the build:package script:

```sh
# Navigate to the package directory
cd packages/<package-name>

# Build the package
npm run build:package
```

The build process respects dependencies between packages, so if you build a package that depends on another package, the dependency will be built first.

## Version Management

This project uses [Changesets](https://github.com/changesets/changesets) to manage versions and generate changelogs.

### Creating a Changeset

When making changes that should result in a version bump, create a changeset using the npm script:

```sh
npm run changeset
```

This will prompt you to:

1. Select the packages that have changed
2. Choose the semver increment (major, minor, patch)
3. Provide a description of the changes

The changeset will be added to the `.changeset` directory and should be committed with your changes.

If your PR doesn't require a version change, you can create an empty changeset:

```sh
npm run changeset -- empty
```

This creates a special changeset that satisfies the PR validation check without triggering a version bump.

### Automated Versioning and Publishing

The versioning and publishing process is handled automatically by GitHub Actions:

1. When a PR is opened, the CI checks for the presence of a changeset
2. When a PR is merged to main, the changesets/action:
   - Updates package versions based on the changesets
   - Generates changelog entries
   - Publishes packages to npm

For more details on the CI/CD process, see the workflow files in the [.github/workflows](./.github/workflows) directory.

## Contributing

We welcome contributions to any of the packages in this repository! Please read the following documents before contributing:

- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute to this project
- [BUILDING.md](BUILDING.md) - How to build the project
- [RELEASING.md](RELEASING.md) - How to release new versions
- [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) - Commit message format

When contributing code changes, please also include a changeset describing your changes as described in the [Version Management](#version-management) section.

## Changelog

This project uses a semantic-release style changelog generator. For more information on how changelogs are generated and maintained, see [CHANGELOG_GUIDE.md](CHANGELOG_GUIDE.md).

## License

[Apache 2.0](LICENSE)

## Resources

- [OpenRPC Specification](https://spec.open-rpc.org/)
- [OpenRPC Website](https://open-rpc.org/)
- [Discord Community](https://discord.gg/gREUKuF)
- [OpenRPC GitHub Organization](https://github.com/open-rpc)
