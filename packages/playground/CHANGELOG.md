# @open-rpc/playground 1.1.3 (2025-03-01)

## 🚀 Features

* major update to use esm, material 6.xx and react 18 ([850046f](https://github.com/open-rpc/tools/commit/850046fa4b226f1fca3d02d83620618102e9a992))

## 🐛 Bug Fixes

* change supports local schema for document change update signal ([9bbf9ce](https://github.com/open-rpc/tools/commit/9bbf9ceeaba107e6d7844c481e76bc337984ed7f))
* temp. use local JSONSchema definition ([9d66e8a](https://github.com/open-rpc/tools/commit/9d66e8acd73143aa4cb44d9bcbf075d3767ca4a5))
* caching issue on partially loaded or empty docs ([88c74bd](https://github.com/open-rpc/tools/commit/88c74bd03667a2b14719f13f5c612b1f50c412fc))
* update themes for json syntax highlighting ([abe9c58](https://github.com/open-rpc/tools/commit/abe9c5866145d88a870b5b39a3eb4c847761a920))
* relax styling constraints and add more styles to themes to match older playground ([a92f0b2](https://github.com/open-rpc/tools/commit/a92f0b271f26ec4038e7abd66f217e43ce925259))
* guarantee update for changes to the document affects extensions ([dfe2a31](https://github.com/open-rpc/tools/commit/dfe2a31b880722fc9ced79f3cff4db97822e27c9))
* wip build to use esmodules instead ([2ea552c](https://github.com/open-rpc/tools/commit/2ea552c4bbf09d8ddaff44ae2ae7660841db5efb))
* get build:package working ([b334b05](https://github.com/open-rpc/tools/commit/b334b050fa22564ceb21af136c86180c6b7d5103))

## 🧹 Chores

* version packages and generate changelog ([8333183](https://github.com/open-rpc/tools/commit/8333183426b8bbe56e49ba0d627f3419e4dbcfc4))
* add playground readme ([ba19e0e](https://github.com/open-rpc/tools/commit/ba19e0ef8badc6419bbb6150a53f884a70ca261e))
* prettier linting update ([7fdb37b](https://github.com/open-rpc/tools/commit/7fdb37bd8033ead319dd7f1663687d4ac2722494))
* adjust package.json to properly reflect package repos ([91eef52](https://github.com/open-rpc/tools/commit/91eef5201fc431aa11bfd4d5b542fb37a1330278))

# @open-rpc/playground 1.1.2 (2025-03-01)

## 1.1.3

### Patch Changes

- 9bbf9ce: Change here adds patch to use the local schema for document changes as well

## 🚀 Features

- major update to use esm, material 6.xx and react 18 ([850046f](https://github.com/open-rpc/tools/commit/850046fa4b226f1fca3d02d83620618102e9a992))

## 🐛 Bug Fixes

- temp. use local JSONSchema definition ([9d66e8a](https://github.com/open-rpc/tools/commit/9d66e8acd73143aa4cb44d9bcbf075d3767ca4a5))
- caching issue on partially loaded or empty docs ([88c74bd](https://github.com/open-rpc/tools/commit/88c74bd03667a2b14719f13f5c612b1f50c412fc))
- update themes for json syntax highlighting ([abe9c58](https://github.com/open-rpc/tools/commit/abe9c5866145d88a870b5b39a3eb4c847761a920))
- relax styling constraints and add more styles to themes to match older playground ([a92f0b2](https://github.com/open-rpc/tools/commit/a92f0b271f26ec4038e7abd66f217e43ce925259))
- guarantee update for changes to the document affects extensions ([dfe2a31](https://github.com/open-rpc/tools/commit/dfe2a31b880722fc9ced79f3cff4db97822e27c9))
- wip build to use esmodules instead ([2ea552c](https://github.com/open-rpc/tools/commit/2ea552c4bbf09d8ddaff44ae2ae7660841db5efb))
- get build:package working ([b334b05](https://github.com/open-rpc/tools/commit/b334b050fa22564ceb21af136c86180c6b7d5103))
- **playground:** fix eslint errors in ExampleDocumentsDropdown ([d8c9b6c](https://github.com/open-rpc/tools/commit/d8c9b6cf9ea6dfbd6506327d67c11b71814c21e5))
- **playground:** fix eslint errors in App ([ddd26bb](https://github.com/open-rpc/tools/commit/ddd26bbbad11c3818128288d0accfed8fecdfbf8))
- **playground:** fix eslint errors in TransportDropdown ([1af92a8](https://github.com/open-rpc/tools/commit/1af92a88233b6b101ddf14393fc93dffd4ad1bd1))

## 🧹 Chores

- version packages and generate changelog ([3fda184](https://github.com/open-rpc/tools/commit/3fda184e687f6d0894cb629069bf3d47c4fe6143))
- add playground readme ([ba19e0e](https://github.com/open-rpc/tools/commit/ba19e0ef8badc6419bbb6150a53f884a70ca261e))
- prettier linting update ([7fdb37b](https://github.com/open-rpc/tools/commit/7fdb37bd8033ead319dd7f1663687d4ac2722494))
- adjust package.json to properly reflect package repos ([91eef52](https://github.com/open-rpc/tools/commit/91eef5201fc431aa11bfd4d5b542fb37a1330278))

# @open-rpc/playground 1.1.1 (2025-03-01)

## 1.1.2

### Patch Changes

- 9d66e8a: A change to temporarily use local JSONSchema definition to resolve the
  issues surrounding CORS and https://meta.json-schema.tools. We host
  that JSONSchema specfication, but are running into issues with CORS.
  This works as a stop gap until it's fixed upstream.

## 🚀 Features

- major update to use esm, material 6.xx and react 18 ([850046f](https://github.com/open-rpc/tools/commit/850046fa4b226f1fca3d02d83620618102e9a992))

## 🐛 Bug Fixes

- caching issue on partially loaded or empty docs ([88c74bd](https://github.com/open-rpc/tools/commit/88c74bd03667a2b14719f13f5c612b1f50c412fc))
- update themes for json syntax highlighting ([abe9c58](https://github.com/open-rpc/tools/commit/abe9c5866145d88a870b5b39a3eb4c847761a920))
- relax styling constraints and add more styles to themes to match older playground ([a92f0b2](https://github.com/open-rpc/tools/commit/a92f0b271f26ec4038e7abd66f217e43ce925259))
- guarantee update for changes to the document affects extensions ([dfe2a31](https://github.com/open-rpc/tools/commit/dfe2a31b880722fc9ced79f3cff4db97822e27c9))
- wip build to use esmodules instead ([2ea552c](https://github.com/open-rpc/tools/commit/2ea552c4bbf09d8ddaff44ae2ae7660841db5efb))
- get build:package working ([b334b05](https://github.com/open-rpc/tools/commit/b334b050fa22564ceb21af136c86180c6b7d5103))
- **playground:** fix eslint errors in ExampleDocumentsDropdown ([d8c9b6c](https://github.com/open-rpc/tools/commit/d8c9b6cf9ea6dfbd6506327d67c11b71814c21e5))
- **playground:** fix eslint errors in App ([ddd26bb](https://github.com/open-rpc/tools/commit/ddd26bbbad11c3818128288d0accfed8fecdfbf8))
- **playground:** fix eslint errors in TransportDropdown ([1af92a8](https://github.com/open-rpc/tools/commit/1af92a88233b6b101ddf14393fc93dffd4ad1bd1))

## 🧹 Chores

- version packages and generate changelog ([f0d32fe](https://github.com/open-rpc/tools/commit/f0d32fe39b6e1a11b80f3ee1e6f0a9e38f0c6f67))
- add playground readme ([ba19e0e](https://github.com/open-rpc/tools/commit/ba19e0ef8badc6419bbb6150a53f884a70ca261e))
- prettier linting update ([7fdb37b](https://github.com/open-rpc/tools/commit/7fdb37bd8033ead319dd7f1663687d4ac2722494))
- adjust package.json to properly reflect package repos ([91eef52](https://github.com/open-rpc/tools/commit/91eef5201fc431aa11bfd4d5b542fb37a1330278))

# @open-rpc/playground 1.1.0 (2025-02-28)

## 1.1.1

### Patch Changes

- a687667: This patch fixes a minor issue that occurs because of caching or loading partial documents for the first time

## 🚀 Features

- major update to use esm, material 6.xx and react 18 ([850046f](https://github.com/open-rpc/tools/commit/850046fa4b226f1fca3d02d83620618102e9a992))

## 🐛 Bug Fixes

- update themes for json syntax highlighting ([abe9c58](https://github.com/open-rpc/tools/commit/abe9c5866145d88a870b5b39a3eb4c847761a920))
- relax styling constraints and add more styles to themes to match older playground ([a92f0b2](https://github.com/open-rpc/tools/commit/a92f0b271f26ec4038e7abd66f217e43ce925259))
- guarantee update for changes to the document affects extensions ([dfe2a31](https://github.com/open-rpc/tools/commit/dfe2a31b880722fc9ced79f3cff4db97822e27c9))
- wip build to use esmodules instead ([2ea552c](https://github.com/open-rpc/tools/commit/2ea552c4bbf09d8ddaff44ae2ae7660841db5efb))
- get build:package working ([b334b05](https://github.com/open-rpc/tools/commit/b334b050fa22564ceb21af136c86180c6b7d5103))
- **playground:** fix eslint errors in ExampleDocumentsDropdown ([d8c9b6c](https://github.com/open-rpc/tools/commit/d8c9b6cf9ea6dfbd6506327d67c11b71814c21e5))
- **playground:** fix eslint errors in App ([ddd26bb](https://github.com/open-rpc/tools/commit/ddd26bbbad11c3818128288d0accfed8fecdfbf8))
- **playground:** fix eslint errors in TransportDropdown ([1af92a8](https://github.com/open-rpc/tools/commit/1af92a88233b6b101ddf14393fc93dffd4ad1bd1))

## 🧹 Chores

- add playground readme ([ba19e0e](https://github.com/open-rpc/tools/commit/ba19e0ef8badc6419bbb6150a53f884a70ca261e))
- prettier linting update ([7fdb37b](https://github.com/open-rpc/tools/commit/7fdb37bd8033ead319dd7f1663687d4ac2722494))
- version packages and generate changelog ([3fb58d0](https://github.com/open-rpc/tools/commit/3fb58d00d4676b4de0cf60c8aefffeb2a77ae883))
- adjust package.json to properly reflect package repos ([91eef52](https://github.com/open-rpc/tools/commit/91eef5201fc431aa11bfd4d5b542fb37a1330278))

# @open-rpc/playground 1.0.0 (2025-02-26)

## 1.1.0

### Minor Changes

- 2567741: This change fixes a few ux/ui changes as well as introduces a new extensions repo.
  The extensions repo represents extensions to the open-rpc specification that are
  recognized

### Patch Changes

- Updated dependencies [2567741]
  - @open-rpc/docs-react@2.1.0
  - @open-rpc/monaco-editor-react@0.1.1
  - @open-rpc/inspector@2.0.1

## 🚀 Features

- major update to use esm, material 6.xx and react 18 ([850046f](https://github.com/open-rpc/tools/commit/850046fa4b226f1fca3d02d83620618102e9a992))
- use shared files and update to eslint ([3290d21](https://github.com/open-rpc/tools/commit/3290d21f55ec835f79868b06e76d69ec4eb94f54))

## 🐛 Bug Fixes

- wip build to use esmodules instead ([2ea552c](https://github.com/open-rpc/tools/commit/2ea552c4bbf09d8ddaff44ae2ae7660841db5efb))
- get build:package working ([b334b05](https://github.com/open-rpc/tools/commit/b334b050fa22564ceb21af136c86180c6b7d5103))
- **playground:** fix eslint errors in ExampleDocumentsDropdown ([d8c9b6c](https://github.com/open-rpc/tools/commit/d8c9b6cf9ea6dfbd6506327d67c11b71814c21e5))
- **playground:** fix eslint errors in App ([ddd26bb](https://github.com/open-rpc/tools/commit/ddd26bbbad11c3818128288d0accfed8fecdfbf8))
- **playground:** fix eslint errors in TransportDropdown ([1af92a8](https://github.com/open-rpc/tools/commit/1af92a88233b6b101ddf14393fc93dffd4ad1bd1))
- bump versions ([0217b38](https://github.com/open-rpc/tools/commit/0217b386c4663b2f9945b4c5f8920c979a1b80d5))

## 🧹 Chores

- adjust package.json to properly reflect package repos ([91eef52](https://github.com/open-rpc/tools/commit/91eef5201fc431aa11bfd4d5b542fb37a1330278))

## Other Changes

- Merge branch 'master' into shanejonas/update-react-monaco-rewired ([8608613](https://github.com/open-rpc/tools/commit/86086134b8b9d368819e0553bba6fd92e33213be))
- Update react, react-dom, and monaco-editor to latest versions ([88a4c4e](https://github.com/open-rpc/tools/commit/88a4c4e5f2fb3faf7e598b1e9fdb86ccc1761dc7))
- Update `packages/inspector/package.json` and `packages/playground/package.json` to use `react-app-rewired` ([83954d2](https://github.com/open-rpc/tools/commit/83954d2a41a8cc90fc356484d3cce6274efa77fb))
- Update React, Monaco, and replace rescripts with rewired ([3833861](https://github.com/open-rpc/tools/commit/3833861109ff735cb8f8f4bee64949189441b469))
- Update dependencies and Node.js version ([0f962fd](https://github.com/open-rpc/tools/commit/0f962fda04de8cb86eeff88fa78ea6161014adf6))
- Fix npm install error by removing monaco-vim and updating dependencies ([cae746e](https://github.com/open-rpc/tools/commit/cae746e92d5947bf0b573242b3e5df84ac39fdc3))
- Update `package.json` files in `docs-react`, `inspector`, `logs-react`, and `playground` packages ([727ecfc](https://github.com/open-rpc/tools/commit/727ecfc3e02e498bf18e23962f53a69f64d6a1c8))
- Add `engines` field to specify Node.js version ([4ef0267](https://github.com/open-rpc/tools/commit/4ef0267bfb8df57483439a5f9ae10f0d5bf799e9))
- Set up Turborepo and GitHub Actions ([7cd111a](https://github.com/open-rpc/tools/commit/7cd111a987961c90af872d847821990c4b4079ba))

# @open-rpc/playground

## 1.0.0

### Major Changes

- 850046f: This change is the initial rebuilding of the @open-rpc tooling ecosystem w/ modern esm, material, and react support.

  There are potentially breaking changes for every package in this commit as
  the version upgrades were major version revisions across multiple packages

### Patch Changes

- Updated dependencies [850046f]
  - @open-rpc/docs-react@2.0.0
  - @open-rpc/inspector@2.0.0
  - @open-rpc/monaco-editor-react@0.1.0
