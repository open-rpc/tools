# @open-rpc/logs-react 2.0.1 (2025-02-28)

## 🚀 Features

* major update to use esm, material 6.xx and react 18 ([850046f](https://github.com/open-rpc/tools/commit/850046fa4b226f1fca3d02d83620618102e9a992))

## 🐛 Bug Fixes

* wip build to use esmodules instead ([2ea552c](https://github.com/open-rpc/tools/commit/2ea552c4bbf09d8ddaff44ae2ae7660841db5efb))
* get build:package working ([b334b05](https://github.com/open-rpc/tools/commit/b334b050fa22564ceb21af136c86180c6b7d5103))
* **logs-react:** fix eslint errors in cardList and LogChips ([d8b70aa](https://github.com/open-rpc/tools/commit/d8b70aa28c673598dd05633e2f16137299db772c))

## 🧹 Chores

* prettier linting ([bab6d14](https://github.com/open-rpc/tools/commit/bab6d14d83bcf34dedcc2035b8369afdd01246c2))
* version packages and generate changelog ([3fb58d0](https://github.com/open-rpc/tools/commit/3fb58d00d4676b4de0cf60c8aefffeb2a77ae883))
* adjust package.json to properly reflect package repos ([91eef52](https://github.com/open-rpc/tools/commit/91eef5201fc431aa11bfd4d5b542fb37a1330278))

# @open-rpc/logs-react 2.0.0 (2025-02-26)

## 2.0.1

### Patch Changes

- 2567741: This change fixes a few ux/ui changes as well as introduces a new extensions repo.
  The extensions repo represents extensions to the open-rpc specification that are
  recognized
- Updated dependencies [2567741]
  - @open-rpc/monaco-editor-react@0.1.1

## 🚀 Features

- major update to use esm, material 6.xx and react 18 ([850046f](https://github.com/open-rpc/tools/commit/850046fa4b226f1fca3d02d83620618102e9a992))
- use shared files and update to eslint ([3290d21](https://github.com/open-rpc/tools/commit/3290d21f55ec835f79868b06e76d69ec4eb94f54))

## 🐛 Bug Fixes

- wip build to use esmodules instead ([2ea552c](https://github.com/open-rpc/tools/commit/2ea552c4bbf09d8ddaff44ae2ae7660841db5efb))
- get build:package working ([b334b05](https://github.com/open-rpc/tools/commit/b334b050fa22564ceb21af136c86180c6b7d5103))
- **logs-react:** fix eslint errors in cardList and LogChips ([d8b70aa](https://github.com/open-rpc/tools/commit/d8b70aa28c673598dd05633e2f16137299db772c))
- bump versions ([0217b38](https://github.com/open-rpc/tools/commit/0217b386c4663b2f9945b4c5f8920c979a1b80d5))

## 🧹 Chores

- adjust package.json to properly reflect package repos ([91eef52](https://github.com/open-rpc/tools/commit/91eef5201fc431aa11bfd4d5b542fb37a1330278))

## Other Changes

- Merge branch 'master' into shanejonas/update-react-monaco-rewired ([8608613](https://github.com/open-rpc/tools/commit/86086134b8b9d368819e0553bba6fd92e33213be))
- Update react, react-dom, and monaco-editor to latest versions ([88a4c4e](https://github.com/open-rpc/tools/commit/88a4c4e5f2fb3faf7e598b1e9fdb86ccc1761dc7))
- Update React, Monaco, and replace rescripts with rewired ([3833861](https://github.com/open-rpc/tools/commit/3833861109ff735cb8f8f4bee64949189441b469))
- Update dependencies and Node.js version ([0f962fd](https://github.com/open-rpc/tools/commit/0f962fda04de8cb86eeff88fa78ea6161014adf6))
- Update `package.json` files in `docs-react`, `inspector`, `logs-react`, and `playground` packages ([727ecfc](https://github.com/open-rpc/tools/commit/727ecfc3e02e498bf18e23962f53a69f64d6a1c8))
- Add `engines` field to specify Node.js version ([4ef0267](https://github.com/open-rpc/tools/commit/4ef0267bfb8df57483439a5f9ae10f0d5bf799e9))
- Set up Turborepo and GitHub Actions ([7cd111a](https://github.com/open-rpc/tools/commit/7cd111a987961c90af872d847821990c4b4079ba))

# [1.2.0](https://github.com/open-rpc/logs-react/compare/1.1.15...1.2.0) (2022-09-29)

## 2.0.0

### Major Changes

- 850046f: This change is the initial rebuilding of the @open-rpc tooling ecosystem w/ modern esm, material, and react support.

  There are potentially breaking changes for every package in this commit as
  the version upgrades were major version revisions across multiple packages

### Patch Changes

- Updated dependencies [850046f]
  - @open-rpc/monaco-editor-react@0.1.0

### Bug Fixes

- linting ([e840b80](https://github.com/open-rpc/logs-react/commit/e840b80b20d1347ffa8532dcbac7e481db9cf66c))
- update to node 14.17.5 ([d8fd6e0](https://github.com/open-rpc/logs-react/commit/d8fd6e08f7e15ba7cd136d54bf8cce91e2d95293))
- use node 12 in circle ci ([406db13](https://github.com/open-rpc/logs-react/commit/406db13d9f69346026150c837db022ef580605b9))

### Features

- restyle the project ([19e7f66](https://github.com/open-rpc/logs-react/commit/19e7f660143227e5ebdc4cb08fbe78b60d0ccc58))

## [1.1.15](https://github.com/open-rpc/logs-react/compare/1.1.14...1.1.15) (2020-11-09)

### Bug Fixes

- add notification support for ISJONRPCLog ([e06b2cf](https://github.com/open-rpc/logs-react/commit/e06b2cfa6203bfce7acf990cdf4394fdd894c61f))

## [1.1.14](https://github.com/open-rpc/logs-react/compare/1.1.13...1.1.14) (2020-11-05)

### Bug Fixes

- monaco editor options to disable large unused gutters + display folding options ([5b09982](https://github.com/open-rpc/logs-react/commit/5b09982dd3820b41db3cc5b35f580390efeb7b3f))
- show selected item in methodList ([30050a9](https://github.com/open-rpc/logs-react/commit/30050a965a4242af960ad33a66f2b5f5803a55d7))
- sizing on card items + disable some monaco options ([29ac8d8](https://github.com/open-rpc/logs-react/commit/29ac8d856a8f4eb3574ef8635349666a4cc9e8d2))

## [1.1.13](https://github.com/open-rpc/logs-react/compare/1.1.12...1.1.13) (2020-10-15)

### Bug Fixes

- cardList size + elevation ([1be2f04](https://github.com/open-rpc/logs-react/commit/1be2f0496f9142834edf6bd055953c7f4234b6f4))
- cardList sizing ([2620cc0](https://github.com/open-rpc/logs-react/commit/2620cc020638f53c44617a7346d13fc5e5ec5876))

## [1.1.12](https://github.com/open-rpc/logs-react/compare/1.1.11...1.1.12) (2020-10-15)

### Bug Fixes

- auto scroll bottom when logs change and initial ([46dab08](https://github.com/open-rpc/logs-react/commit/46dab08af9c6c5cf4f4b492d7b0d17d9b63d20d8))

## [1.1.11](https://github.com/open-rpc/logs-react/compare/1.1.10...1.1.11) (2020-10-15)

### Bug Fixes

- add support for openrpc documents to provide monaco hovers ([4338079](https://github.com/open-rpc/logs-react/commit/4338079fea4d8f24280a6ecf0025f5384eb2e2ce)), closes [#59](https://github.com/open-rpc/logs-react/issues/59)

## [1.1.10](https://github.com/open-rpc/logs-react/compare/1.1.9...1.1.10) (2020-10-15)

### Bug Fixes

- card styling ([4c52d7e](https://github.com/open-rpc/logs-react/commit/4c52d7ebb1452add35434c169c46f95b750495b9))
- **package.json:** add homepage ([4b84d82](https://github.com/open-rpc/logs-react/commit/4b84d82edaa535c796d3d7b978dcff51ab5ee4eb))

## [1.1.9](https://github.com/open-rpc/logs-react/compare/1.1.8...1.1.9) (2020-10-15)

### Bug Fixes

- remove extra div ([2e31251](https://github.com/open-rpc/logs-react/commit/2e31251dfa2f65f4b42f566a2255275a0e0e0ff6))

## [1.1.8](https://github.com/open-rpc/logs-react/compare/1.1.7...1.1.8) (2020-10-15)

### Bug Fixes

- overflow ([9840e65](https://github.com/open-rpc/logs-react/commit/9840e6516b89dc5931b5b43c5f1aeadfb27d09b2))
- overflow for cardlist ([1815d5f](https://github.com/open-rpc/logs-react/commit/1815d5f68a14e05c0f684be343528d1b6ded7731))

## [1.1.7](https://github.com/open-rpc/logs-react/compare/1.1.6...1.1.7) (2020-10-14)

### Bug Fixes

- remove scroll to bottom ([d3607ee](https://github.com/open-rpc/logs-react/commit/d3607ee6f1cc38ecadfefc09aff6f50cc33492fa))

## [1.1.6](https://github.com/open-rpc/logs-react/compare/1.1.5...1.1.6) (2020-10-14)

### Bug Fixes

- add scroll to bottom height ([f50f872](https://github.com/open-rpc/logs-react/commit/f50f872047402aa665ab1dad18a786eafdaac8f0))

## [1.1.5](https://github.com/open-rpc/logs-react/compare/1.1.4...1.1.5) (2020-10-14)

### Bug Fixes

- only use unmountOnExit and set px for monaco height+width ([ba50dc6](https://github.com/open-rpc/logs-react/commit/ba50dc6053da5163c7d9ace642b67400bae291b0))

## [1.1.4](https://github.com/open-rpc/logs-react/compare/1.1.3...1.1.4) (2020-10-14)

### Bug Fixes

- lock material-ui deps ([070be4f](https://github.com/open-rpc/logs-react/commit/070be4f48a850f9a9ad1debc65b98710fce4c1b9))

## [1.1.3](https://github.com/open-rpc/logs-react/compare/1.1.2...1.1.3) (2020-08-19)

### Bug Fixes

- revert merge from fix/remove-scroll-to-bottom ([adac76a](https://github.com/open-rpc/logs-react/commit/adac76aacc73f186143199a789e5edcdc4065509)), closes [#68](https://github.com/open-rpc/logs-react/issues/68)

### Reverts

- Revert "chore(release): 1.1.2 [skip ci]" ([bc8b206](https://github.com/open-rpc/logs-react/commit/bc8b2060ca6f2c909cc059ad49e4283acf1a9451))

## [1.1.1](https://github.com/open-rpc/logs-react/compare/1.1.0...1.1.1) (2020-08-12)

### Bug Fixes

- make add button hidden until needed ([#64](https://github.com/open-rpc/logs-react/issues/64)) ([9273770](https://github.com/open-rpc/logs-react/commit/92737703c54f99154bd267d2c64673e91261b1fa)), closes [#62](https://github.com/open-rpc/logs-react/issues/62)

# [1.1.0](https://github.com/open-rpc/logs-react/compare/1.0.5...1.1.0) (2020-07-10)

### Bug Fixes

- make logs-react component fit div when imported ([7b36afe](https://github.com/open-rpc/logs-react/commit/7b36afe187651a6eaaaff90692fc26680097dd7f))
- remove redundant theme variable ([faf99ff](https://github.com/open-rpc/logs-react/commit/faf99ffefed2c5b422fbc64bc286737ae37272ea))
- remove unused import ([8d5ff48](https://github.com/open-rpc/logs-react/commit/8d5ff489455c572ad99876ef03d8b1d0acc7da71))

### Features

- add props for enhanced customization ([b818c3d](https://github.com/open-rpc/logs-react/commit/b818c3de245c3e8c42fc2df96d33b5213769bfdb)), closes [#57](https://github.com/open-rpc/logs-react/issues/57) [#55](https://github.com/open-rpc/logs-react/issues/55)
- support batched calls ([#60](https://github.com/open-rpc/logs-react/issues/60)) ([c751f5a](https://github.com/open-rpc/logs-react/commit/c751f5acdfb13a6168be8a7d8628e05d39c3ac16)), closes [#30](https://github.com/open-rpc/logs-react/issues/30)

## [1.0.5](https://github.com/open-rpc/logs-react/compare/1.0.4...1.0.5) (2020-06-24)

### Bug Fixes

- change the sidebar to a material ui drawer ([da3a330](https://github.com/open-rpc/logs-react/commit/da3a330b7ecb452641148bb1d9503ed01ffa39d6)), closes [#48](https://github.com/open-rpc/logs-react/issues/48)
- remove appbar ([4cc4ba4](https://github.com/open-rpc/logs-react/commit/4cc4ba407f63acdd4f035ac60e5af96cadca769c))
- remove excessive card padding ([0960e4c](https://github.com/open-rpc/logs-react/commit/0960e4c9826a9c8533e265fe3e1551d2dab985e0))
- scrolling bug, themes, and drawer width ([d6ce64e](https://github.com/open-rpc/logs-react/commit/d6ce64ed15eb6b6674fd827fa7ad145c430b5927))
- slide animation is restricted to div ([e3df05f](https://github.com/open-rpc/logs-react/commit/e3df05f520e047a24f6a49bb5bce8d2160883352)), closes [#51](https://github.com/open-rpc/logs-react/issues/51)

## [1.0.4](https://github.com/open-rpc/logs-react/compare/1.0.3...1.0.4) (2020-06-18)

### Bug Fixes

- export JSONRPCLog type ([d5affbc](https://github.com/open-rpc/logs-react/commit/d5affbce65a9a998d4d5641e1b4f2be83c3aa53b))

## [1.0.3](https://github.com/open-rpc/logs-react/compare/1.0.2...1.0.3) (2020-06-16)

### Bug Fixes

- copy css into package ([a189eec](https://github.com/open-rpc/logs-react/commit/a189eec99541f5f31b6a2f88eac50cd440c7837c))
- use script to add all component css files ([ce32ea1](https://github.com/open-rpc/logs-react/commit/ce32ea194ae81b6cbe946bc901d7a5ef0dcd6004))

## [1.0.2](https://github.com/open-rpc/logs-react/compare/1.0.1...1.0.2) (2020-06-15)

### Bug Fixes

- update dependencies to match inspector ([0c698fd](https://github.com/open-rpc/logs-react/commit/0c698fdf64d0d402515d49ef583ce9dc4706b8f5)), closes [#44](https://github.com/open-rpc/logs-react/issues/44)
- update material-ui/labs ([876fd28](https://github.com/open-rpc/logs-react/commit/876fd2803c2e538c39162b8bd5f3fdceb979dee5))
- upgrade to latest material-ui/core ([9c53645](https://github.com/open-rpc/logs-react/commit/9c53645c010eee4f07d49fc720488eb916bb7dfc))

## [1.0.1](https://github.com/open-rpc/logs-react/compare/1.0.0...1.0.1) (2020-06-15)

### Bug Fixes

- add npm release target ([f27e094](https://github.com/open-rpc/logs-react/commit/f27e09485c7c6e432d593655272156402f64e055))
- remove package folder ([4ec84c2](https://github.com/open-rpc/logs-react/commit/4ec84c2e9a1df3e857bb60f8b4d9f36ae204f416))

# 1.0.0 (2020-06-15)

### Bug Fixes

- add .node-version ([f8b2713](https://github.com/open-rpc/logs-react/commit/f8b2713b64bc4836af25a9f97fe9258c476c2feb)), closes [#4](https://github.com/open-rpc/logs-react/issues/4)
- add circleci context ([6efb29e](https://github.com/open-rpc/logs-react/commit/6efb29ee4f38d2fe24fe0f5ffeb67c69b6e5721e))
- Add color coding to messages ([2b3f726](https://github.com/open-rpc/logs-react/commit/2b3f7263d1a31fa1772828f0f7f41e4a20407318))
- add tslint fixes ([d76aa7b](https://github.com/open-rpc/logs-react/commit/d76aa7b7b3d4089bfd2619f3a7c20e65fc605e0d))
- adds monacco cards to RPC calls and sort chronologically ([290c9f6](https://github.com/open-rpc/logs-react/commit/290c9f646773cbb4c8bd4a1351ae3baf3511b6ea)), closes [#9](https://github.com/open-rpc/logs-react/issues/9) [#7](https://github.com/open-rpc/logs-react/issues/7)
- circleCI formatting compliance ([32ddd25](https://github.com/open-rpc/logs-react/commit/32ddd254c1dfc92c0f4542d07aa8baa15be1e38f))
- clean up repository ([95cb95d](https://github.com/open-rpc/logs-react/commit/95cb95dcb07cb81edca8a49e5784aff7294959a2))
- conditional log passing ([d4ee090](https://github.com/open-rpc/logs-react/commit/d4ee090e5cd1127d72f40f6761dabc107140a789))
- devtools panel renders ([f83c11e](https://github.com/open-rpc/logs-react/commit/f83c11ec8f10927d1e63bdc678f83438719b242a))
- keep useWebRequest history integrity ([af12459](https://github.com/open-rpc/logs-react/commit/af124590797571564608133d1b79b75b12c89104))
- messenger layout plus darkmode ([e1836a8](https://github.com/open-rpc/logs-react/commit/e1836a8e1275fa1ad224f05ea8106d2a5af1dab2))
- pull chrome extension out of component ([dfa2880](https://github.com/open-rpc/logs-react/commit/dfa28803cf6cfb8e9218f6e7abe1910730a15989))
- remove badges ([6eddcc6](https://github.com/open-rpc/logs-react/commit/6eddcc6f9110666503a29249f38b48dd4fff31f0))
- remove mock test file ([214e119](https://github.com/open-rpc/logs-react/commit/214e11912d9eb0f43fffccce320aff0c81af58e7))
- remove reactotron ([664418b](https://github.com/open-rpc/logs-react/commit/664418bb3b93498e02b458212ff9d8fd11214313))
- remove test text ([df4ef14](https://github.com/open-rpc/logs-react/commit/df4ef146cd046d0599b3621ab8517dfef2c77cf0))
- remove unused import ([65f3de4](https://github.com/open-rpc/logs-react/commit/65f3de432daccd56e9f82fc07bdd75f34fbfea8e))
- remove unused imports ([46a45b2](https://github.com/open-rpc/logs-react/commit/46a45b2822dc00c1c02182477077c4aac85b9d72))
- remove unused imports ([158b247](https://github.com/open-rpc/logs-react/commit/158b247fc5162e5f448d30e5f6dacc3e8613a5a8))
- req/res no longer duplicates ([b4a4757](https://github.com/open-rpc/logs-react/commit/b4a4757f2c2c819db3436da2b7d7e554206d57a2))
- Scroll to Bottom on update ([1f8c2b6](https://github.com/open-rpc/logs-react/commit/1f8c2b64eea867190fcf8f0fa565429d91010526))
- tslint formating compliance ([1dea28c](https://github.com/open-rpc/logs-react/commit/1dea28c611940cffdcbc8398cd20355460103bab))
- update README to use new name ([4eb0f9a](https://github.com/open-rpc/logs-react/commit/4eb0f9a32a4c920e3274bda5764c1e74d939d975)), closes [#17](https://github.com/open-rpc/logs-react/issues/17)
- update README to use new name ([#18](https://github.com/open-rpc/logs-react/issues/18)) ([28378f0](https://github.com/open-rpc/logs-react/commit/28378f0f0abb9c52f81b53d191191f64fe89e871)), closes [#17](https://github.com/open-rpc/logs-react/issues/17)

### Features

- add method filtering to calls ([541f9e9](https://github.com/open-rpc/logs-react/commit/541f9e93cd0296d582d1c9fc7c92105c150c6bd7))
- added ability to hide filter sidebar ([2427e77](https://github.com/open-rpc/logs-react/commit/2427e77572d645e940c1085897e45a5b02bdb58c)), closes [#28](https://github.com/open-rpc/logs-react/issues/28)
- chrome extention for dev tools ([954aab7](https://github.com/open-rpc/logs-react/commit/954aab706a0ab8e50cf6e71b038a0c5f36119be6))
- copy to clipboard ([f63c4d6](https://github.com/open-rpc/logs-react/commit/f63c4d6bc572315e4378d0a3c9b8715f128b2d78)), closes [#24](https://github.com/open-rpc/logs-react/issues/24) [#29](https://github.com/open-rpc/logs-react/issues/29)
- custom filters ([31b3fd1](https://github.com/open-rpc/logs-react/commit/31b3fd1f6ebef8095d142ff8d98abbe2ebc05ec3))
- initial commit ([0a2b1bc](https://github.com/open-rpc/logs-react/commit/0a2b1bc9c7933ed0b54c4bf06038ea1766ad3b31))

# 1.0.0 (2019-10-24)

### Bug Fixes

- add demo gif to README ([a1e0ce6](https://github.com/etclabscore/pristine-typescript-react-material-ui/commit/a1e0ce6dd7c0d44e46e41faaf52b7e45b8623ce9))
- add viewport meta ([6843410](https://github.com/etclabscore/pristine-typescript-react-material-ui/commit/68434105895ea915c3aa4204c8827801d3a5d7bc))
- linting ([27c26d6](https://github.com/etclabscore/pristine-typescript-react-material-ui/commit/27c26d6fa744910a0c53789b0f020a7870053925))

## [1.0.2](https://github.com/etclabscore/pristine-typescript-react/compare/1.0.1...1.0.2) (2019-07-02)

### Bug Fixes

- add homepage to fix gh-pages ([dcb2099](https://github.com/etclabscore/pristine-typescript-react/commit/dcb2099))

## [1.0.1](https://github.com/etclabscore/pristine-typescript-react/compare/1.0.0...1.0.1) (2019-07-02)

### Bug Fixes

- **.releaserc:** remove npm publish ([2ee1fce](https://github.com/etclabscore/pristine-typescript-react/commit/2ee1fce))

# 1.0.0 (2019-07-02)

### Bug Fixes

- **jest:** use passWithNoTests ([f7fdd6c](https://github.com/etclabscore/pristine-typescript-react/commit/f7fdd6c))

### Features

- initial commit ([2cf2f38](https://github.com/etclabscore/pristine-typescript-react/commit/2cf2f38))
