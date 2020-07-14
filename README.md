# TJDict

[![](https://badgen.net/chrome-web-store/users/caafmojgjlbflohillejdmnghkpcjjpp)][cws]
[![](https://badgen.net/chrome-web-store/stars/caafmojgjlbflohillejdmnghkpcjjpp)][cws]

TJDict is a fast, easy, open-source and ad-free browser extension for multi-dictionary searching.

![demo](https://github.com/tonytonyjan/TJDict/wiki/screenshots/Kapture%202020-07-14%20at%2014.13.21.gif)

## Installation

[Chrome Web Store][cws]  
[Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tjdict)  
[Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/dejpinkibingbiepjnnlicpakinppjpm)

## Development

1. Prerequisites:
   - git
   - node
   - npm
2. Run `npm run start`.
3. Load `dist` directory as an unpacked extension into the browser.
4. Optionally run `npm run storybook` and `bin/chrome` for components development.

## Building

1. `npm run package:all`
2. All packages are located in `pkg` directory.

## Release

1. Bump version in `src/manifest.json`
2. Run `npm run version`
3. Commit `src/manifest.json` and `CHANGELOG.md` files
4. Tag
5. Push

## Contribution

Please follow [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md).

[cws]: https://chrome.google.com/webstore/detail/caafmojgjlbflohillejdmnghkpcjjpp
