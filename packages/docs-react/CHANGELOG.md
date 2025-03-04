# @open-rpc/docs-react 2.1.1 (2025-03-04)

# 🚀 Features

* add support for extensions in docs react and tests ([adc9195](https://github.com/open-rpc/tools/commit/adc9195bc44801d1afe3ba37aca3ea4033b73f73))
* add support for supported extension error groups ([7d9a214](https://github.com/open-rpc/tools/commit/7d9a214716f4325275599efed3583a012c8120a3))

## 🐛 Bug Fixes

* add support for hiding extensions and for merging error groups into errors for documentation ([2ef3dd3](https://github.com/open-rpc/tools/commit/2ef3dd31fd513d86253bc78faebe98aadec1671e))
* roll back react-json view change ([da1792a](https://github.com/open-rpc/tools/commit/da1792ac02ed5f702c01024dc7f17663fbad2e17))
* update ux to match more of the old playground ([957afee](https://github.com/open-rpc/tools/commit/957afeebada73c0f893953f62324b41611bd7ae9))

## 🧹 Chores

* lint ([a0da8b6](https://github.com/open-rpc/tools/commit/a0da8b64a47942f1e2ca9f0037e02d72b70f6205))

# @open-rpc/docs-react 2.1.0 (2025-03-03)

## 2.1.1

### Patch Changes

- 2ef3dd3: Changes here rename Error Groups to Errors (Error Groups) to be more clear and expose the ability to hide extensions from the docs for display purposes

# 🚀 Features

- add support for extensions in docs react and tests ([adc9195](https://github.com/open-rpc/tools/commit/adc9195bc44801d1afe3ba37aca3ea4033b73f73))
- add support for supported extension error groups ([7d9a214](https://github.com/open-rpc/tools/commit/7d9a214716f4325275599efed3583a012c8120a3))
- major update to use esm, material 6.xx and react 18 ([850046f](https://github.com/open-rpc/tools/commit/850046fa4b226f1fca3d02d83620618102e9a992))

## 🐛 Bug Fixes

- roll back react-json view change ([da1792a](https://github.com/open-rpc/tools/commit/da1792ac02ed5f702c01024dc7f17663fbad2e17))
- update ux to match more of the old playground ([957afee](https://github.com/open-rpc/tools/commit/957afeebada73c0f893953f62324b41611bd7ae9))
- wip build to use esmodules instead ([2ea552c](https://github.com/open-rpc/tools/commit/2ea552c4bbf09d8ddaff44ae2ae7660841db5efb))
- get build:package working ([b334b05](https://github.com/open-rpc/tools/commit/b334b050fa22564ceb21af136c86180c6b7d5103))
- **docs-react:** add type guards for MethodObject and fix schema type issues ([c3778af](https://github.com/open-rpc/tools/commit/c3778afc97ce05def3f1627a4fe1f32ef8d17cfb))
- **docs-react:** fix eslint errors in Tags ([21dae1d](https://github.com/open-rpc/tools/commit/21dae1d98326551f0efa81dc5925d1cece337aa1))
- **docs-react:** fix eslint errors in Methods ([cf8debc](https://github.com/open-rpc/tools/commit/cf8debc67e479e631244531b134ea0606b415ad3))
- **docs-react:** fix eslint errors in MarkdownDescription ([6cff5a6](https://github.com/open-rpc/tools/commit/6cff5a65aee47537c935ebb34be2fc9ebfc04657))
- **docs-react:** fix eslint errors in ExamplePairings ([8af04df](https://github.com/open-rpc/tools/commit/8af04df8674816c09f3aa76e13de3b09e6865027))
- **docs-react:** fix eslint errors in ExamplePairing ([90e476c](https://github.com/open-rpc/tools/commit/90e476c4e258b94db5aceeec7e563456b87c741a))

## 🧹 Chores

- lint ([a0da8b6](https://github.com/open-rpc/tools/commit/a0da8b64a47942f1e2ca9f0037e02d72b70f6205))
- apply prettier linting ([cbacda8](https://github.com/open-rpc/tools/commit/cbacda8cfa179a9c2f10792f0e1873943ef38910))
- version packages and generate changelog ([3fb58d0](https://github.com/open-rpc/tools/commit/3fb58d00d4676b4de0cf60c8aefffeb2a77ae883))
- adjust package.json to properly reflect package repos ([91eef52](https://github.com/open-rpc/tools/commit/91eef5201fc431aa11bfd4d5b542fb37a1330278))

# @open-rpc/docs-react 2.0.0 (2025-02-26)

## 2.1.0

### Minor Changes

- 2567741: This change fixes a few ux/ui changes as well as introduces a new extensions repo.
  The extensions repo represents extensions to the open-rpc specification that are
  recognized

### Patch Changes

- Updated dependencies [2567741]
  - @open-rpc/json-schema-to-react-tree@0.1.1

## 🚀 Features

- major update to use esm, material 6.xx and react 18 ([850046f](https://github.com/open-rpc/tools/commit/850046fa4b226f1fca3d02d83620618102e9a992))
- use shared files and update to eslint ([3290d21](https://github.com/open-rpc/tools/commit/3290d21f55ec835f79868b06e76d69ec4eb94f54))

## 🐛 Bug Fixes

- wip build to use esmodules instead ([2ea552c](https://github.com/open-rpc/tools/commit/2ea552c4bbf09d8ddaff44ae2ae7660841db5efb))
- get build:package working ([b334b05](https://github.com/open-rpc/tools/commit/b334b050fa22564ceb21af136c86180c6b7d5103))
- **docs-react:** add type guards for MethodObject and fix schema type issues ([c3778af](https://github.com/open-rpc/tools/commit/c3778afc97ce05def3f1627a4fe1f32ef8d17cfb))
- **docs-react:** fix eslint errors in Tags ([21dae1d](https://github.com/open-rpc/tools/commit/21dae1d98326551f0efa81dc5925d1cece337aa1))
- **docs-react:** fix eslint errors in Methods ([cf8debc](https://github.com/open-rpc/tools/commit/cf8debc67e479e631244531b134ea0606b415ad3))
- **docs-react:** fix eslint errors in MarkdownDescription ([6cff5a6](https://github.com/open-rpc/tools/commit/6cff5a65aee47537c935ebb34be2fc9ebfc04657))
- **docs-react:** fix eslint errors in ExamplePairings ([8af04df](https://github.com/open-rpc/tools/commit/8af04df8674816c09f3aa76e13de3b09e6865027))
- **docs-react:** fix eslint errors in ExamplePairing ([90e476c](https://github.com/open-rpc/tools/commit/90e476c4e258b94db5aceeec7e563456b87c741a))
- **docs-react:** resolve linting issues in ContentDescriptor ([108a4a3](https://github.com/open-rpc/tools/commit/108a4a30669c48dc30bf8ff23c76a671f43e1f59))
- bump versions ([0217b38](https://github.com/open-rpc/tools/commit/0217b386c4663b2f9945b4c5f8920c979a1b80d5))

## 🧹 Chores

- adjust package.json to properly reflect package repos ([91eef52](https://github.com/open-rpc/tools/commit/91eef5201fc431aa11bfd4d5b542fb37a1330278))

## Other Changes

- Update dependencies and Node.js version ([0f962fd](https://github.com/open-rpc/tools/commit/0f962fda04de8cb86eeff88fa78ea6161014adf6))
- Update `package.json` files in `docs-react`, `inspector`, `logs-react`, and `playground` packages ([727ecfc](https://github.com/open-rpc/tools/commit/727ecfc3e02e498bf18e23962f53a69f64d6a1c8))
- Add `engines` field to specify Node.js version ([4ef0267](https://github.com/open-rpc/tools/commit/4ef0267bfb8df57483439a5f9ae10f0d5bf799e9))
- Set up Turborepo and GitHub Actions ([7cd111a](https://github.com/open-rpc/tools/commit/7cd111a987961c90af872d847821990c4b4079ba))
- Merged docs-react into packages/docs-react ([048496b](https://github.com/open-rpc/tools/commit/048496bd85f12943874143c46a1c1ec1daa040a5))

# @open-rpc/docs-react

## 2.0.0

### Major Changes

- 850046f: This change is the initial rebuilding of the @open-rpc tooling ecosystem w/ modern esm, material, and react support.

  There are potentially breaking changes for every package in this commit as
  the version upgrades were major version revisions across multiple packages

### Patch Changes

- Updated dependencies [850046f]
  - @open-rpc/json-schema-to-react-tree@0.1.0
