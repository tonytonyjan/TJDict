# Environment Requirements

- git
- node
- npm

# Development

1. Run `npm run start`.
2. Load `dist` directory as an unpacked extension into the browser.
3. Optionally run `npm run storybook` and `bin/chrome` for components development.

# Building

1. `npm run package:all`
2. All packages are located in `pkg` directory.

# Release

1. Bump version in `src/manifest.json`
2. Run `npm run version`
3. Commit `src/manifest.json` and `CHANGELOG.md` files
4. Tag
5. Push
